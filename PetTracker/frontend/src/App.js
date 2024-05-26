import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home'
import {Routes,Route} from 'react-router-dom'
import Options from './components/Options';
import FrontPage from './models/FrontPage';



function App() {
  return (
      

    
    <Routes>
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/options' element={<Options/>}/>
    <Route path='*' element={<FrontPage/>}/>

  </Routes>
      
    

   
  );
}

export default App;
