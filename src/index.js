import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  addDoc,deleteDoc,doc
} from 'firebase/firestore'


const firebaseConfig = {

    apiKey: "AIzaSyBIOibZ1rmC2M_3GdmQJjFxY3WnJBnFy4c",
  
    authDomain: "fir-9-dojo-dce83.firebaseapp.com",
  
    projectId: "fir-9-dojo-dce83",
  
    storageBucket: "fir-9-dojo-dce83.appspot.com",
  
    messagingSenderId: "287223468159",
  
    appId: "1:287223468159:web:3c91553967e4d8d450af4a"
  
  };

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'Book')

// get collection data
getDocs(colRef)
  .then(snapshot => {
    console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })

  // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
e.preventDefault()

addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
})
.then(() => {
    addBookForm.reset()
})
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Book', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})