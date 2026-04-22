// Netlify Function — proxies to Google Gemini (free tier)
// Get your key at: https://aistudio.google.com/app/apikey
// Add in Netlify: Site configuration → Environment variables → GEMINI_API_KEY

exports.handler = async function(event) {
  // CORS headers on every response
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = (process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: "GEMINI_API_KEY not set. Add it in Netlify → Site configuration → Environment variables, then redeploy." })
    };
  }

  try {
    const { systemPrompt, userMessage } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
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
        return {
          statusCode: 500, headers,
          body: JSON.stringify({ error: "Rate limit hit. Wait 1-2 minutes and try again. Make sure your key was created at aistudio.google.com/app/apikey and not Google Cloud Console." })
        };
      }
      return {
        statusCode: 500, headers,
        body: JSON.stringify({ error: `Gemini error (HTTP ${response.status}): ${msg}` })
      };
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!text) {
      return {
        statusCode: 500, headers,
        body: JSON.stringify({ error: "Gemini returned an empty response. Please try again." })
      };
    }

    return {
      statusCode: 200, headers,
      body: JSON.stringify({ text, model: "gemini-2.0-flash-lite" })
    };

  } catch (err) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
