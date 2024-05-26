import React from "react";
import { motion } from 'framer-motion';


const FrontPage = () =>{

    return(
        
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
        
    )
}
export default FrontPage