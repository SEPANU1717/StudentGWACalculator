const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const sitemapPath = path.join(__dirname, '..', 'StudentGWACalculator', 'dist', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('sitemap not found');
      return;
    }
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.statusCode = 200;
    res.end(xml);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  }
};
