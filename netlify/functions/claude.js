// Netlify Function: secure proxy to Google Gemini API (FREE tier)
// Get a free API key at: https://aistudio.google.com/app/apikey
// Add it in Netlify → Site configuration → Environment variables
// Key name: GEMINI_API_KEY

export default async (request) => {
  // Handle CORS preflight
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

  // Get the API key — trim whitespace to catch copy/paste errors
  const apiKey = (Netlify.env.get("GEMINI_API_KEY") || "").trim();

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GEMINI_API_KEY not set. Go to Netlify → Site configuration → Environment variables and add it, then redeploy.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { systemPrompt, userMessage } = await request.json();

    const geminiBody = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.3,
      },
    };

    // Try gemini-2.0-flash first (newest free model), fall back to 1.5-flash
    const models = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
    ];

    let lastError = null;

    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiBody),
      });

      const data = await response.json();

      if (!response.ok) {
        // Capture the full Google error message for diagnostics
        lastError = {
          model,
          httpStatus: response.status,
          googleError: data.error?.message || JSON.stringify(data),
          googleCode: data.error?.code,
          googleStatus: data.error?.status,
        };
        // If it's an auth error (401/403), no point trying other models
        if (response.status === 400 || response.status === 401 || response.status === 403) {
          break;
        }
        continue; // try next model
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (!text) {
        lastError = { model, googleError: "Empty response from Gemini", raw: JSON.stringify(data) };
        continue;
      }

      // Success!
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
    }

    // All models failed — return the detailed error for diagnostics
    throw new Error(
      lastError
        ? `Gemini error (model: ${lastError.model}, HTTP ${lastError.httpStatus}): ${lastError.googleError}`
        : "All Gemini models failed"
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
