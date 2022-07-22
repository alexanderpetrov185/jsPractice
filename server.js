const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url)
    const body = req.url === '/'
        ? fs.readFileSync('./jslvl2_lesson1/index.html')
        : fs.readFileSync('./jslvl2_lesson1/' + req.url)
    res.end(body)
})

server.listen(3000)

console.log('Server started')