const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: '*'}));
app.use(bodyParser.json({ type: '*/*'}));

firebase.initializeApp({
    apiKey: "AIzaSyAX-cgKDorbQMaFD_VbFoDI8fE_xH5Q6FI",
    authDomain: "pepper-879f1.firebaseapp.com",
    databaseURL: "https://pepper-879f1.firebaseio.com"
});

var refRoot = firebase.database().ref();
/*
Идентификатор проекта help_outline  pepper-879f1
Ключ API для веб-приложения  AIzaSyAX-cgKDorbQMaFD_VbFoDI8fE_xH5Q6FI
*/

app.get('/api/words', function(req, res){
  //let users;
  //const database = firebase.database().ref('/users').on('child_added', function(data){
    // var myFirebaseRef = new firebase("https://pepper-879f1.firebaseio.com");
    // myFirebaseRef.child("count").on("value", function(snapshot) {
    //   console.log(snapshot.val());  // Alerts "San Francisco"
    // });
    //const result = firebase.database().ref('users');
    //console.log(result);
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    // users = data.val();
  // });
  
  //const resp = firebase.database().ref().child('/users').toJSON();
  //const dd = firebase.database().ref('/users').once('value').then((data) => data);
  
  // console.log(dd.then(x => console.log(x)));
  
  firebase.database().child("count").on("value", function(snapshot) {
    console.log(snapshot.val());
  });

  res.status(200).send('ok');
  
});  

app.post('/api/words', function(req, res) {
        var word = {
            input : req.body.input,
            output : req.body.output,
            direction : req.body.direction,
            userId: req.body.userId,
        };


        console.log('we have got a new model ', word);


        res.status(200).send('we have got new word!!!');
  });

const port = process.env.PORT || 3091;
const server = http.createServer(app);
server.listen(port);
console.log('Server is running on port : ', port);