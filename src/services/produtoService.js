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

function atualizarProduto(id, novosDados) {
  const produtos = lerProdutos();

  const indice = produtos.findIndex(produto => produto.id === id);

  if (indice === -1) {
    return null;
  }

  produtos[indice] = {
    ...produtos[indice],
    ...novosDados
  };

  salvarProdutos(produtos);

  return produtos[indice];
}

function excluirProduto(id) {
  const produtos = lerProdutos();

  const indice = produtos.findIndex(produto => produto.id === id);

  if (indice === -1) {
    return null;
  }

  const [produtoRemovido] = produtos.splice(indice, 1);
  salvarProdutos(produtos);

  return produtoRemovido;
}





module.exports = {
  adicionarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  excluirProduto
};
