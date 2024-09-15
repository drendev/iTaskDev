import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const endpoint = process.env.AZURE_ENDPOINT; // Set this in your .env.local file
const apiKey = process.env.AZURE_API_KEY;    // Set this in your .env.local file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { text } = req.body;

  try {
    const response = await axios.post(
      `${endpoint}/text/analytics/v3.1/entities/recognition/general`,
      {
        documents: [
          {
            id: '1',
            language: 'en',
            text: text,
          },
        ],
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    const entities = response.data.documents[0].entities;
    return res.status(200).json({ entities });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the request', error });
  }
}