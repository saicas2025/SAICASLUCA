async function analyze() {
  const input = document.getElementById("fileInput"), out = document.getElementById("output");
  if (!input.files.length) return out.value = "Carica prima un file…";
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    const b64 = reader.result.split(",")[1];
    out.value = "Sto pensando…";
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: [{
            role: "user",
            content: [
              { type: "text", text: "Leggi il disegno tecnico e compila in autonomia i dati del preventivo: materiale, spessore, pieghe, fori, saldatura, peso teorico e margine 20%." },
              { type: "image_url", image_url: { url: "data:image/jpeg;base64," + b64 } }
            ]
          }],
          max_tokens: 1500
        })
      });
      const data = await res.json();
      out.value = data.choices[0].message.content;
    } catch (err) {
      out.value = "Errore: " + err.message;
    }
  };
  reader.readAsDataURL(file);
}

function recalculate() {
  const out = document.getElementById("output");
  out.value += "\n\n[Ricalcolo manuale: modifica i dati anim sopra]";
}