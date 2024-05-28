import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../models/use-dimensions";
import { MenuToggle } from "../models/MenuToggle";
import { Navigation } from "../models/Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const Home = ({ userName, dogImageUrl }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <div style={{ backgroundColor: 'grey', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
        <h1 style={{fontSize:'2rem'}}>Bienvenido {userName}</h1>
        {dogImageUrl && <img src={dogImageUrl} alt="Perro seleccionado" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />}
      </div>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '300px' }}
      >
        <motion.div className="background" variants={sidebar} style={{ backgroundColor: 'white', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </div>
  );
};

export default Home;
