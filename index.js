const express = require('express')
const passport = require('./authen')

const routeNotes = require('./routes/route-note')
const routeUser = require('./routes/route-user')
const routeAuthen = require('./routes/route-authen')

const app = express()
const port = 3000

app.use(express.json())
app.use(passport.initialize())
app.use('/notes', routeNotes)
app.use('/users', routeUser)
app.use('/', routeAuthen)



app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => console.log(`Note API listening on http://localhost:${port}!`))