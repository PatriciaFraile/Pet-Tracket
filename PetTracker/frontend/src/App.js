import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home'
import {Routes,Route} from 'react-router-dom'


function App() {
  return (
    <div>
    <Routes>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
      </div>

   
  );
}

export default App;
