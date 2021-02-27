const express = require('express')
const passport = require('./authen')
const routeNotes = require('./routes/notes')
const jwt = require('jsonwebtoken');

const app = express()
const port = 3000

app.use(express.json());
app.use(passport.initialize());
app.use(routeNotes);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post(
    '/signup', 
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        }).status(200)
})

app.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );


app.listen(port, () => console.log(`Note API listening on http://localhost:${port}!`))