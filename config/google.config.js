var admin = require('firebase-admin');
var serviceAccount = require('./mypaied-firebase-adminsdk-mvxb4-f584f6f949.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mypaied-default-rtdb.firebaseio.com"
});