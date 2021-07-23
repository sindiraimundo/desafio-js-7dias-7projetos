//api Open Weather

document.querySelector('.busca'). addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !==''){// se o input tiver algo diferente de vazio
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f21328d1dd041e3a9694e6abebcab0ea&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name:json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDescription: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Não encontramos está localização.');
        }
    }else{
        clearInfo();
    }
});

//função para mostrar as informações no html
function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
    document.querySelector('.description').innerText = `${json.tempDescription}`;
    
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    
    document.querySelector('.resultado').style.display = 'block';

}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}



//função de aviso
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
