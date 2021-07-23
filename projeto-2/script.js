let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

//atualização do relógio rodar de 1 em 1 segundo

function updateClock(){
    let now = new Date();//pegar hora atual
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let second = now.getSeconds();

    //inserir hora no digital
    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minutes)}:${fixZero(second)}`;

    //inserir hora no analógico
    let sDeg = ((360/60) * second) -90;
    let mDeg = ((360/60) * minutes) -90;
    let hDeg = ((360/12) * hour) -90;

    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;

}

function fixZero(time){      //formartar o zero para aparecer nos numeros menores que 10 no digital.
    // if(time < 10) {       //forma mais extensa
    //     return '0' +time;
    // }else{
    //     return time;
    // }
    return time < 10 ? `0${time}` : time; // forma em ternário
}

setInterval(updateClock, 1000);//espera 1 segundo para rodar a função
updateClock();