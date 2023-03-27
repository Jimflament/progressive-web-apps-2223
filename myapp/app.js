
import path from 'path'
import express from 'express'
import handlebars from 'express-handlebars'

const app = express()
const port = 3000
const __dirname = path.resolve();

app.use(express.static('public'))

app.set('view engine', 'hbs')
app.set('views', 'views')

app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials'
}))

app.get('/', (req, res) => {
  res.render('home', {layout: 'index'})
})

app.get('/quotes', async (req, res) => {
  const response = await fetch('https://opensheet.elk.sh/1NNaZeJXR-AaBeRoIrphPCTeAx1ltZ4ltH0yGV9_WIQ0/quotes')
   const data = await response.json();
   console.log(data);
   res.render('quotes', {quotes: data})
})

app.get('/randomquote', async (req, res) => {
  const response = await fetch('https://opensheet.elk.sh/1NNaZeJXR-AaBeRoIrphPCTeAx1ltZ4ltH0yGV9_WIQ0/quotes')
   const data = await response.json();

   const randomIndex = Math.floor(Math.random() * data.length);
   const randomQuote = data[randomIndex];


   res.render('randomquote', {author: randomQuote.author, text: randomQuote.text});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})