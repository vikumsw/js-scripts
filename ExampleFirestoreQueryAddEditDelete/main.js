console.log("Starting app")

const admin = require('firebase-admin');

//Add the service account key path here
//const serviceAccount = require('./testfirestore-3043f-3d8bc3f28b61.json');
const serviceAccount = require('./salesmate-lk-e34c6ec36cdb.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();


async function printCollection() {
  const snapshot = await db.collection('orders').get();
  (snapshot).forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      });
}

function write() {
  const data = require('./data1.json')
  data.forEach((obj) => {
    console.log(obj);
    // Add a new document with a generated id.
    const res = db.collection('orders').add(obj);
    console.log('Added document with ID: ', res.id);
    });
}

async function Delete(){
const citiesRef = db.collection('orders');
const snapshot = await citiesRef.where('dateAdded', '==', 'DATE').get();
if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  

snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
  const res = db.collection('orders').doc(doc.id).delete();
});

}



//printCollection();
write()
//query()