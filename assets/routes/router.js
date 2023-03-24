const getHome = require('../controllers/getHome.js')
const getQuotes = require('../controllers/getQuotes.js')
// Routie function to give a hash to the pages
routie({
   '': function(){
    getHome();
   },
   quote: function(){
      getQuotes();
   }
})
