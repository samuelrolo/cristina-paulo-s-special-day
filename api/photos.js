// Vercel Serverless Function to list photos from Cloudinary
// This uses the Cloudinary Admin API (requires API key + secret)
// which cannot be called from the frontend directly

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dobhofsfz';
  const API_KEY = process.env.CLOUDINARY_API_KEY || '233463673412489';
  const API_SECRET = process.env.CLOUDINARY_API_SECRET || '4g8IIo-QblNV6L0fLnkiH790-e8';
  const FOLDER = 'cristina-paulo-wedding';

  try {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?prefix=${FOLDER}&max_results=100&type=upload`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary API error:', errorText);
      return res.status(500).json({ error: 'Failed to fetch photos from Cloudinary' });
    }

    const data = await response.json();
    
    // Transform to simple photo objects with optimized URLs
    const photos = (data.resources || [])
      .filter(r => r.format !== 'png' || r.bytes > 1000) // Filter out tiny test images
      .map(resource => {
        // Use Cloudinary transformations to serve optimized JPGs
        const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
        const transforms = 'f_auto,q_auto,w_800';
        const publicId = resource.public_id;
        
        return {
          url: `${baseUrl}/${transforms}/${publicId}`,
          urlFull: `${baseUrl}/f_auto,q_auto/${publicId}`,
          name: resource.display_name || 'Convidado',
          date: resource.created_at,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return res.status(200).json({ 
      photos,
      total: photos.length,
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
