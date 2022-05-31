import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth( app );
function App() {
  const [ user, setUser ] = useState( {} );
  const provider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup( auth, provider )
      .then( result => {
        const user = result.user;
        setUser( user );
      } ).catch( error => {
        console.error( 'error', error );
      } );
  };

  const handleSignOut = () => {
    signOut( auth )
      .then( () => {
        setUser( {} );
      } ).catch( ( error ) => {
        setUser( {} );
      } );
  };
  const handleGithubSignIn = () => {
    signInWithPopup( auth, gitProvider )
      .then( result => {
        const user = result.user;
        setUser( user );
      } ).catch( error => {
        console.error( 'error', error );
      } );
  };

  const handleGithubSignOut = () => {
    signOut( auth )
      .then( () => {
        setUser( {} );
      } ).catch( ( error ) => {
        setUser( {} );
      } );
  };
  return (
    <div className="App">
      {
        user.uid ? <div>
          <button onClick={handleSignOut}>Sign Out</button><button onClick={handleGithubSignOut}>GitHub SignOut</button>
        </div> : <div>
          <button onClick={handleGoogleSignIn}>Google SignIn</button>
          <button onClick={handleGithubSignIn}>GitHub SignIn</button>
        </div>
      }
      <h4>Name: {user.displayName}</h4>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
