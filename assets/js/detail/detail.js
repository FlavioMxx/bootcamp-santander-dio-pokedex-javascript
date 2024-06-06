const statsList = document.getElementById("statsList");
const background = document.getElementById("background");
const header = document.getElementById("pokemonName");

const body = document.querySelector('body');


function loadStats(number) {
    detailApi.getStats(number)
        .then( (stats = []) => {
            const newList = stats.map( (stat) =>
                `
                <ol class="stats">
                    <li class="stats_type">${stat.nameStat}</li>
                </ol>

                <span class="stats_value">${stat.baseStat}</span>

                <div class="container">
                    <div class="progress-bar" style="background-color:${setColor(stat.baseStat)}; width:${stat.baseStat}%;"></div>
                </div>
                `
            ).join("");

            statsList.innerHTML += newList;
        });
}

function loadBackground(image, type) {
    const backgroundImage = 
        `
            <img src="${image}" alt="">
        `
    

    background.innerHTML += backgroundImage;
    body.classList.add(`${type}`);
}

function loadHeader(name) {
    const pokemonName = 
        `
        <p>${name}</p>
        `;

    header.innerHTML += pokemonName;
}


function setColor(value) {

    if (value < 40) {
        return "#BF3029";
    } else if (value <= 60) {
        return "#EE7F30";
    }  else {
        return "#77C850";
    }
}

const urlParams = new URLSearchParams(window.location.search);
const numberParam = urlParams.get("number");
const typeParam = urlParams.get("type");
const nameParam = urlParams.get("name");
const imageParam =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${numberParam}.svg`;


loadStats(numberParam);
loadHeader(nameParam);
loadBackground(imageParam, typeParam);
