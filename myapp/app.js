
import path from 'path'
import express from 'express'
import handlebars from 'express-handlebars'
import router from './routes/router.js'

const app = express()
const port = 3000
const __dirname = path.resolve();

app.use(express.static('public'))
app.use('/', router)

app.set('view engine', 'hbs')
app.set('views', 'views')

app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials'
}))

app.get('/', (req, res) => {
  res.render('main', {layout: 'index'})
})

app.get('/quotes', (req, res) => {
  // res.render('quotes', {layout: 'index'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})