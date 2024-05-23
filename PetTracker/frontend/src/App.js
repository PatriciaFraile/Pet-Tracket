import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home'
import {Routes,Route} from 'react-router-dom'
import Options from './components/Options';


function App() {
  return (
    <div>
    <Routes>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/options' element={<Options/>}/>
    </Routes>
      </div>

   
  );
}

export default App;
