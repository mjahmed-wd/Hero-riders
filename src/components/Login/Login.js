import "./Login.css";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
// import firebaseConfig from "./firebase.config.js";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { firebaseInitialization } from "./SignOut";



function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useContext(UserContext);
// if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // }
  firebaseInitialization()
  
  // const handleSignOut = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       // Sign-out successful.
  //       setUser({
  //         isSignedIn: false,
  //         name: "",
  //         email: "",
  //         password: "",
  //         photo: "",
  //       });
  //       console.log("Sign Out");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //     });
  // };

  // const handleLogOut= ()=>{
  //   handleSignOut().then(res=>setUser(res))
  // } 
  const { register, handleSubmit, errors } = useForm();
  
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
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
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
        const newUserInfo = { ...user };
        newUserInfo.name = emailUser.displayName;
        newUserInfo.isSignedIn = true;
        setUser(newUserInfo);
       history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const handleBlur = (e) => {
    if (newUserStatus && e.target.name === "password") {
      const newUserInfo = { ...user };
      newUserInfo.givenPassword = e.target.value;
      setUser(newUserInfo);
    } else if (newUserStatus && e.target.name === "confirmPassword") {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      if (newUserInfo[e.target.name] === newUserInfo.givenPassword) {
        newUserInfo.password = e.target.value;
        setUser(newUserInfo);
      } else {
        alert("Please Provide same Password");
      }
    } else {
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
        var googleUser = result.user;
        const newUserInfo = { ...user };
        newUserInfo.name = googleUser.displayName;
        newUserInfo.isSignedIn = true;

        setUser(newUserInfo);
        console.log(user.name);
       history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
              onBlur={handleBlur}
              ref={register({ required: true })}
            />
            <br />
            {/* include validation with required or other standard HTML validation rules */}

            <input
              name="password"
              type="password"
              placeholder="Password"
              onBlur={handleBlur}
              ref={register({
                required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
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
              <button >Forget Password?</button>
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
          {!newUserStatus && (<><p className="pt-2">
            Don't have an account?
            <button
              onClick={() => setNewUserStatus(!newUserStatus)}
              
            >
              Create a new one.
            </button>
          </p></>)}
        </div>
      </div>
      {/* google login */}

      <p>Or</p>
      <button onClick={() => googleLogin()}>Continue with Google</button>
      <br />
      {/* <button onClick={() => handleLogOut()}>Signing Out</button> */}
    </div>
  );
}

export default Login;
