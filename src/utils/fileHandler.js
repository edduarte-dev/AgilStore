const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../../data/produtos.json');

function lerProdutos() {
  try {
    const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
  } catch (error) {
    console.error('Erro ao ler o arquivo de produtos:', error.message);
    return [];
  }
}

function salvarProdutos(produtos) {
  try {
    fs.writeFileSync(
      caminhoArquivo,
      JSON.stringify(produtos, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Erro ao salvar o arquivo de produtos:', error.message);
  }
}

module.exports = {
  lerProdutos,
  salvarProdutos
};