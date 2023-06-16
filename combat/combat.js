import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, setDoc, getDoc, where, writeBatch, query, orderBy, doc, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrvFenQi-JG_IEevhH-t7QniqJ7t7e6kY",
  authDomain: "jeu-video-9ffbc.firebaseapp.com",
  projectId: "jeu-video-9ffbc",
  storageBucket: "jeu-video-9ffbc.appspot.com",
  messagingSenderId: "127788716168",
  appId: "1:127788716168:web:5e17c0d10d8a27366ccf3d",
  measurementId: "G-5HLT28D8LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// fonction pour récupèrer une collection (READ)
const getDocument = async (collectionName) => {
    const DocumentColRef = collection(db, collectionName);
    const DocumentSnapshot = await getDocs(DocumentColRef);
    const DocumentList = DocumentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return DocumentList
  }


const userExist = async (name, password) => {
  
    const DocumentColRef = collection(db, "users");
    const q = await query(DocumentColRef, where("name", "==", name), where("password", "==", password))
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot docs", querySnapshot.docs)
    const DocumentList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    console.log('test user already exists', name, password, DocumentList);
    return DocumentList;
  };

  userExist("enzo", "1234")
  userExist("enzo", "test")
// fonction pour créer une collection (CREATE)
const createDocument = async (collectionName, newObj) => {
    console.log('createDocument', newObj)
    const DocumentColRef = collection(db, collectionName);
    const DocumentSnapshot = await addDoc(DocumentColRef, newObj);
}
// createDocument("burgers", {name: "cheeseburger"})

// fonction pour mettre à jour une collection (UPDATE)
const updateDocument = async (collectionName, newObj) => {
    console.log('updateDocument', newObj)
    const DocumentColRef = doc(db, collectionName, newObj.id)
    const DocumentSnapshot = await updateDoc(DocumentColRef, newObj);
}
// fonction pour supprimer une collection (DELETE)
const deleteDocument = async (collectionName, id) => {
    console.log('deleteDocument', id)
    const DocumentColRef = doc(db, collectionName, id)
    console.log('DocumentColRef', DocumentColRef)
    await deleteDoc(DocumentColRef, id);
}

const getData = async() => {
   const data = await fetch("https://json-ece.glitch.me/burgers.json")
   const json = await data.json()
   console.log("json", json)
   displayBurgers(json.data)

   const burgers = document.querySelectorAll('.burger')
    burgers.forEach((burgerHTML, index) => {
        burgerHTML.addEventListener('click', () => {
            displayBurger(burgerList[index])
        })
    })
}

const getDataFirebase = async() => {
    
    const collection = await getDocument("Combat")
    const contentHTML = document.querySelector('#container')
    collection.forEach((jeu , index) => {
        contentHTML.innerHTML += `<div class=" h-1/2 lg:w-1/3 sm:w-1/2 p-4">
        <div class="flex relative">
          <img alt="gallery" class="absolute inset-0 w-full h-full object-cover object-center" src="${jeu.image}">
          <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
            <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">${jeu.NOM}</h2>
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${jeu.PRIX}</h1>
            <p class="text-s">${jeu.description}</p>
            <a href="" class="bg-red-500 rounded-m p-2 ms-40 text-white">Achetez!!!</a>
          </div>
        </div>`
    })
    


   
}



getDataFirebase()
