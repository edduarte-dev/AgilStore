

const readline = require('readline');
const {
  adicionarProduto,
  listarProdutos,
  buscarProduto
} = require('./services/produtoService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log('\n=== AgilStore - Gerenciamento de Produtos ===');
  console.log('1. Adicionar produto');
  console.log('2. Listar produtos');
  console.log('3. Atualizar produto');
  console.log('4. Excluir produto');
  console.log('5. Buscar produto');
  console.log('0. Sair');
}

function adicionarProdutoMenu() {
  rl.question('Nome do produto: ', (nome) => {
    rl.question('Categoria: ', (categoria) => {
      rl.question('Quantidade em estoque: ', (quantidade) => {
        rl.question('Preço: ', (preco) => {
          const produto = adicionarProduto(
            nome,
            categoria,
            Number(quantidade),
            Number(preco)
          );

          console.log('\nProduto adicionado com sucesso!');
          console.log(produto);

          mostrarMenu();
          perguntarOpcao();
        });
      });
    });
  });
}

function listarProdutosMenu() {
  const produtos = listarProdutos();

  if (produtos.length === 0) {
    console.log('\nNenhum produto cadastrado.');
  } else {
    console.log('\nProdutos cadastrados:\n');

    produtos.forEach((produto) => {
      const precoFormatado = produto.preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      console.log(
        `ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria} | Quantidade: ${produto.quantidade} | Preço: ${precoFormatado}`
      );
    });
  }

  mostrarMenu();
  perguntarOpcao();
}

function buscarProdutoMenu() {
  rl.question('Digite o ID ou nome do produto: ', (termo) => {
    const resultado = buscarProduto(termo);

    if (!resultado || resultado.length === 0) {
      console.log('\nNenhum produto encontrado.');
    } else if (Array.isArray(resultado)) {
      console.log('\nProdutos encontrados:\n');

      resultado.forEach((produto) => {
        const precoFormatado = produto.preco.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        console.log(
          `ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria} | Quantidade: ${produto.quantidade} | Preço: ${precoFormatado}`
        );
      });
    } else {
      const precoFormatado = resultado.preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      console.log('\nProduto encontrado:\n');
      console.log(
        `ID: ${resultado.id} | Nome: ${resultado.nome} | Categoria: ${resultado.categoria} | Quantidade: ${resultado.quantidade} | Preço: ${precoFormatado}`
      );
    }

    mostrarMenu();
    perguntarOpcao();
  });
}

function perguntarOpcao() {
  rl.question('\nEscolha uma opção: ', (opcao) => {
    switch (opcao) {
      case '1':
        adicionarProdutoMenu();
        break;
      case '2':
        listarProdutosMenu();
        break;
      case '5':
        buscarProdutoMenu();
        break;
      case '0':
        console.log('\nEncerrando a aplicação. Até logo!');
        rl.close();
        return;
      default:
        console.log('\nOpção inválida. Tente novamente.');
        mostrarMenu();
        perguntarOpcao();
    }
  });
}

// Inicialização
mostrarMenu();
perguntarOpcao();
