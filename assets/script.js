$(document).ready(function(){

    // MUDANÇA CRÍTICA: Em vez de prender o clique diretamente no botão,
    // prendemos no 'documento' e delegamos para o botão. Isso garante que funcione sempre.
    $(document).on("click", ".mudaTela", function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

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
                $("#" + idTelaDestino).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#" + telaAtualId).hide(tempoAnimacao);
            $("#" + idTelaDestino).show(tempoAnimacao);
        }

        if($("#" + idTelaDestino).hasClass("temporizado")){
            $("#" + idTelaDestino + " div").hide();
            telaTemporizada(parseInt(idTelaDestino.split("tela")[1]), 0);
        }

        verificaFundo(parseInt(idTelaDestino.split("tela")[1]));
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(parseInt(idTelaDestino.split("tela")[1]) == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
    }

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
                        $("#tela" + nTela).fadeOut(900);
                        setTimeout(() => {
                            $("#" + proximaTelaId).fadeIn(900);
                            verificaFundo(parseInt(proximaTelaId.split("tela")[1]));
                        }, 900);
                    } else {
                        // Se não houver destino, chama a função mudaTela de forma segura
                        let proximaTelaNum = nTela + 1;
                        $("#tela" + nTela).fadeOut(900);
                        setTimeout(() => {
                            $("#tela" + proximaTelaNum).fadeIn(900);
                            verificaFundo(proximaTelaNum);
                        }, 900);
                    }

                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

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
            case "8/5": titulo = "08 de Maio de 2021"; mensagem = "<p>Foi o primeiro dia que saímos.<br>Você estava linda, usando um contorno branco nos olhos e batom rosa bem claro.</p><p>Sentamos em um banco na lagoa e a todo momento eu ainda não conseguia acreditar que estava ali com você, você estava incrível e aquele momento foi mágico pra mim, e tive a certeza disso depois de poder finalmente te beijar de verdade! E que beijo bom ❤️</p>";break;
            case "15/5": titulo = "15 de Maio de 2021"; mensagem = "<p>Foi quando te vi com os cabelos cacheados, nesse dia você estava usando lápis puxado nas pontas. Repetimos o mesmo processo da semana anterior. Saímos, bebemos um pouco e procuramos um lugar para ficarmos mais a vontade, acabamos encontrando aquela casa no final do bairro Muraiaishi. Foi quando fomos pra sua casa pela primeira vez.</p><p>Eu já te contei que acho que as escadas da sua casa parecidas com a de um castelo?</p>";break;
            case "22/5": titulo = "22 de Maio de 2021"; mensagem = "<p>Lembro que eu fiquei o dia todo pensando em algum lugar para que pudessemos sair e ficarmos sozinhos sem ser na lagoa, pois embora estar com você fosse incrível, eu não queria que tudo se transformasse em uma rotina monótona. Sou alguém que gosta de mudar os hábitos, isso me motiva a inovar sempre para que cada vez que você olhar mim, você enxergue um novo Conrado, que você possa se apaixonar cada dia mais e me redescobrir, e redescobrir esse maravilhoso relacionamento que estamos construindo.</p><p>Não deu muito certo, porque no final das contas foi você que teve a ideia de pararmos mais fora da cidade para ver as estrelas, né 🤷</p>";break;
            case "29/5": titulo = "29 de Maio de 2021"; mensagem = "<p>Essa foi a vez que mais rodamos a cidade em busca de um lugar para ficar 🤣<br>Chegamos a ideia do cemitério, que embora fosse sinistro, ainda foi e é um ótimo lugar para ficarmos haha.</p><p>Nesse dia acabamos indo muito cedo para a sua casa, e encontramos com seu irmão e o namorado dele, foi quando eu os conheci. A primeira impressão que tive do seu irmão é que ele é uma pessoa extremamente amigável <small><del>eu pegava</del></small>.</p>";break;
            case "3/6": titulo = "03 de Junho de 2021"; mensagem = "<p>A minha ideia de nos vermos mais alguma vez na semana foi ótima!</p><p>Foi uma tarde sensacional com você. Sentamos nos banco da escola do Francisco e ficamos por ali até anoitecer, conversando, brincando e rindo. Me dá uma ansiedade muito grande em pensar que podemos fazer isso de novo tantas e tantas vezes ainda...</p>";break;
            case "5/6": titulo = "05 de Junho de 2021"; mensagem = "<p>Acho que esse dia foi um pequeno marco no nosso relacionamento, pois antes saíamos para ficar por aí a sós, mas dessa vez o combinado foi de nos encontramos e ficar na sua casa, sem sairmos. Parece algo bobo, mas isso pra mim é muito significado, isso demonstra que você me queria ali, e que já não importava mais que seu irmão estivesse por lá ou não. Esse dia me senti muito bem estando com você.</p>";break;
            case "12/6": titulo = "12 de Junho de 2021"; mensagem = "<p>Ai ai... o que dizer desse dia? Acho que foi tão intenso e sensacional, que reciprocamente eu nem precisaria escrever mais nada aqui, você saberia exatamente o momento único que tivemos juntos.</p><p>Eu pensei em mil coisas para fazermos em Franca, e no final das contas, não fizemos nada do que eu havia planejado 🤣 e o melhor de tudo, foi melhor do que eu pensei. Isso mostra que só de estar com você, independente da circunstâncias ou o que estiver acontecendo, tudo fica bom, melhor do que o esperado. É como você mesmo diz na sua descrição do WhatsApp \"São os momentos mais simples que marcam nossa vida.\"</p>";break;
            case "13/6": titulo = "13 de Junho de 2021"; mensagem = "<p>Acordar e ver você ali, certamente é uma das coisas que nunca vou esquecer na minha vida. São tantos momentos que eu consigo lembrar de todos em mínimos detalhes. Você saindo do banho toda perfumada; a gente assistindo Naruto juntos; nosso momento de intimidade de uma forma incrível; tomamos sorvete juntos; a viagem de volta a Guaíra enquanto eu segurava sua mão...</p><p>De fato, nunca esquecerei.</p>";break;
            case "19/6": titulo = "19 de Junho de 2021"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está sendo escrito agora...</strong></p></section>";break;
            case "final": titulo = "19 de Junho de 2021"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }
        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }
});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{
    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");
        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }
    }
}
