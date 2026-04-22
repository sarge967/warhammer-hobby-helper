// Netlify Function — proxies to OpenRouter API (free tier, no credit card needed)
// Get your key at: https://openrouter.ai/keys
// Add in Netlify: Site configuration → Environment variables → OPENROUTER_API_KEY

exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = (process.env.OPENROUTER_API_KEY || "").trim();
  if (!apiKey) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: "OPENROUTER_API_KEY not set. Create a free account at openrouter.ai, get a key from openrouter.ai/keys, add it in Netlify → Site configuration → Environment variables, then redeploy." })
    };
  }

  try {
    const { systemPrompt, userMessage } = JSON.parse(event.body);

    // "openrouter/free" automatically picks whichever free model is available
    // so this works even when individual free model names change
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://warhammer-hobby-helper.netlify.app",
        "X-Title": "Warhammer Hobby Helper",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userMessage  },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error?.message || JSON.stringify(data);
      return {
        statusCode: 500, headers,
        body: JSON.stringify({ error: `OpenRouter error (HTTP ${response.status}): ${msg}` })
      };
    }

    const text = data.choices?.[0]?.message?.content || "";
    if (!text) {
      return {
        statusCode: 500, headers,
        body: JSON.stringify({ error: "Empty response from AI. Please try again." })
      };
    }

    return {
      statusCode: 200, headers,
      body: JSON.stringify({ text, model: data.model || "openrouter/free" })
    };

  } catch (err) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
