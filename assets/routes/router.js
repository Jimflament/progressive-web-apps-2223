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