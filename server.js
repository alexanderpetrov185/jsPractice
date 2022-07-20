const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url)
    const body = req.url === '/style.css'
        ? fs.readFileSync('./jslvl2_lesson1/style.css')
        : req.url === '/script.js'
            ? fs.readFileSync('./jslvl2_lesson1/script.js')
            : fs.readFileSync('./jslvl2_lesson1/index.html')
    res.end(body)
})

server.listen(3000)

console.log('Server started')