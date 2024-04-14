import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  //this is user from redux store
  // @ts-ignore
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
       
      })
      .catch((error) => {
        // An error happened.
        // console.log(error.message);
         navigate("/error");
      });
  };

  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        //user sign in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className=" flex w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 justify-between">
      <img
        className=" w-44"
        src={LOGO}
        alt="logo-img"
      />

      {user && (
        <div className=" flex w-20 h-16 m-2 ">
          <img src={user?.photoURL} alt="avtar" />
          <button className=" m-1" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
