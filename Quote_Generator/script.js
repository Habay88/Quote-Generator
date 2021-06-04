const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// show laoding
function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

//HIDE LOADING 
function complete(){
    quoteContainer.hidden=false;
    loader.hidden= true;
}
// get quotes from api
// show new quote
function newQuote(){
    // pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   authorText.textContent = quote.author;
  // check if author field is blind
  if(!quote.author){
      authorText.textContent= 'Unknown'
  } else{
      authorText.textContent=quote.author;
  }
// check quote length todetermine the styling
if (quote.text.length > 120){
    quoteText.classList.add('long-quote');
}else {
    quoteText.classList.remove('long-quote');
}
// set quote, hide loader
   quoteText.textContent=quote.text;
   complete();
    // console.log(quote)
}

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
const response = await fetch(apiUrl);
apiQuotes = await response.json();
newQuote();
    }catch(error){
        alert(error)
        // catch error here 
    }
}

// tweet   Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}
     - ${authorText.textContent}` ;
     window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
// on Load
getQuotes();
//loading();