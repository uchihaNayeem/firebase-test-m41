import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig)

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''

  })

  const handleClick = () => {
    // console.log(`sign in clicked`)
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const{displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser)


      console.log(displayName, photoURL, email);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  };

  const handleSignOut = () => {
    // console.log('signout Clicked');
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
      }
      setUser(signedOutUser)
      
    })
    .catch(err => {
      console.log(err);

    })
  }


  return (
    <div className="App">

      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleClick}>Sign In</button>
      }

      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="photo"/>
        </div>
      }
     
    </div>
  );
}

export default App;
