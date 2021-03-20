import "./Login.css";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config.js";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

function Login() {
  // const [user, setUser] = useState({
  //   isSignedIn: false,
  //   name: "",
  //   email: "",
  //   password: "",
  //   givenPassword: "",
  //   confirmPassword: "",
  //   photo: "",
  // });
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser]=useContext(UserContext)
  
  
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUser({
          isSignedIn: false,
          name: "",
          email: "",
          password: "",
          photo: "",
        });
        console.log("Sign Out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const { register, handleSubmit, errors } = useForm();
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [newUserStatus, setNewUserStatus] = useState(false);

  const firebaseSignupWithEmail = (e) => {
    if (newUserStatus) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in

          firebaseSignInWithEmail();
          var guser = firebase.auth().currentUser;

          guser
            .updateProfile({
              displayName: user.name,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
            .then(function () {
              // Update successful.
              console.log(user.name, "success");
              history.replace(from);
            })
            .catch(function (error) {
              // An error happened.
            });
          // var myUser = userCredential.user;
          //   console.log("created", myUser.displayName);
          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ..
        });
    } else {
      firebaseSignInWithEmail();
    }
  };

  const firebaseSignInWithEmail = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in
         var emailUser = userCredential.user;
        // // ...
        // console.log("Signed In success", user.displayName);
        const newUserInfo = { ...user };
      newUserInfo.name = emailUser.displayName;
      newUserInfo.isSignedIn = true;
      setUser(newUserInfo)
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };
  // let passwordNotification = false;
  const handleBlur = (e) => {
    if (newUserStatus && e.target.name === "password") {
      const newUserInfo = { ...user };
      newUserInfo.givenPassword = e.target.value;
      setUser(newUserInfo);

    } 
    else if (newUserStatus && e.target.name === "confirmPassword") {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      if (newUserInfo[e.target.name] === newUserInfo.givenPassword) {
        newUserInfo.password = e.target.value;
        setUser(newUserInfo);
        // passwordNotification = true;
      } else {
        // passwordNotification = false;
        alert("Please Provide same Password");
      }
      // console.log(passwordNotification,newUserInfo[e.target.name],e.target.value)
    } else{
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  
  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var googleUser = result.user;
        const newUserInfo = { ...user };
      newUserInfo.name = googleUser.displayName;
      newUserInfo.isSignedIn = true;

      setUser(newUserInfo);
      console.log(user.name)
      history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage)
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  };
  return (
    <div className="App">
      <div className="form">
        <h3 className="p-2">Login</h3>
        <div className="formInput">
          <form onSubmit={handleSubmit(firebaseSignupWithEmail)}>
            {newUserStatus && (
              <input
                type="text"
                onBlur={handleBlur}
                name="name"
                placeholder="Your Name"
              />
            )}
            <br />
            <input
              name="email"
              placeholder="Email"
              defaultValue="test@gmaol.ocm"
              onBlur={handleBlur}
              ref={register({ required: true })}
            />
            <br />
            {/* include validation with required or other standard HTML validation rules */}

            <input
              name="password"
              type="password"
              placeholder="Password"
              defaultValue="12345678"
              onBlur={handleBlur}
              ref={register({
                required: true,
              })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <span>
                This field is required and at least 8 characters, 1 numeric
                character, 1 lowercase letter, 1 uppercase letter, 1 special
                character.
              </span>
            )}
            <br />

            {newUserStatus && (
              <input
                type="password"
                onBlur={handleBlur}
                name="confirmPassword"
                placeholder="Confirm Your Password"
              />
            )}

            <div className="d-flex justify-content-center p-2">
              <button style={{ color: "#ff5722" }}>Forget Password?</button>
            </div>
            <input
              type="submit"
              style={{
                backgroundColor: "tomato",
                color: "white",
                width: "100%",
              }}
              value={newUserStatus ? "Register" : "Login"}
            />
          </form>
          <p className="pt-2">
            Don't have an account?
            <button
              onClick={() => setNewUserStatus(!newUserStatus)}
              style={{ color: "#ff5722" }}
            >
              Create a new one.
            </button>
          </p>
        </div>
      </div>
      {/* google login */}

      <p>Or</p>
      <button onClick={() => googleLogin()}>Continue with Google</button>
      <br />
      <button onClick={() => handleSignOut()}>Signing Out</button>
    </div>
  );
}

export default Login;
