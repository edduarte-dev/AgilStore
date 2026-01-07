const readline = require('readline');

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

function perguntarOpcao() {
  rl.question('\nEscolha uma opção: ', (opcao) => {
    switch (opcao) {
      case '1':
        console.log('Adicionar produto (em desenvolvimento)');
        break;
      case '2':
        console.log('Listar produtos (em desenvolvimento)');
        break;
      case '3':
        console.log('Atualizar produto (em desenvolvimento)');
        break;
      case '4':
        console.log('Excluir produto (em desenvolvimento)');
        break;
      case '5':
        console.log('Buscar produto (em desenvolvimento)');
        break;
      case '0':
        console.log('\nEncerrando a aplicação. Até logo!');
        rl.close();
        return;
      default:
        console.log('\nOpção inválida. Tente novamente.');
    }

    mostrarMenu();
    perguntarOpcao();
  });
}

// Inicialização
mostrarMenu();
perguntarOpcao();
