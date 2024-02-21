//get functions for athentication
import {auth, provider} from '../../config/firebase_config';

//get function to login with Google
import {signInWithPopup} from "firebase/auth";

//get navigation function
import { useNavigate, Navigate } from 'react-router-dom';

//get hook to check authentication
import {useGetUserInfo} from '../../hooks/useGetUserInfo';

//get top navigational component
import {TopNav} from '../../layouts/top_nav';

//--------------------------

export const Auth = () => {

    //---

    //set a variable for navigation...
    const navigate = useNavigate();

    //---

    //set var to check authentication...
    const {isAuth} = useGetUserInfo();

    //---

    //invoke the function call to Google asynchronously...
    const signInWithGoogle = async () =>{

        //wait for return of user info...
        const results = await signInWithPopup(auth, provider);

        //see results...
        //console.log(results);

        //allocate user information into an opbject...
        const authInfo ={

            userId: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }

        //store user info in browser's local storage for later use...
        localStorage.setItem("auth", JSON.stringify(authInfo));

        //move user to expense tracking page
        navigate("/expense_tracker");

        //refresh page to display elements in navbar
        navigate(0);

    };//end signInWithGoogle

    //---

    //make sure the user doesn't have have to re-login
    //if opens another browser tab
    //using Navigate component to redirect
    if(isAuth){
        
        return <Navigate to={"/expense_tracker"}  />

    }//end if

    //---

    //display in DOM...
    return (

        <>

        <TopNav />
        
            <div className="login_wrapper">

                <h6 className="text-center">Sign in with Google to Continue</h6>

                <button className="btn btn-primary btn-lg btn-block" onClick={signInWithGoogle}>

                    <i className="fab fa-google"></i> Sign In With Google

                </button>

            </div>
        </>

    );//end return
    
};//end Auth