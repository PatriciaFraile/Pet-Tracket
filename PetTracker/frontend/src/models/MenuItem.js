import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000}
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];
const labels = ["Mascota","Recetas","Calendario","Configuracion"]

export const MenuItem = ({ i }) => {
  const style = { 
    border: `2px solid ${colors[i]}`, 
    padding: '10px', 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',

  };  const label = labels[i]
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={{ ...style, marginRight: '10px', width: '40px', height: '40px' }} />
      <div className="text-placeholder" style={style}><b>{label}</b></div>
    </motion.li>
  );
};

export const Menu = () => {
  return (
    <ul style={{padding: 0}}>
      {labels.map((_, i) => (
        <MenuItem key={i} i={i} />
      ))}
    </ul>
  );
};
