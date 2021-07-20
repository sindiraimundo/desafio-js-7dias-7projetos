document.body.addEventListener('keyup', (event) => {//tecla que está sendo clicada e solta(keyup)
    playSound(event.code.toLowerCase());//toca qual tecla foi clicada
});

document.querySelector('.composer button').addEventListener('click', () =>{
    let song = document.querySelector('#input').value;
    
    if(song !== ''){//se song estiver vazio
        let songArray = song.split('');//transformando o que está sendo digitado no input em um array.
        //console.log(songArray);
        playComposition(songArray);//criando função para rodar o array.
    }
});

function playSound(sound){
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement){
        audioElement.currentTime =0;//assim que tocar a tecla, zerar o ponteiro para tocar outra tecla em seguida sem delay.
        audioElement.play();
    }

    if(keyElement){
        keyElement.classList.add('active');//adicione a classe active.

        setTimeout(()=>{
            keyElement.classList.remove('active');//depois de 300 milisegundos remova a classe active.
        }, 300);
    }
}

function playComposition(songArray){
    let wait = 0;

    for(let songItem of songArray){
        setTimeout(()=>{//setando a diferença de tempo de 250 milisegundos para cada item do array e adicionando 250 milisegundos para cada item do array
            playSound(`key${songItem}`);
        },wait);

        wait += 250;
    }
}