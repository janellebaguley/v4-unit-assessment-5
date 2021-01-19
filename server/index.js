require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts'),
      massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING} = process.env;


const app = express();

app.use(express.json());

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then((db) => {
    app.set('db', db)
    console.log('db connected')
})

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));