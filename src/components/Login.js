import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [signedIn, setSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const isSignedIn = () => {
    setSignedIn(!signedIn);
  };
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    //for validating form
    const message = checkValidData(email.current.value, password.current.value); //since useRef returns an object and i extract the name and pass from that object
    setErrorMessage(message);
    if (message) return;

    if (!signedIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/128176157?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute  ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_small.jpg"
          alt="backgroundimg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute text-white w-1/4 p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md bg-opacity-80"
      >
        <h4 className="text-white text-3xl font-bold mb-6">
          Sign {signedIn ? "In" : "Up"}{" "}
        </h4>
        {!signedIn && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 my-4 bg-black border rounded-sm
        w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-2 my-4 bg-black border rounded-sm
        w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 bg-black border rounded-sm
        w-full"
        />
        <p className="text-red-500 ">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="bg-red-600 rounded-md text-white p-2 my-4 w-full"
        >
          Sign {signedIn ? "In" : "Up"}
        </button>
        <p onClick={isSignedIn} className="cursor-pointer">
          {signedIn
            ? "New to Netflix? Sign up now"
            : "Already have an account?Sign In"}{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
