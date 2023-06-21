let mainContainer=document.querySelector('.main-container');
let notify=document.querySelector('.notify');
let weatherIcon=document.querySelector(".weather-icon");
let tempVal=document.querySelector('.temperature-icon');
let tempDesc=document.querySelector('.temperature-desc');
let mylocation=document.querySelector('.location');
let searchButton=document.querySelector('#search-button');
let citysection=document.querySelector('#search');


let apiKey=`344fc424bbc7e2f1e56e4aafad8e0508`;
/*const API = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={apiKey}`; */

async function getWeather(city){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    let dataFetch=await fetch(url);
    let jsonData=await dataFetch.json();
    return showWeather(jsonData);
}

async function showWeather(data){
    if(data.cod=='404')
    {
        notify.classList.add('notification');
        notify.innerHTML="Weather Not Found!";
        mainContainer.innerHTML="";
        return;
    }
    else{
        notify.classList.remove('notification');
        notify.innerHTML="";
        mainContainer.innerHTML=
        `
        <div class="weather-icon flex">
            <img class="weather-image" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"; alt="weather-icon">
        </div>

        <div class="temperature-icon flex">
            <p>${Math.floor(data.main.temp)} °<span>C</span></p>
        </div>

        <div class="temperature-desc">${data.weather[0].description}</div>

        <div class="location">${data.name}, ${data.sys.country}</div>
        `;
    }
}

// citysection.addEventListener('change',function(){
//     mainContainer.innerHTML="";
//     notify.innerHTML="";
//     notify.classList.remove('notification');
// });

searchButton.addEventListener('click',function(){
    let val=citysection.value;
    getWeather(val);
});



