

//get navigate function
import {useNavigate} from 'react-router-dom';


//get top navigational component
import {TopNav} from '../layouts/top_nav';

//-----------------------------

export const NotFound = () => {

    //---

    //set navigation var
    const navigate = useNavigate();

    //function to return user home...
    const goToHome = () => {

        return navigate("/");
        
    }

    //---

    return(

        <>

        <TopNav />

        <div className="login_wrapper text-center">

            <h1><i class='fas fa-exclamation-triangle'></i> Oops! <i class='fas fa-exclamation-triangle'></i></h1>

            <h4>404 Page not found.</h4>

            <p className="faux_link" onClick={goToHome}>
                
                <span className='faux_link_text'>
                    Click here to find your way <i className='fas fa-home'></i>.
                </span>

             </p>

        </div>
        
        
        </>
    );

}//end NotFound