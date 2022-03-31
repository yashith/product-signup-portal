import { app } from "./firebase-config";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const auth=getAuth(app);

const google_auth= new GoogleAuthProvider();


export function signInWithGoogle(){
    return(
    signInWithPopup(auth,google_auth)
    .then((result)=>{
        return result
    })
    .catch(err=>{
        return new Error(err)
    })
    )  
}
