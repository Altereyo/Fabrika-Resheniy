import express from 'express'
import fs from 'fs'

export default (app, http) => {
    app.use(express.json());
    
    app.get('/surveys', (req, res) => {
        fs.readFile('./server/db/surveys.json', 'utf-8', (err, data) => {
            if (!err) {
                res.send(data)
            }
            else {
                console.log('server GET from /surveys failed')
            }
        })
    })
  
    app.post('/surveys', (req, res) => {
        fs.writeFile('./server/db/surveys.json', JSON.stringify(req.body, null, ' '), err => {
            if (!err) {
                res.json()
            }
            else {
                res.sendStatus(500)
            }
        })
    })
}