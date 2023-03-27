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
    quoteHeading.innerHTML = randomQuote.localStorage.author;
    quoteText.innerHTML = randomQuote.localStorage.text;
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