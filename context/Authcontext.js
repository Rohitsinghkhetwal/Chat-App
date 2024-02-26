import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const ContextProvider = ({children}) => {

    const [User, setUser] = useState(null);
    const [Authenticated, setAuthenticated] = useState(undefined);

    useEffect(() => {
        //onAuthStateChanges
        setTimeout(() => {
            setAuthenticated(true)

        }, 3000)

    },[])

    const Onlogin = async(email, password,) => {
        try{

        }catch(error){

        }
    }


    const OnLogout = async() => {
        try{

        }catch(err){

        }
    }

    const OnRegister = async(username, email, password, profileUrl) => {
        try{

        }catch(error){

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