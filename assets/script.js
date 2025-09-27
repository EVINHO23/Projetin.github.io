$(document).ready(function(){

    // Usando o método de clique mais robusto para garantir que os botões sempre funcionem.
    $(document).on("click", ".mudaTela", function(){
        mudaTela( $(this) );
    });

    // Seu código original
    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    // Função principal de mudança de tela
    const mudaTela = ( atual ) => {
        let animacao = atual.attr("animacao") || "fade";
        let tempoAnimacao = atual.attr("tempoAnimacao") || 900;
        let telaAtualId = atual.parent().attr("id");
        let proximaTelaId = atual.attr("proximaTela"); 

        let idTelaDestino;

        if (proximaTelaId) {
            idTelaDestino = proximaTelaId;
        } else {
            let numeroTelaAtual = parseInt(telaAtualId.split("tela")[1]);
            idTelaDestino = "tela" + (numeroTelaAtual + 1);
        }

        if(animacao == "fade"){
            $("#" + telaAtualId).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#" + idTelaDestino).fadeIn(tempoAnimacao);
            }, tempoAnimacao);
        } else {
            $("#" + telaAtualId).hide(tempoAnimacao);
            $("#" + idTelaDestino).show(tempoAnimacao);
        }

        let numeroTelaDestino = parseInt(idTelaDestino.split("tela")[1]);

        if($("#" + idTelaDestino).hasClass("temporizado")){
            $("#" + idTelaDestino + " div").hide();
            telaTemporizada(numeroTelaDestino, 0);
        }

        verificaFundo(numeroTelaDestino);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(numeroTelaDestino == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
    }

    // ====================================================================================
    // FUNÇÃO TELA TEMPORIZADA (COM A CORREÇÃO PARA AVANÇAR CORRETAMENTE)
    // ====================================================================================
    const telaTemporizada = ( nTela, contador ) =>{
        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    
                    let proximaTelaId = tela.attr("proximaTela");

                    if (proximaTelaId) {
                        // Se a div final tem um destino específico (ex: pular da tela 13 para a 20)
                        $("#tela" + nTela).fadeOut(900);
                        setTimeout(() => {
                            $("#" + proximaTelaId).fadeIn(900);
                            verificaFundo(parseInt(proximaTelaId.split("tela")[1]));
                        }, 900);
                    } else {
                        // CORREÇÃO: Cria um "botão fantasma" para chamar a função principal de transição
                        // Isso garante que a transição da tela7 para a tela8 funcione.
                        let botaoFantasma = $('<button class="mudaTela"></button>');
                        botaoFantasma.appendTo("#tela" + nTela); // Adiciona o botão à tela atual
                        mudaTela(botaoFantasma); // Chama a função principal
                    }

                }else{
                    telaTemporizada(nTela, contador+1);
                }
            }, tela.attr("tempo") );
        }, temporizadorPrimeiraTela);
    }

    // Resto do seu código (sem alterações)
    const verificaFundo = (nTela) =>{
        const fundo = $("#tela"+nTela).attr("fundo");
        if(fundo){
            $("body").attr("class", fundo);            
        }
    }

    const mostraMsgMes = (texto) =>{
        let titulo;
        let mensagem;
        switch(texto){
            case "5/5": titulo = "05 de Maio de 2021"; mensagem = "<p>Esse foi o dia que nos conhecemos! Ou pelo menos, o dia que nos conhecemos já sabendo que dali pra frente poderiamos ter alguma coisa juntos.</p><p>Foi bem rápido, você estava atrasada para o serviço (normal) e conversamos tão pouquinho, mas já foi o suficiente para eu entender naquele momento que você era diferente, e que todo o tempo que eu dedicava em escrever minhas mensanges pra você, estavam valendo a pena. Eu quis de verdade, a partir desse dia, te conhecer melhor do que já conhecia por mensagens.</p><p>E eu estava certo, você é incrível!</p>";break;
            case "8/5": titulo = "08 de Maio de 2021"; mensagem = "<p>Foi o primeiro dia que saímos.<br>Você estava linda, usando um contorno branco nos olhos e batom rosa bem claro.</p><p>Sentamos em um banco na lagoa e a todo momento eu ainda não conseguia acreditar que estava ali com você, você estava incrível e aquele momento foi mágico pra mim, e tive a certeza disso depois de poder finally te beijar de verdade! E que beijo bom ❤️</p>";break;
            case "15/5": titulo = "15 de Maio de 2021"; mensagem = "<p>Foi quando te vi com os cabelos cacheados, nesse dia você estava usando lápis puxado nas pontas. Repetimos o mesmo processo da semana anterior. Saímos, bebemos um pouco e procuramos um lugar para ficarmos mais a vontade, acabamos encontrando aquela casa no final do bairro Muraiaishi. Foi quando fomos pra sua casa pela primeira vez.</p><p>Eu já te contei que acho que as escadas da sua casa parecidas com a de um castelo?</p>";break;
            case "22/5": titulo = "22 de Maio de 2021"; mensagem = "<p>Lembro que eu fiquei o dia todo pensando em algum lugar para que pudessemos sair e ficarmos sozinhos sem ser na lagoa, pois embora estar com você fosse incrível, eu não queria que tudo se transformasse em uma rotina monótona. Sou
