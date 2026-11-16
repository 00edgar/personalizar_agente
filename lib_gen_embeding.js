import { GoogleGenAI } from '@google/genai';

async function generarEmbedding() {
  try{
    const ai = new GoogleGenAI();
    const texto = 'Node.JS es un entorno de ejecución para JavaScript';

    const resp = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: texto
    });

    console.log('Texto original: ', texto);
    console.log('\nVector de embedding generado (5 primeros valores):');
    console.log(resp.embeddings[0].values.slice(0,5));
    console.log(`\nDimensión del vector: ${resp.embeddings[0].values.length}`);
  }
  catch(error){
    console.error('Error al generar el embedding: ', error);
  }
}

generarEmbedding();