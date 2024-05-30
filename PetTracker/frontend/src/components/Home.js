import React, { useState, useEffect, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../models/use-dimensions";
import { MenuToggle } from "../models/MenuToggle";
import { Navigation } from "../models/Navigation";
import axios from "axios";

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

const fotosPerros = {
  "Labrador Retriever": "https://th.bing.com/th/id/R.23fdd93f5a9d1337a3309c56c266a811?rik=oMt%2bq9KuT3fGeA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f9%2f90%2fLabrador_Retriever_portrait.jpg&ehk=Kse1knvMWRxxVOGeJ60Jp4w17ydmE%2fZMJ2i9%2bs977DM%3d&risl=&pid=ImgRaw&r=0",
  "Pastor Alemán": "https://th.bing.com/th/id/R.23fdd93f5a9d1337a3309c56c266a811?rik=oMt%2bq9KuT3fGeA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f9%2f90%2fLabrador_Retriever_portrait.jpg&ehk=Kse1knvMWRxxVOGeJ60Jp4w17ydmE%2fZMJ2i9%2bs977DM%3d&risl=&pid=ImgRaw&r=0",
  "Golden Retriever": "https://th.bing.com/th/id/R.dc2228475042694689cad662983a7476?rik=iQS7HAYckRmzsg&riu=http%3a%2f%2fso-pet.com%2fwp-content%2fuploads%2f2016%2f11%2fpexels-photo-24871.jpg&ehk=E2h8ToG4VYlN4rAesDc%2fA6197GYm4tD2TRlclwyPsHQ%3d&risl=1&pid=ImgRaw&r=0",
  "Bulldog Francés": "https://www.zaunk.com/wp-content/uploads/2020/05/bulldog-frances-fisico-scaled.jpg",
  "Bulldog Inglés": "https://demascotas.info/wp-content/uploads/2018/03/english-bulldog-538485_1280.jpg",
  "Caniche": "https://th.bing.com/th/id/OIP.nJkW9M5VnG1e-5YwHalcRwHaE7?rs=1&pid=ImgDetMain",
  "Beagle": "https://upload.wikimedia.org/wikipedia/commons/6/65/Cute_beagle_puppy_lilly.jpg",
  "Rottweiler": "https://th.bing.com/th/id/R.791a4477f350cc74b124b533bdd5612e?rik=kj%2f1wCcN0BRo4w&pid=ImgRaw&r=0",
  "Pointer": "https://www.thesprucepets.com/thmb/5nMZibb4GAw_CCIE5dEfdV4rZVM=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/VizslaGettyDarrenWilliamHall-4c5bc913760249e288782e178686b838.jpg",
  "Corgi": "https://th.bing.com/th/id/R.a102d5a0d2bbe4d9f5f610758d1f631b?rik=loBLVxY0WA5%2flA&riu=http%3a%2f%2fwww.petpaw.com.au%2fwp-content%2fuploads%2f2014%2f06%2fPembroke-Welsh-Corgi-4.jpg&ehk=Qq9j8zDzMcu9liEPQ%2bTCIPTJbgHhib4sDBsS94MW200%3d&risl=&pid=ImgRaw&r=0",
  "Dachshund": "https://th.bing.com/th/id/R.5ba8431a71b9dffded91da82f01f9892?rik=8L2SPpHUpNzGFA&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f07%2fDachshund-3.jpg&ehk=gkiVUJHzfkLQUs44W9yMpojffZNm0ESWoD6%2bM3LLsuQ%3d&risl=&pid=ImgRaw&r=0",
  "Yorkshire": "https://www.zooplus.de/magazin/wp-content/uploads/2018/07/yorkshire-terrier-im-grass.jpg",
  "Husky": "https://th.bing.com/th/id/R.85e4a0b94d0d280973eb0663dde343cd?rik=FPHHvoYfki0kow&riu=http%3a%2f%2fmydoggy.rocks%2fwp-content%2fuploads%2f2014%2f09%2fSiberian-Husky-wallpaper.jpg&ehk=U%2fceKp8hEHKY38wa9NK%2f4TiygMhX66HfNx3VwR1hRss%3d&risl=&pid=ImgRaw&r=0",
  "Poodle": "https://th.bing.com/th/id/R.68edcb8bba466b0b75532e90de1a2c9a?rik=bEZgNB4NQyzrzw&pid=ImgRaw&r=0",
  "Chihuahua": "https://jooinn.com/images/chihuahua-13.jpg"
};

const Home = ({ userName }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [pets, setPets] = useState([]);
  const [userId, setUserId] = useState('');

  

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascots`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    if (userId) {
      fetchPets();
    }
  }, [userId]);

  console.log(pets);

  return (
    <div style={{ backgroundColor: 'grey', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem' }}>Bienvenido {userName}</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {pets.map((pet, index) => (
          <div
            key={index}
            style={{
              width: '200px',
              height: '200px',
              backgroundImage: `url(${fotosPerros[pet.race]})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              color: 'white',
              padding: '10px',
              boxSizing: 'border-box',
              textShadow: '0 0 5px rgba(0, 0, 0, 0.7)'
            }}
          >
            <h2>{pet.name}</h2>
          </div>
        ))}
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
