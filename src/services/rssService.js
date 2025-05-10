const Parser = require('rss-parser');
const parser = new Parser();

// function pra buscar o rss da url do tecmundo
async function fetchRSS(url) { 
  try {
    const feed = await parser.parseURL(url);
    return feedItems = feed.items.map(item => ({ 
      title:   item.title,
      link:    item.link,
      img: item.enclosure.url,
      pubDate: item.pubDate,
      content: item.contentSnippet 
    }));

  } catch (error) {
      console.error('Error fetching RSS:', error);
    throw error;
  }
}

module.exports = { fetchRSS }; // exporta a funcao