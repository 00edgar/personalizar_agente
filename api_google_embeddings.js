import 'dotenv/config'; 
import asesor from './asesor-de-ventas.json' with { type: 'json' };

const apiKey = process.env.GEMINI_API_KEY;
const modelo = 'gemini-embedding-001';


async function obtenerEmbedding(texto) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:embedContent?key=${apiKey}`;
  
  const body = {
    model: `models/${modelo}`,
    content: { parts: [{ text: texto }] }
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(`Error API: ${JSON.stringify(data)}`);
  }
  
  return data.embedding.values;
}
async function procesarBaseDeConocimientos() {
  if (!apiKey) {
    console.log('Por favor, define la variable GEMINI_API_KEY en tu archivo .env');
    return;
  }

  try {
    console.log('Iniciando generación de embeddings para el asesor...\n');

    const listaElementos = Array.isArray(asesor) 
      ? asesor 
      : Object.entries(asesor).map(([clave, valor]) => ({ [clave]: valor }));

    for (const item of listaElementos) {
      const textoAProcesar = JSON.stringify(item);
      
      const vector = await obtenerEmbedding(textoAProcesar);
      console.log(`Procesado: ${textoAProcesar.substring(0, 50)}...`);
      console.log(`Dimensión del vector: ${vector.length}\n`);
    }

  } catch (error) {
    console.error('Ocurrió un error:', error.message);
  }
}

procesarBaseDeConocimientos();