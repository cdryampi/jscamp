export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: 'API El Día del Indio - Backend',
    version: '1.0.0',
    endpoints: {
      eventos: '/api/eventos',
      evento_por_id: '/api/eventos?id=1',
      evento_por_slug: '/api/eventos?slug=festival-musica-andina-fusion',
      categorias: '/api/categorias',
      ubicaciones: '/api/ubicaciones'
    }
  });
}
