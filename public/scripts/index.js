// listener pro evento domcontentloaded, acionado com o dom carregado
document.addEventListener('DOMContentLoaded', async () => {
  await loadRSS();
});

// funcao pra carregar os dados do feed de forma assincrona "async"
async function loadRSS() {
  try {
    //faz a requisicao na api 
    const response = await fetch('/api/rss');
    
    // se teve resposta positiva, ok, se não, traz o erro abaixo
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // converte a resposta do json
    const data = await response.json()
    displayRSS(data); // chama a funcao displayrss pra mostrar os dados no dom
  } catch (error) {
    console.error('Error fetching RSS:', error);
  }
}

// funcao criada para exibir os itens do feed rss na pagina
function displayRSS(items) {
  const rssContent = document.getElementById('rss-content'); // seleciona o div onde os dados serao exibidos
  rssContent.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div'); //cria uma div para cada um dos itens
    div.innerHTML = `
      <div class="main" >
        <img src="${item.img}"/>
        <div class="container">
          <h3>${item.title}</h3>
          <p> Publicado em: ${new Date(item.pubDate).toLocaleDateString()}</p>
          <p>${item.content}</p>
          <a href="${item.link}">Ler mais</a>
        </div>
      </div>
      `;
      
    rssContent.appendChild(div); // e aqui finalmente adciona um appendchild que foi mostrado para nós no curso de node, na div principal
  });
}