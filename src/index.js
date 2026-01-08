const readline = require("readline");
const {
  adicionarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  excluirProduto,
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
// Aceita: 0000 | 0.000 | 0.000,00 | 0000,00 | 0000.00

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
// ================= ATUALIZAR PRODUTO =================
function atualizarProdutoMenu() {
  rl.question("Informe o ID do produto a ser atualizado: ", (idEntrada) => {
    const id = Number(idEntrada);

    if (isNaN(id)) {
      console.log("\n❌ ID inválido.");
      mostrarMenu();
      perguntarOpcao();
      return;
    }

    const produtoAtual = buscarProduto(id);

    if (!produtoAtual) {
      console.log("\n❌ Produto não encontrado.");
      mostrarMenu();
      perguntarOpcao();
      return;
    }

    console.log("\nProduto atual:");
    console.log(produtoAtual);

    rl.question("Novo nome (pressione Enter para manter): ", (nome) => {
      rl.question(
        "Nova categoria (pressione Enter para manter): ",
        (categoria) => {
          rl.question(
            "Nova quantidade (pressione Enter para manter): ",
            (quantidade) => {
              perguntarPrecoValido((preco) => {
                const novosDados = {};

                if (nome) novosDados.nome = nome;
                if (categoria) novosDados.categoria = categoria;
                if (quantidade) novosDados.quantidade = Number(quantidade);
                if (preco) novosDados.preco = preco;

                const produtoAtualizado = atualizarProduto(id, novosDados);

                console.log("\n✅ Produto atualizado com sucesso!");
                console.log(produtoAtualizado);

                mostrarMenu();
                perguntarOpcao();
              });
            }
          );
        }
      );
    });
  });
}

// ================= EXCLUIR PRODUTO =================
function excluirProdutoMenu() {
  rl.question("Informe o ID do produto a ser excluído: ", (idEntrada) => {
    const id = Number(idEntrada);

    if (isNaN(id)) {
      console.log("\n❌ ID inválido.");
      mostrarMenu();
      perguntarOpcao();
      return;
    }

    const produto = buscarProduto(id);

    if (!produto) {
      console.log("\n❌ Produto não encontrado.");
      mostrarMenu();
      perguntarOpcao();
      return;
    }

    console.log("\nProduto encontrado:");
    console.log(produto);

    rl.question("\nTem certeza que deseja excluir? (s/n): ", (confirmacao) => {
      if (confirmacao.toLowerCase() !== "s") {
        console.log("\n❎ Exclusão cancelada.");
        mostrarMenu();
        perguntarOpcao();
        return;
      }

      const removido = excluirProduto(id);

      console.log("\n🗑️ Produto excluído com sucesso!");
      console.log(removido);

      mostrarMenu();
      perguntarOpcao();
    });
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
      case "3":
        atualizarProdutoMenu();
        break;
      case "4":
        excluirProdutoMenu();
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
