let timeframe = 'weekly';
const container = document.querySelector('.container');
let regcards;

const menu = document.querySelectorAll('.menu__link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});

let data = {};

fetch('./js/data.json')
    .then(resp => resp.json())
    .then(jsonData => {

        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend', 
                createCard(element, timeframe));
        });

        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        regcards = document.querySelectorAll('.reg-card');
    });

function menuOnClick(event) {
    menu.forEach(element => {
        element.classList.remove('menu__active');
    });
    event.target.classList.add('menu__active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe) {
    regcards.forEach(card => {
        updateCard(card, timeframe);
    });
}

function updateCard(card, timeframe){
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    const hoursElement = card.querySelector('.hours');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.description');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createCard(element, timeframe){
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];
    
    const timeframeMsg = {
        'daily' : 'Yesterday',
        'weekly' : 'Last week',
        'monthly' : 'Last month'
    };
    
    return `
<div class="reg-card ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="card">
      <div class="card__first">
        <h2 class ="title">
          ${title}
        </h2>
        <img src="./images/icon-dots.png" alt="dots">
      </div>
      
      <div class="card__second">
        <h1 class="hours">
          ${current}hrs
        </h1>
        <p class="description">
          ${timeframeMsg[timeframe]} - ${previous}hrs
        </p>
      </div>
    </div>
</div>`
}