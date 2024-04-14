import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const dispatch = useDispatch();

  const [validationMessage, setValidationMessage] = useState(null);
  //to navigate the user

  //to get the input form values through useRef Hook ,

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const handleclick = () => {
    //validate the form from utils , handle click is not directly recieving the args it recv through useRef().
    const message = checkValidData(email.current.value, password.current.value);
    setValidationMessage(message);
    console.log(message);
    //if message is null -> valid data
    console.log(email.current.value);
    console.log(password.current.value);

    if (message === null) {
      //sign in or sign as per below ,
      if (!isSignInForm) {
        //if the form is signup register user

        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            console.log(user);
            updateProfile(user, {
              displayName: name.current.value,
              photoURL:USER_AVATAR
              ,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
                // Profile updated!
              })
              .catch((error) => {
                // An error occurred
                setValidationMessage(error.message);
              });
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            setValidationMessage(errorCode + " " + errorMessage);
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
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setValidationMessage(errorCode + " " + errorMessage);
          });
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <Header />
      <img
        className=" absolute"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="logo"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold textfont-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className=" p-2 m-2 text-blackp-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2 text-blackp-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 text-blackp-4 my-4 w-full bg-gray-700"
        />
        <p className="p-4 text-red-600 ">{validationMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleclick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New To Netflix? Sign Up"
            : "Already Registerd Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
