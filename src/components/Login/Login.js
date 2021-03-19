import "./Login.css";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config.js";
import { useState } from "react";
// import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
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
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [newUserStatus, setNewUserStatus] = useState(false);
  const signUp = () => {};

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
            })
            .catch(function (error) {
              // An error happened.
            });
          var myUser = userCredential.user;
        //   console.log("created", myUser.displayName);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
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
        var user = userCredential.user;
        // ...
        console.log("Signed In success", user.displayName);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const handleBlur = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  };
  const provider = new firebase.auth.GoogleAuthProvider();
  const googleLogin=()=> {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  return (
    <div className="App">
      {user.name && <p>{user.name}</p>}
      <input
        type="checkbox"
        onChange={() => setNewUserStatus(!newUserStatus)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign up</label>
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
              ref={register}
            />
            <br />
            {/* include validation with required or other standard HTML validation rules */}

            <input
              name="password"
              placeholder="Password"
              defaultValue="12345678"
              onBlur={handleBlur}
              ref={register({ required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}
            <br />
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
            Don't have an account?{" "}
            <button onClick={() => setNewUserStatus(!newUserStatus)} style={{ color: "#ff5722" }}>Create a new one.</button>
          </p>
        </div>
      </div>
      {/* google login */}

      <p>Or</p>
      <button  onClick={()=>googleLogin()}>Continue with Google</button>
      <br />
      <button onClick={() => handleSignOut()}>Signing Out</button>
    </div>
  );
}

export default Login;
