const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./khshop.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const db = admin.firestore();

exports.helloWorld = functions.region('asia-northeast3').https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});



exports.createAlert = functions.region('asia-northeast3').firestore.document('chatromm/{docid}').onCreate((snapshot, context) => { //context에 파일 경로 들어있음
    var product = snapshot.data().product;
    var pariticipants = snapshot.data().participants;

    db.collection('user').document(pariticipants[0]).update({alert: '누군가 채팅검'});
    db.collection('user').document(pariticipants[1]).update({alert: '누군가 채팅검'});
})
