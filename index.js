const express = require('express')
const passport = require('./authen')
const routeNotes = require('./routes/notes')

const app = express()
const port = 3000

app.use(express.json());
app.use(passport.initialize());



app.get('/', (req, res) => {
    res.send('Hello World!')
})

routeNotes(app);


app.listen(port, () => console.log(`Note API listening on http://localhost:${port}!`))