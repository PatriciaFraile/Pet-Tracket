
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
import Calendar from './components/Calendar';
import Pet from './components/Pet';
import Chat from './components/Chat';

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
        <Route path='/config' element={<Conf/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
        <Route path='/pet' element={<Pet/>}/>
        <Route path='/pet/:id' element={<Pet/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/calendar' element={<Calendar/>}/> 
       
        <Route exact path='/register' element={<SignUp/>}/>
        <Route exact path='/login' element={<SignIn/>}/>
        <Route path='/start' element={<FrontPage/>}/>        
      </Routes>
    
  
  );
}

export default App;
