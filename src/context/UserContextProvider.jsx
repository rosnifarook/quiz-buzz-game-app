import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL
        };
        
        setUserInfo(userData);

        // Check if user exists in Firestore, if not create document
        const userRef = doc(database, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // New user: create document
          await setDoc(userRef, {
            username: userData.displayName,
            email: userData.email,
            rank: null,
            lastMatchDate: null,
          });
        }
      } else {
        // User is signed out
        setUserInfo(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Combine userInfo with additional values
  const contextValue = {
    ...userInfo,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
