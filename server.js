const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const fireConfig = require('./config/config');
const testDataProvider = require('./testDataProvider');

// FIREBASE REST
const FirebaseREST = require('firebase-rest').default;
const bulkUpdate = require('./bulkUpdate');

// Import Admin SDK
var admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require("./pepper-031bdd0c40a5.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fireConfig.databaseURL
});

// Initialize the main app
var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");
firebase.initializeApp({
    apiKey: fireConfig.apiKey,
    authDomain: fireConfig.authDomain,
    databaseURL: fireConfig.databaseURL
});

// COMMON PREFERENCES
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: '*'}));
app.use(bodyParser.json({ type: '*/*'}));

// ENDPOINTS
const baseURL = '/api/words';

// get all words
app.get(baseURL, (req, res) => {
  const standardClient = new FirebaseREST.Client(fireConfig.databaseURL);
  standardClient.get('/words')
                .then(res => res.json())
                .then(jsonRes => {
                  console.log('WORDS :');
                  console.log(jsonRes);
                  res.status(200).send(jsonRes);
                })
                .catch(error => res.status(500).send('Something went wrong: ' + error));
});
// get words for appropriate user
app.get(baseURL + '/:userId', (req, res) => {
  const userID = req.params.userId;
  console.log('userID is ', userID);

  var db = admin.database();
  var ref = db.ref('words');
  ref.orderByChild('userId')
     .equalTo(userID).once('value', result => {
      console.log(result.val());
      res.status(200).send(result.val());
     }, function(error) {
      console.log('Error query is ', error);
     });
});
// bulk update
app.post(baseURL+'/bulk', function(req, res) {
  var words = req.body.wordsObject.items;
  console.log('We have got an array of words ', words);

  // Get a database reference to our words storage
  var db = admin.database();
  var ref = db.ref('words');

  bulkUpdate(ref, words)
    .then(result => {
      console.log('Words successfully added.');
      console.log(result);
        res.status(200).send('Words successfully added.');      
    })
    .catch(error => res.status(500).send('Something went wrong: ' + error));
  });



// just add a word
app.post(baseURL, function(req, res) {
  // extract word from request
  var word = {
      input : req.body.input,
      output : req.body.output,
      direction : req.body.direction,
      userId: req.body.userId,
  };
  console.log('We have got a new word ', word);

  const client = new FirebaseREST.Client(fireConfig.databaseURL);
  client
    .post('/words')
    .then(res => res.json())
    .then(jsonRes => {
      console.log('word was added, details :');
      console.log(jsonRes);
      res.status(200).send(jsonRes);
    })
    .catch(error => res.status(500).send('Something went wrong: ' + error));
});

// run Server
const port = process.env.PORT || 3091;
const server = http.createServer(app);
server.listen(port);
console.log('Server is running on port : ', port);