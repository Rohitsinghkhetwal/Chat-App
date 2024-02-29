import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {auth, db} from "../FirebaseConfig";
import { addDoc, doc, getDoc, setDoc} from "firebase/firestore";

export const AuthContext = createContext();

export const ContextProvider = ({children}) => {

    const [User, setUser] = useState(null);
    const [Authenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        //onAuthStateChanges
        const unSubs = onAuthStateChanged(auth, (User) => {
            if(User){
                setAuthenticated(true);
                setUser(User)
            }else{
                setAuthenticated(false);
                setUser(null);
            }
        })

        return unSubs;
    },[])

    const Onlogin = async(email, password,) => {
        try{
            const result = await signInWithEmailAndPassword(auth, email, password);
            return {success: true}

        }catch(error){
            return {success: false, msg: error.message}

        }
    }


    const OnLogout = async() => {
        try{
            await signOut(auth);
            return {success: true}

        }catch(err){
            return {success: false, msg: err.message, error: e}

        }
    }

    const OnRegister = async( email, password,username, profileUrl) => {
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response of a User", result);
            await setDoc(doc(db, "users", result?.user?.uid), {
                username,
                profileUrl,
                userId: result?.user?.uid
            })

            return {success: true, data: result?.user}

        }catch(error){
            return {success: false, msg: error.message}

        }

    }

    return (
      <AuthContext.Provider
        value={{ Onlogin, OnLogout, OnRegister, Authenticated, User }}
      >
        {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value){
        throw new Error("useAuth must be wrapped !")
    }
    return value; 
}