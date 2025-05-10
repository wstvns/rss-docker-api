const express = require('express'); 
const { fetchRSS } = require('../services/rssService.js'); 
const { saveToFile } = require('../services/rssFile.js');
const { saveS3 } = require('../config/putS3Aws.js');

const url = 'https://rss.tecmundo.com.br/feed'
const fileNameS3 = 'tecmundo-rss-data.json'

// essa consta aqui vai fazer o express definir as rotas, é basciamente um roteador
const router = express.Router(); 

// aqui vai dar um, literalmente, get na pasta rss
router.get('/rss', async (req, res) => {
  try { 

   // se tem url, passa, se nao, volta com erro 400
    if (!url) return res.status(400).json({ error: 'URL parameter is required' });

    // Chama a funcao fetchrss da url tecmundo e pede pra esperar os itens
    const feedItems = await fetchRSS(url); 

    // Salvar o conteúdo RSS na pasta Data
    saveToFile(feedItems); 

    // Função assíncrona que faz a autenticação e envio do arquivo JSON para o Buckket S3 passando o nome do arquivo que ficará no S3 e o caminho para buscar o arquivo 
    await saveS3(fileNameS3, './src/data/rss-data.json'); 

    res.json(feedItems);
  } catch (error) {

    // se der erro, volta com erro 500, como especificado
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
});



module.exports = router;