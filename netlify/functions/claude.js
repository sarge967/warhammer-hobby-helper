// Netlify Function: secure proxy to Google Gemini API (FREE tier)
// Get your key from https://aistudio.google.com/app/apikey
// Add in Netlify → Site configuration → Environment variables → GEMINI_API_KEY

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

  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const { systemPrompt, userMessage } = await request.json();

    // Single hardcoded model — no extra API calls
    const model = "gemini-2.0-flash-lite";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.3 },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error?.message || JSON.stringify(data);
      if (response.status === 429) {
        throw new Error(
          "Rate limit hit. Wait a minute and try again. If this keeps happening, " +
          "make sure your key was created at aistudio.google.com/app/apikey (not Google Cloud Console)."
        );
      }
      if (response.status === 400 || response.status === 404) {
        throw new Error(`Model error: ${msg}`);
      }
      throw new Error(`Gemini error (HTTP ${response.status}): ${msg}`);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!text) throw new Error("Gemini returned an empty response. Please try again.");

    return new Response(JSON.stringify({ text, model }), { status: 200, headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
};

export const config = { path: "/api/claude" };
