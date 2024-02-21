
//get function for navigation
import { useNavigate} from 'react-router-dom';

//get state of user (logged in/out)
import {auth} from '../config/firebase_config'

//get user info
import {useGetUserInfo} from '../hooks/useGetUserInfo';

//enable the ability for user to sign out
import {signOut} from 'firebase/auth';

//----------------------------

export const TopNav = () => {

    //---

        //initiate navigate hook
        const navigate = useNavigate();

    //---

    const {name, profilePhoto, isAuth} = useGetUserInfo();

    //---

        //asychronous function to sign a user out
        const signUserOut = async () => {

            //enable ability to catch errors while trying to log out
            try{
      
              await signOut(auth);
      
              //clear local storage; no user logged in
              localStorage.clear();
      
              //return to login page
              navigate("/");
      
            //TODO: refresh page to display elements in navbar
            navigate(0);
      
            }catch(err){
      
              //capture/display error
              console.error(err);
      
            }
            
          };

    //---

    return (
        <>

            <nav className="navbar fixed-top navbar-dark bg-primary nav_top">

                {isAuth ? 

                (<span className="navbar-brand mb-0 navbar_title loggedin"><span className='navbar_title_name_wrapper'>{name}'s</span> Expense Tracker</span>) : 
                
                (<span className="navbar-brand mb-0 navbar_title">Expense Tracker</span>)

                }

                {isAuth &&  <div className="profile"><img src={profilePhoto} alt={name} className="profile_img"/></div>}

                {isAuth && <p className="faux_link signout_wrapper" onClick={signUserOut}><i className='fas fa-sign-out-alt' /> <span className='faux_link_text'>Sign Out</span></p>}

            </nav>

        </>

    );//end return

};//end TopNav