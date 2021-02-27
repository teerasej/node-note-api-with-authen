const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const dbConnection = require('./db');
const dbName = 'nfmongop';

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        let client = await dbConnection.connect()
        try {

            let collection = client.db(dbName).collection('users')
            let user = await collection.insertOne({ email: email, password: password })

            return done(null, user);
        } catch (error) {
            return done(null, false, { message: 'create user error' })
        } finally {
            client.close()
        }

    })
);

passport.use('login', new LocalStrategy(
    {
        emailField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {

        try {
            let client = await dbConnection.connect()
            let collection = client.db(dbName).collection('users')

            collection.findOne({ email: email }, (err, user) => {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                if (!(user.password === password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        } catch (error) {
            return done(null, false)

        } finally {
            client.close()
        }

    })
);

module.exports = passport;

