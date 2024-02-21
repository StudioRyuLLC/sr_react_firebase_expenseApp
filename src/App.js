//load css
import './App.css';

//get 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//load login/authentication component
import {Auth} from './pages/auth/index';

//load expense tracker component
import {ExpenseTracker} from './pages/expense_tracker/index';

//get user info
//import {useGetUserInfo} from './hooks/useGetUserInfo';

//get 404
import {NotFound} from './pages/not_found';


//get bottom navigational component
import {BottomNav} from './layouts/bottom_nav';

//----------------------

/*
<TopNav />
*/

function App() {

  //---

  return (

    <>

    <div className="App">

      

      <div className="container mb-5">

        <Router>

          <Routes>
            
            <Route exact path='*' element={<NotFound />} />
            <Route exact path="/" element={<Auth />} />
            <Route exact path="/expense_tracker" element={<ExpenseTracker />} />
            

          </Routes>

        </Router>

      </div>

      <BottomNav />

    </div>

    </>

  );//end return

}//end App

//----------------------

export default App;
