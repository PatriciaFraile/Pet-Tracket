import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home'
import {Routes,Route} from 'react-router-dom'
import Options from './components/Options';
import { motion } from 'framer-motion';



function App() {
  return (
      <div>
        <div className='home'>
        <motion.div
        initial={{ width: 0, height: 0 }}
        animate={{ width: '60%', height: '100%' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'blue'
        }}
      />
        </div>
    
    
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
