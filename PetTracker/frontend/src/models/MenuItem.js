import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import '../models.css';

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
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];
const labels = ["Añadir Mascota", "Chat", "Calendario", "Configuración"];
const routes = ["/options", "/chat", "/calendar", "/config"];

export const MenuItem = ({ i }) => {
  const navigate = useNavigate();
  const iconStyle = { 
    border: `2px solid ${colors[i]}`,
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', 
    height: '40px', 
    borderRadius: '50%', 
    flexShrink: 0, 
  };
  
  const textStyle = { 
    border: `2px solid ${colors[i]}`,
    padding: '10px',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    whiteSpace: 'nowrap'
  };

  const label = labels[i];
  const route = routes[i];

  const manejoPaginas = () => {
    navigate(route);
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      onClick={manejoPaginas}
      style={{
        listStyle: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        width: '100%' 
      }}
    >
      <div className="icon-placeholder" style={iconStyle} />
      <div className="text-placeholder" style={textStyle}><b>{label}</b></div>
    </motion.li>
  );
};

export const Menu = () => {
  return (
    <ul style={{ padding: 0 }}>
      {labels.map((_, i) => (
        <MenuItem key={i} i={i} />
      ))}
    </ul>
  );
};
