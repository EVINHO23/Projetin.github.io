// Espera a página carregar completamente para iniciar a mágica
document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('container-surpresa');
    const todasTelas = document.querySelectorAll('.tela');
    const todosBotoes = document.querySelectorAll('button[data-destino]');
    const corpo = document.body;

    let telaAtual = 1;
    let musica = new Audio('assets/musica.mp3');
    musica.volume = 0.1;

    // Função para esperar um tempo (em milissegundos)
    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Função principal que controla a troca de telas
    const mudarParaTela = (numeroTela) => {
        const telaDestino = document.querySelector(`.tela[data-tela="${numeroTela}"]`);

        if (!telaDestino) {
            console.error(`Erro: Tela ${numeroTela} não encontrada.`);
            return;
        }

        // Esconde a tela atual
        const telaAtiva = document.querySelector('.tela.visivel');
        if (telaAtiva) {
            telaAtiva.classList.remove('visivel');
        }

        // Mostra a próxima tela com um pequeno delay para a transição
        setTimeout(() => {
            telaDestino.classList.add('visivel');
            telaAtual = numeroTela;
            
            // Verifica se a nova tela tem um fundo para trocar
            const novoFundo = telaDestino.getAttribute('data-fundo');
            if (novoFundo) {
                corpo.className = novoFundo;
            }

            // Toca a música a partir da tela 5
            if (telaAtual == 5) {
                musica.play().catch(e => console.log("O navegador bloqueou o início automático da música."));
            }

            // Se a nova tela for temporizada, inicia a sequência
            if (telaDestino.classList.contains('tela-temporizada')) {
                iniciarTelaTemporizada(telaDestino);
            }
        }, 800); // Tempo para a animação de fade-out
    };

    // Função que controla as telas com frases que aparecem uma a uma
    const iniciarTelaTemporizada = async (tela) => {
        const frases = tela.querySelectorAll('p');
        const proximaTela = tela.getAttribute('data-proximo');

        // Mostra cada frase, espera, e depois a esconde
        for (const frase of frases) {
            const tempo = parseInt(frase.getAttribute('data-tempo'));
            await esperar(500); // Pequena pausa antes de mostrar
            frase.style.display = 'block';
            frase.style.opacity = '1';

            await esperar(tempo); // Espera o tempo definido na frase

            frase.style.opacity = '0';
            await esperar(500); // Pausa para a animação de sumiço
            frase.style.display = 'none';
        }

        // Quando todas as frases terminarem, avança para a próxima tela
        if (proximaTela) {
            mudarParaTela(proximaTela);
        }
    };

    // Adiciona o evento de clique para todos os botões de navegação
    todosBotoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const destino = botao.getAttribute('data-destino');
            mudarParaTela(destino);
        });
    });

    // Inicia a primeira tela assim que a página carrega
    const primeiraTela = document.querySelector('.tela[data-tela="1"]');
    if (primeiraTela) {
        primeiraTela.classList.add('visivel');
    }

});
