const fs = require('fs')
const cheerio = require('cheerio')
const colors = require('colors')

fs.readFile('index.html', 'utf8', (err, markup) => {
	if (err) {
		return console.log(err)
	}

	const $ = cheerio.load(markup)
	$('head').prepend('')

	fs.writeFile('public/index.html', $.html(), 'utf8', function (err) {
		if (err) {
			return console.log(err)
		}
		console.log('index.html written to /public'.green)
	})
})
