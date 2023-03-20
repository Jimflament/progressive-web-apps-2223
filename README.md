# Web App From Scratch

---
Om mijn single page web app te gebruiken ga je naar https://jimflament.github.io/DesignBoost/. Dan druk je op start om de api te laden en dan druk je op new quote om een quote te renderen.

User story

**Ik heb voor de volgende user story gekozen:** 

As a student Digital Design, I want to look at inspiring web design quotes, to get some fresh energy when I'm down while working on crazy deadlines.

## UI Sketch & flow

Ik ben begonnen met het sketchen van een simple UI en heb daarna een flow eraan toegevoegd en een breakdown-graph.

![IMG_2727.JPEG](https://github.com/Jimflament/DesignBoost/blob/main/Images/IMG_2727.JPEG)

![IMG_2728.JPEG](https://github.com/Jimflament/DesignBoost/blob/main/Images/IMG_2728.JPEG)

![IMG_2729.JPEG](https://github.com/Jimflament/DesignBoost/blob/main/Images/IMG_2729.JPEG)

## Activity diagram

Hier staat een activity diagram met een wireflow, controlflow en swimlane met url en hash.

![Schermafbeelding 2023-03-07 164217.png](https://github.com/Jimflament/DesignBoost/blob/main/Images/Schermafbeelding%202023-03-07%20164217.png)

## Versie 1 - Fetch API & ideal state

Hieronder staat de code voor versie 1. Ik ben begonnen met het fetchen van de API en het genereren van HTML doormiddel van JavaScript. Daarna hebben ik de informatie van de API in de gegeneerde HTML gestopt. Er zijn momenteel geen functies waardoor het heel onoverzichtelijk was.

```jsx
fetch('https://quote.api.fdnd.nl/v1/quote')
  .then(response => response.json())
  .then(data => {
 
  const genCardContainer = document.createElement('article');
  genCardContainer.setAttribute('id', 'card-container');

  const genCardHeading = document.createElement('h1');
  genCardHeading.setAttribute('id', 'card-heading')
  genCardContainer.appendChild(genCardHeading);

  const genCardText = document.createElement('p');
  genCardText.setAttribute('id', 'card-text')
  genCardContainer.appendChild(genCardText);

  document.body.appendChild(genCardContainer);

  const arrayNum = Math.floor(Math.random() * 15);
  const cardContainer = document.getElementById('card-container');
  const cardHeading = document.getElementById('card-heading');
  const cardText = document.getElementById('card-text');

  cardHeading.innerHTML = data.data[arrayNum].name;
  cardText.innerHTML = data.data[arrayNum].text || data.data[arrayNum].bio;
})

```

---

## Versie 2 - Functies & loading state

Hieronder staat de code voor versie 2. Ik ben gestopt met het generen van HTML en heb dat direct in de index.html gezet. De inhoud van die HTML verander ik doormiddel van de functie renderQuotes(). 

Omdat de API even moet laden heb ik ook een loading state toegevoegd door een functie te maken die een laad scherm laat zien en de HTML waar de API in komt te staan uitzet voordat de API volledig geladen is. Als de API klaar is met laden wordt het laad scherm uitgezet en de HTML waar de API in komt wordt weer aangezet.

```jsx
// API Connection
loading('on');
fetch('https://opensheet.elk.sh/1NNaZeJXR-AaBeRoIrphPCTeAx1ltZ4ltH0yGV9_WIQ0/quotes')
  .then(response => response.json())
  .then((data) => {
    loading('off');
    renderQuotes(data);
    document.getElementById('quote_reset').onclick = function(){renderQuotes(data)};
  })
  
  function renderQuotes(quoteData){
    // Choosing a random quote
    let arrayNum = Math.floor(Math.random() * 10);
    let randomQuote = quoteData[arrayNum];
    
    // turning the id's into variables
    const cardHeading = document.getElementById('card-heading');
    const cardText = document.getElementById('card-text');
    
    // Inserting HTML content
    cardHeading.innerHTML = randomQuote.author;
    cardText.innerHTML = randomQuote.text;
  }
  
  function loading(state){
    
    if(state === 'on'){
      document.getElementById('card-container').style.display = 'none';
    }else{
      document.getElementById('card-container').style.display = 'flex';
      document.getElementById('loading-screen').style.display = 'none';
    }
    
  }
```

---

## Versie 3 - Hash routing

Hieronder staat de code voor versie 3. Met behulp van een medestudent (First) heb ik routie toegevoegd aan mijn SPA om verschillende ‘pagina’s’ te maken.

Het eerste stuk code(getHome.js) is een functie die ervoor zorgt dat er HTML word toegevoegd aan de body tag. Deze functie word vervolgens geëxporteerd om te gebruiken in het volgende stuk code.

het tweede stuk code(router.js) geeft een hash aan de home ‘pagina’ in de routie function, omdat dit de home ‘pagina’ is heb ik er voor gekozen om de hash leeg te laten. De routie function word vervolgens geëxporteerd om te gebruiken in het laaste stuk code(app.js).

```jsx
const app = document.querySelector('.app');

function getHome() {
    const markup = `
    <section class="home">
    <article class="intro">
        <h1>Welcome to DesignBoost!</h1>
        <p>This web app generates a random quote from a designer to give you a DesignBoost.</p>
    </article>
    <button>Start</button>
    </section>
    `
    app.innerHTML = markup;
}

export default getHome;
```

```jsx
import getHome from '../controllers/getHome.js';

routie({
   '': function(){
    getHome();
   }
})

export default routie;
```

```jsx
import routie from './assets/routes/router.js';
```

---

## Versie 4 - Quote page, empty state & error state

Hieronder staat het stuk code voor versie 4. Het begint met de functie getQuotes() die HTML genereert voor de quote ‘pagina’

de functie renderQuotes() vult de gegeneerde HTML met informatie van de API.

Het volgende stuk bevat de fetch met loading state uit versie 2. Als de API is gefetched staat de quote ‘pagina’ in een empty state, als de gebruiker op de knop klikt zal de informatie van de API worden weergegeven.

In de renderQuotes() functie heb ik een error message toegevoegd die kijkt of het huidige array nummer wel bestaat over groter is dan de huidige grote van de array. Als het array nummer niet bestaat of groter is dan de huidige array komt er een error message in het scherm.

Als laatste word de getQuotes functie geëxporteerd.

```jsx
const app = document.querySelector('.app');

function getQuotes(){
  const markup = `
    <section class="quotes">
      <article class="quote-container">
          <h1 class="quote-name"></h1>
          <p class="quote-text"></p>
      </article>
      <button class="quote-refresh">New quote</button>
      <h1 class="loading-text">Loading...</h1>
    </section>
  `
  app.innerHTML = markup;
  // API Connection

loading('on');
fetch('https://opensheet.elk.sh/1NNaZeJXR-AaBeRoIrphPCTeAx1ltZ4ltH0yGV9_WIQ0/quotes')
  .then(response => response.json())
  .then((data) => {
    loading('off');
    renderQuotes(data);
    document.querySelector('.quote-name').innerHTML = 'Click the button to generate a new quote.';
    document.querySelector('.quote-text').innerHTML = '';
    document.querySelector('.quote-refresh').onclick = function() {renderQuotes(data)};
  })
  
  function renderQuotes(quoteData){
    // Choosing a random quote
    const arrayNum = Math.floor(Math.random() * 11);
    const randomQuote = quoteData[arrayNum];
    
    // turning the id's into variables
    const quoteHeading = document.querySelector('.quote-name');
    const quoteText = document.querySelector('.quote-text');

    // Error message
    if(arrayNum === undefined || arrayNum > 11){
      document.querySelector('.quote-container').style.display='none';
      document.querySelector('.quote-refresh').style.display='none';
      document.querySelector('.loading-text').style.display='inline';
      document.querySelector('.loading-text').innerHTML = 'Error, please reload page';
    }
    
    // Inserting HTML content
    quoteHeading.innerHTML = randomQuote.author;
    quoteText.innerHTML = randomQuote.text;
  }
  
  function loading(state){
    if(state === 'on'){
      document.querySelector('.quote-container').style.display='none';
      document.querySelector('.quote-refresh').style.display='none';
      document.querySelector('.loading-text').style.display='inline';

    }else{
      document.querySelector('.quote-container').style.display='flex';
      document.querySelector('.quote-refresh').style.display='block';
      document.querySelector('.loading-text').style.display='none';
    }
  }
}

export default getQuotes;
```

---

## Versie 5 - Refractor & comments

Hieronder vind je alle code voor dit project. In versie 5 heb ik de code nog een keer bekeken en heb ik waar nodig code geoptimaliseerd en comments toegevoegd.

```jsx
const app = document.querySelector('.app');
// Function that generates HTML for the home page
function getHome() {
    const markup = `
    <section class="home">
    <article class="intro">
        <h1>Welcome to DesignBoost!</h1>
        <p>This web app generates a random quote from a designer to give you a DesignBoost.</p>
    </article>
    <a href="#quote"><button>Start</button></a>
    </section>
    `
    app.innerHTML = markup;
}
// Export the getHome function
export default getHome;
```

```jsx
const app = document.querySelector('.app');
// Function that generates HTML and puts a random quote inside
function getQuotes(){
  const markup = `
    <section class="quotes">
      <article class="quote-container">
          <h1 class="quote-name"></h1>
          <p class="quote-text"></p>
      </article>
      <button class="quote-refresh">New quote</button>
      <h1 class="loading-text">Loading...</h1>
    </section>
  `
  app.innerHTML = markup;
  // Variables
  const quoteContainer = document.querySelector('.quote-container');
  const quoteHeading = document.querySelector('.quote-name');
  const quoteText = document.querySelector('.quote-text');
  const quoteRefresh = document.querySelector('.quote-refresh');
  const loadingText = document.querySelector('.loading-text');
  // Start Loading
loading('on');
  // Fetching API
fetch('https://opensheet.elk.sh/1NNaZeJXR-AaBeRoIrphPCTeAx1ltZ4ltH0yGV9_WIQ0/quotes')
  .then(response => response.json())
  .then((data) => {
  // API Fetched and loading turns off
    loading('off');
  // App gets put into empty state
    quoteHeading.innerHTML = 'Click the button to generate a new quote.';
    quoteText.innerHTML = '';
  // onclick the button will render a quote
    quoteRefresh.onclick = function() {renderQuotes(data)};
  })
  // Function to render a random quote
  function renderQuotes(quoteData){
    // Choosing a random quote
    const arrayNum = Math.floor(Math.random() * 11);
    const randomQuote = quoteData[arrayNum];
    
    // Error message
    if(arrayNum === undefined || arrayNum > 11){
      quoteContainer.style.display='none';
      quoteRefresh.style.display='none';
      loadingText.style.display='inline';
      loadingText.innerHTML = 'Error, please reload page';
    }
    
    // Inserting HTML content
    quoteHeading.innerHTML = randomQuote.author;
    quoteText.innerHTML = randomQuote.text;
  }
    // Loading function
  function loading(state){
    if(state === 'on'){
      quoteContainer.style.display='none';
      quoteRefresh.style.display='none';
      loadingText.style.display='inline';

    }else{
      quoteContainer.style.display='flex';
      quoteRefresh.style.display='block';
      loadingText.style.display='none';
    }
  }
}
// Export the getQuotes function
export default getQuotes;
```

```jsx
// Import getHome and getQuotes
import getHome from '../controllers/getHome.js';
import getQuotes from '../controllers/getQuotes.js';
// Routie function to give a hash to the pages
routie({
   '': function(){
    getHome();
   },
   quote: function(){
      getQuotes();
   }
})
// Export the routie function
export default routie;
```

```jsx
// import routie pages
import routie from './assets/routes/router.js';
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>DesignBoost</title>
</head>
<body class="app">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/routie/0.3.2/routie.js"></script>
    <script type="module" src="./app.js"></script>
</body>
</html>
```

```css
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
}
body{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(186, 186, 186);
}
section{
  height: auto;
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  padding: 20px;
  background-color: rgb(92, 0, 145);
  color: white;
  border-radius: 20px;
  row-gap: 20px;
  margin: 20px;
}
article{
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-direction: column;
}
button{
  width: 100px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: black;
  color: white;
}
button:hover{
  border: 1px solid white;
  background-color: white;
  color: black;
  font-weight: 600;
}
.loading-text{
  color: white;
}
```

---

> “****************************************Het is niet veel maar ik ben er trots op****************************************” **- Jim Flament**
>
