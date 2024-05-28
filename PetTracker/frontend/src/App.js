import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home'
import Cat from './components/Cat'
import Dog from './components/Dog'
import Conf from './components/Conf'

import {Routes,Route} from 'react-router-dom'
import Options from './components/Options';
import FrontPage from './models/FrontPage';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = null; 

    return auth ? <Outlet /> : <Navigate to="/start" />;
}



function App() {
  return (
    
      <Routes>
        <Route exact path='/' element={<PrivateRoute/>}>
        </Route>
          <Route exact path='/options' element={<Options/>}/>
          <Route path='/dog' element={<Dog/>}/>
          <Route path='/cat' element={<Cat/>}/>
          <Route path='/home' element={<Home/>}/>
        <Route exact path='/register' element={<SignUp/>}/>
        <Route exact path='/login' element={<SignIn/>}/>
        <Route path='/start' element={<FrontPage/>}/>
          <Route path='/config' element={<Conf/>}/>
        
      </Routes>
    
  
  );
}

export default App;
