const express = require('express')
const articleRoutes = require('./routes/article')
const Article = require('./models/article')

const methodOverride = require('method-override')

const app = express()

app.set('view engine', 'ejs')

app.listen(3000)

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))

app.get('/', async (req, res) =>{
	const articles = await Article.find().sort({ createdAt: 'desc' })
	res.render('articles/index', {articles : articles})
})

app.use('/articles', articleRoutes)