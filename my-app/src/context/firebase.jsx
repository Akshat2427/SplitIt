import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged , signOut , GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, updateDoc , getDocs , getDoc , doc , arrayUnion} from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const google = new GoogleAuthProvider();
const firestore = getFirestore(app);

export const FirebaseContext = createContext(null);

const signUpUserWithEmail = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  console.log("user", user);
};

const signInUserWithEmail = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  console.log("user", user);
};

const signInWithGoogle = ()=>{
    signInWithPopup(auth , google) 
        }


const signOutUser = async () => {
  await signOut(auth);
  console.log("User signed out");
};
 
 //firestore
 const addRoomInPersonalEmail = async(userUID , id)=>{
  const userRef = await addDoc(collection(firestore,userUID ), {
    currentRooms: id
   });
  
 }
const addData = async(roomName ,  info ,  userUID)=>{
  const docRef = await addDoc(collection(firestore, "Rooms"), {
    roomName: roomName,
    info: info
  });
addRoomInPersonalEmail(userUID , docRef.id)
   info.forEach(e=>{
    if(e?.email)
    addRoomInPersonalEmail(e.email,docRef.id)
   })
console.log("done with mails data");
}

const helperFunction = async (data) => {
  try {
    const dr = await getDocs(collection(firestore, data));
    console.log("dr", dr);
    dr.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().roomName}`);
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};
const getDocumentData = async (collectionName, documentName) => {
  const arr = [ ]
  console.log("Here starts git part");
  try {
    const docRef = doc(firestore, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`${docSnap.id} => ${docSnap.data().roomName}`);
      arr.push(docSnap.data().roomName);
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document data:", error);
  }
};
const showData = async (userUID) => {
  let arr = []
  try {
    console.log("called");
    const querySnapshot = await getDocs(collection(firestore, userUID));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().currentRooms}`);
      helperFunction(doc.data().currentRooms);
      getDocumentData("Rooms" ,doc.data().currentRooms ).then(e=>{
       arr.push(e)
        console.log("array then" , e);
      })
    
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  console.log("array arr" , arr);
  return arr;
};

const addExpenseInEditRoom = async (data, id) => {
  try {
    const docRef = doc(firestore, "Rooms", id);

    const newData = { data };

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const info = docSnap.data().info;
      const updatedInfo = updateNameInInfo(info ,  data);

      await updateDoc(docRef, {
        Expenses: arrayUnion(newData),
        info: updatedInfo
      });

      console.log("Document updated successfully!");
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const fetchExpenseFromEditRoom = async (id) => {
  try {
    const docRef = doc(firestore, "Rooms", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dataArray = docSnap.data().Expenses;
      const info = docSnap.data().info;

      console.log('Array data from fetchExpenseFromEditRoom : ', dataArray);
      dataArray.forEach(e => {
        console.log(e.data);
      });

      return {dataArray , info};
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

const updateNameInInfo = (info , data) => {
  const arr = [...info];
  const flag  = arr.find(e=>{
    return e.name == data.name ;
  })
  if(!flag)
  arr.push({ name: data?.name, email: "" });
  return arr;
};

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const loggedIn = user ? true : false;

// additional info



if(loggedIn){
  const displayName = user.displayName || "User";
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

 
  const uid = user.uid ;
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
  console.log("name" , displayName);
}





  return (
    <FirebaseContext.Provider value={{ name: "Akshat", signUpUserWithEmail, signInUserWithEmail, loggedIn , user , signOutUser , signInWithGoogle , addData , showData , firestore , addExpenseInEditRoom , fetchExpenseFromEditRoom}}>
      {children}
    </FirebaseContext.Provider>
  );
};