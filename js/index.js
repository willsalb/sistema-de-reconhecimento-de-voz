var engine = {
    "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black'],

    "hexadecimais": {
        "green": "#02ef00",
        "purple": "#790093",
        "pink": "#f02a7e",
        "red": "#e90808",
        "yellow": "#e7d703",
        "orange": "#f16529",
        "grey": "#808080",
        "black": "#141414"
    },

    "moedas":0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');


//Joga o nome da cor na tela do user, mas por tras vai dar o hexadecimal da cor
function sortearCor() {
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var cor = document.getElementById('cor');
    var corSorteada = engine.cores[indexCorSorteada];

    cor.innerText = corSorteada.toUpperCase();

    //Retornando a corSorteada
    return engine.hexadecimais[corSorteada];

}

function aplicarCor(nomeCor) {
    var corAtual = document.getElementById('cor-atual');
    corAtual.style.backgroundColor = nomeCor;
    corAtual.style.backgroundImage = "url('/img/caixa-fechada.png')";
    corAtual.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor) {
    var pontuacao = document.getElementById('pontuacao-atual');
    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCor(sortearCor());


//API de reconhecimento de voz

var btn = document.getElementById('btn-responder');
var transcricaoAudio = "";
var corAtual = "";
var listen = false;

if(window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();
    
    
    gravador.continuos = false;
    gravador.lang = "en-US";
    
    gravador.onstart = () => {
        btn.innerText = "Gravando!";
        btn.style.backgroundColor = '#fff';
        btn.style.color = '#000';
    }
    
    gravador.onend = () => {
        btn.innerText = "Responder";
        btn.style.backgroundColor = 'transparent';
        btn.style.color = '#fff';
    }
    
    
    //Quando der o resultado da API
    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        cor = document.getElementById('cor').innerText.toUpperCase();

        console.log(transcricaoAudio);
        console.log(cor);

        if(transcricaoAudio === cor) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);
        }

        aplicarCor(sortearCor());
    }
    
} else {
    alert('Navegador não tem suporte!');
}

btn.addEventListener('click', function(e){
    gravador.start();
})