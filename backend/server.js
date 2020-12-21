const express = require('express');
const session = require('express-session');
const store = require('better-express-store');
const restRoutes = require('./routes/restRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express();

app.use(express.json());

app.use(session({
  secret: require('./session-secret.json'),
  resave: false,
  saveUninitialized: true,
  cookie: {secure: 'auto'},
  store: store({dbPath: '../cat-forum.db'})
}))

app.listen(8080, () =>{
  console.log('Listening on port 8080');
})

app.use("/rest", restRoutes)
app.use("/auth", authRoutes)



