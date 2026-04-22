// Netlify Function: secure proxy to Google Gemini API (FREE tier)
// Get a free API key at: https://aistudio.google.com/app/apikey
// Add it in Netlify → Site configuration → Environment variables
// Key name: GEMINI_API_KEY

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = (Netlify.env.get("GEMINI_API_KEY") || "").trim();

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GEMINI_API_KEY not set. Go to Netlify → Site configuration → Environment variables and add it, then redeploy." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { systemPrompt, userMessage } = await request.json();

    // First, fetch the live list of available models from Google
    // so we always use a valid one regardless of API changes
    const listResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const listData = await listResp.json();

    if (!listResp.ok) {
      throw new Error(`Key rejected by Google (HTTP ${listResp.status}): ${listData.error?.message || JSON.stringify(listData)}`);
    }

    // Find the best available free model — prefer flash models (fast + free)
    const available = (listData.models || [])
      .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
      .map(m => m.name.replace("models/", ""));

    const preferred = [
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash",
      "gemini-1.5-flash-8b",
      "gemini-1.0-pro",
    ];

    const model = preferred.find(p => available.includes(p)) || available[0];

    if (!model) {
      throw new Error(`No usable Gemini models found. Available: ${JSON.stringify(available)}`);
    }

    const geminiBody = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig: { maxOutputTokens: 1000, temperature: 0.3 },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Gemini generateContent failed (HTTP ${response.status}): ${data.error?.message || JSON.stringify(data)}`);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      throw new Error(`Gemini returned empty text. Full response: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ text, model }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

export const config = { path: "/api/claude" };
