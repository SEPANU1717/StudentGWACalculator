module.exports = (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sep-student-gwa-calculator.vercel.app/</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sep-student-gwa-calculator.vercel.app/calculator</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sep-student-gwa-calculator.vercel.app/cumulative</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sep-student-gwa-calculator.vercel.app/predictions</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sep-student-gwa-calculator.vercel.app/honors</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.statusCode = 200;
  res.end(xml);
};
