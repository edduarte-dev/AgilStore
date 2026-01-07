const readline = require("readline");
const {
  adicionarProduto,
  listarProdutos,
  buscarProduto,
} = require("./services/produtoService");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ================= MENU =================

function mostrarMenu() {
  console.log("\n=== AgilStore - Gerenciamento de Produtos ===");
  console.log("1. Adicionar produto");
  console.log("2. Listar produtos");
  console.log("3. Atualizar produto");
  console.log("4. Excluir produto");
  console.log("5. Buscar produto");
  console.log("0. Sair");
}

// ================= VALIDAÇÃO DE PREÇO =================
// Aceita: 8999 | 8.999 | 8.999,99 | 8999,99 | 8999.99

function perguntarPrecoValido(callback) {
  rl.question("Preço (ex: 8999 | 8.999,99 | 8999.99): ", (entrada) => {
    let valor = entrada.trim();

    // Remove separadores de milhar
    valor = valor.replace(/\./g, "");

    // Converte vírgula decimal para ponto
    valor = valor.replace(",", ".");

    const preco = Number(valor);

    if (isNaN(preco) || preco <= 0) {
      console.log(
        "\n❌ Preço inválido. Exemplos válidos: 1000 | 1.999,00 | 1999,99\n"
      );
      return perguntarPrecoValido(callback);
    }

    callback(preco);
  });
}

// ================= ADICIONAR PRODUTO =================

function adicionarProdutoMenu() {
  rl.question("Nome do produto: ", (nome) => {
    rl.question("Categoria: ", (categoria) => {
      rl.question("Quantidade em estoque: ", (quantidade) => {
        perguntarPrecoValido((preco) => {
          const produto = adicionarProduto(
            nome,
            categoria,
            Number(quantidade),
            preco
          );

          console.log("\n✅ Produto adicionado com sucesso!");
          console.log(produto);

          mostrarMenu();
          perguntarOpcao();
        });
      });
    });
  });
}

// ================= LISTAR PRODUTOS =================

function listarProdutosMenu() {
  const produtos = listarProdutos();

  if (produtos.length === 0) {
    console.log("\nNenhum produto cadastrado.");
  } else {
    console.log("\nProdutos cadastrados:\n");

    produtos.forEach((produto) => {
      const precoSeguro = Number(produto.preco) || 0;

      const precoFormatado = precoSeguro.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      console.log(
        `ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria} | Quantidade: ${produto.quantidade} | Preço: ${precoFormatado}`
      );
    });
  }

  mostrarMenu();
  perguntarOpcao();
}

// ================= BUSCAR PRODUTO =================

function buscarProdutoMenu() {
  rl.question("Digite o ID ou nome do produto: ", (termo) => {
    const resultado = buscarProduto(termo);

    if (!resultado || resultado.length === 0) {
      console.log("\nNenhum produto encontrado.");
    } else if (Array.isArray(resultado)) {
      console.log("\nProdutos encontrados:\n");

      resultado.forEach((produto) => {
        const precoSeguro = Number(produto.preco) || 0;

        const precoFormatado = precoSeguro.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        console.log(
          `ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria} | Quantidade: ${produto.quantidade} | Preço: ${precoFormatado}`
        );
      });
    } else {
      const precoSeguro = Number(resultado.preco) || 0;

      const precoFormatado = precoSeguro.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      console.log("\nProduto encontrado:\n");
      console.log(
        `ID: ${resultado.id} | Nome: ${resultado.nome} | Categoria: ${resultado.categoria} | Quantidade: ${resultado.quantidade} | Preço: ${precoFormatado}`
      );
    }

    mostrarMenu();
    perguntarOpcao();
  });
}

// ================= CONTROLE DO MENU =================

function perguntarOpcao() {
  rl.question("\nEscolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        adicionarProdutoMenu();
        break;
      case "2":
        listarProdutosMenu();
        break;
      case "5":
        buscarProdutoMenu();
        break;
      case "0":
        console.log("\nEncerrando a aplicação. Até logo!");
        rl.close();
        return;
      default:
        console.log("\nOpção inválida. Tente novamente.");
        mostrarMenu();
        perguntarOpcao();
    }
  });
}

// ================= INICIALIZAÇÃO =================

mostrarMenu();
perguntarOpcao();
