const { lerProdutos, salvarProdutos } = require('../utils/fileHandler');

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

function buscarProduto(termo) {
  const produtos = lerProdutos();

  const id = Number(termo);

  // Busca por ID
  if (!isNaN(id)) {
    return produtos.find((produto) => produto.id === id);
  }

  // Busca por parte do nome (case-insensitive)
  return produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termo.toLowerCase())
  );
}

module.exports = {
  adicionarProduto,
  listarProdutos,
  buscarProduto,
};
