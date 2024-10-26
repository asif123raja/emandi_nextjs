// src/app/api/image-analysis/utils/analyzeImageForIngredients.ts

import axios from 'axios';
import fs from 'fs';

export async function analyzeImageForIngredients(imagePath: string): Promise<string[]> {
  const image = fs.readFileSync(imagePath, { encoding: 'base64' });

  // Replace with your preferred image recognition API
  const response = await axios.post('https://vision.googleapis.com/v1/images:annotate', {
    requests: [
      {
        image: { content: image },
        features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
      },
    ],
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `AIzaSyBB-_5Mj-WgczlfyhWYkceGvuSYiRbWFVk`, // Replace with actual key
    },
  });

  // Parse and extract ingredient labels from the response
  const labels = response.data.responses[0].labelAnnotations.map((label: any) => label.description);

  return labels;
}
