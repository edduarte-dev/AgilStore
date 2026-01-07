const { lerProdutos, salvarProdutos } = require("../utils/fileHandler");

function gerarNovoId(produtos) {
  if (produtos.length === 0) {
    return 1;
  }

  const ids = produtos.map((produto) => produto.id);
  return Math.max(...ids) + 1;
}

function adicionarProduto(nome, categoria, quantidade, preco) {
  const produtos = lerProdutos();

  const novoProduto = {
    id: gerarNovoId(produtos),
    nome,
    categoria,
    quantidade,
    preco,
  };

  produtos.push(novoProduto);
  salvarProdutos(produtos);

  return novoProduto;
}

function listarProdutos() {
  return lerProdutos();
}

module.exports = {
  adicionarProduto,
  listarProdutos,
};

