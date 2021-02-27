const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const dbConnection = require('./db');
const dbName = 'nfmongop';

passport.use(new LocalStrategy(
    async (username, password, done) => {

        let client = await dbConnection.connect()
        let collection = client.db(dbName).collection('users')
        let result = await collection.insertOne(newNote);
        client.close()

        collection.findOne({ username: username },  (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!(user.password === password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
)
);

module.exports = passport;

