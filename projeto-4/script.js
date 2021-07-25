// Initial Data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let waring = '';
let playing = false;

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] ===''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset(){
    waring = '';

    let random = Math.floor(Math.random() * 2); //gerar um número aleatótio

    player = (random === 0) ? 'x' : 'o';//modo ternário para verificação para resetar

    // if(random === 0){
    //     player = 'x';
    // }else{
    //     player = 'o';
    // }

    for(let i in square){//limpando o square
        square[i] = '';
    }

    playing = 'true';

    renderSquare();
    renderInfo();
}

function renderSquare(){
    for (let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
            item.innerHTML = square[i];
    }

        checkGame();
}

function renderInfo(){//exibir na tela
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = waring;
}

function togglePlayer(){//trocando o player
    player = (player === 'x') ? 'o' : 'x';//modo em tenário
    renderInfo();

    // if(player === 'x'){
    //     player = 'o';
    // }else{
    //     player = 'x';
    // }
}

function checkGame(){
    if(checkInnerFor('x')){
        waring = 'O "x" venceu';
        playing = false;
    }else if(checkInnerFor('o')){
        waring = 'O "o" venceu';
        playing = false;
    }else if(isFull()){
        waring = 'Deu empate';
        playing = false;
    }
}

function checkInnerFor(player){
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in possibilities) {
        let pArray = possibilities[w].split(','); //a1, a2, a3 
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon){
            return true;
        }
    }
    return false;
}

function isFull(){
    for(let i in square){
        if(square[i]=== '') {
            return false;
        }
    }
    return true;
}