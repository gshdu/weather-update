const div = document.getElementById('div-container');
const divContents = div.innerHTML;
const loaderContainer = document.getElementById('spinner');

const loadSpinner = isLoad =>{
    if(isLoad == false){
        loaderContainer.classList.remove('d-block');
        loaderContainer.classList.add('d-none');
        div.innerHTML = divContents;
    }
    else{
        div.textContent = ``;
        loaderContainer.classList.remove('d-none');
        loaderContainer.classList.add('d-block');
    }
}

const searchCity = () =>{
    loadSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    fetchWeatherData(searchText);
};

const fetchWeatherData = async city =>{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea0723a240b7361c50b08e220f3f0ca9`);
    const data = await res.json();
    if(res){
        displayWeather(data);
    }
};

const displayWeather = data =>{
    try{
        loadSpinner(false)
        // div.innerHTML = divContents;
        console.log(data);
        const tempText = document.getElementById('temperature');
        const cityNameText = document.getElementById('location-name');
        const weatherMainText = document.getElementById('weather-main');
        const cloudIcon = document.getElementById('cloud-icon');

        const tempKelvin = data.main.temp;
        const tempCelcius = tempKelvin - 273;
        tempText.innerText = tempCelcius.toFixed(2);

        cityNameText.innerText = data.name;
        weatherMainText.innerText = data.weather[0].main;
        cloudIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    }
    catch(error){
        div.textContent = ``;
        div.innerHTML = `
            <p class="fs-2 text-bold text-white">Sorry, the city didn't match. Please try again.</p>
        `;
    }
};