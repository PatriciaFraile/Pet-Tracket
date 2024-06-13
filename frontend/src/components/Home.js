import React, { useState, useEffect, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../models/UseDimensions";
import { MenuToggle } from "../models/MenuToggle";
import { Navigation } from "../models/Navigation";
import {useNavigate} from 'react-router-dom'
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

const photosCat = {
  "Persa" : "https://www.zooplus.es/magazine/wp-content/uploads/2017/10/fotolia_103481419.jpg",
  "Siamés" : "https://www.petlove.com.br/images/breeds/192825/profile/original/siames-p.jpg?1532626975",
  "Maine Coon" : "https://th.bing.com/th/id/OIP.9AZcAWfMAdID94FLYBZRjgHaFj?rs=1&pid=ImgDetMain",
  "Ragdoll" : "https://i2.wp.com/felineliving.net/wp-content/uploads/2018/01/ragdoll-kitty-e1522101384737.jpg",
  "Bengalí" : "https://fthmb.tqn.com/cmuvPP6X5YHIzOT0Kh0PaOQD7oc=/3291x2460/filters:fill(auto,1)/GettyImages-140000553-58bcd5815f9b58af5c040a5a.jpg",
  "Esfinge (Sphynx)" : "https://www.feelcats.com/wp-content/uploads/2018/05/gato-sphynx-cat.jpg",
  "Abisinio" : "https://wakyma.com/blog/wp-content/uploads/2017/04/Cuidados-que-necesita-el-gato-abisinio-1024x576.",
  "Ruso Azul" : "https://www.elmueble.com/medio/2022/10/10/gato-azul-ruso_58999be5_900x900.jpg",
  "Scottish Fold" : "https://www.thesprucepets.com/thmb/m1b9R0oN-ayAGjnHeht6wiwhXZM=/2997x0/filters:no_upscale():max_bytes(150000):strip_icc()/scottish-fold-profile-551898-03-c7f65038efb04addbb294c59dc062077.JPG",
  "Birmano" : "https://www.thesprucepets.com/thmb/ZUkCrpXjF3fgRa1uj4vl2Cj1VRI=/3500x2333/filters:fill(auto,1)/GettyImages-623368786-f66c97ad6d2d494287b448415f4340a8.jpg",
  "Oriental de pelo corto" : "https://wakyma.com/blog/wp-content/uploads/2017/08/C%C3%B3mo-cuidar-a-un-gato-oriental-de-pelo-corto-1024x768.",
  "Devon Rex" : "https://cdn.shopify.com/s/files/1/0997/4496/articles/Blue_Eyed_Devon_Rex_Cat_d9234955-823a-459d-8b14-fb1340247c0e_5000x.jpg?v=1588962514",
  "Cornish Rex" : "https://www.thesprucepets.com/thmb/H89DKboa0vYkDfH1GLZm2May70g=/1373x915/filters:fill(auto,1)/GettyImages-1286678957-0af3fa8fa9ae45fcbb7da3a98320b64d.jpg",
  "Noruego del Bosque" : "https://nfnatcane.es/blog/wp-content/uploads/2020/07/Bosque-de-Noruega.jpg",
  "Angora Turco" : "https://vidanatural.net/wp-content/uploads/2019/01/angora-turco-blanco-680x675.jpg",
  "Somali" : "https://www.cattitudedaily.com/wp-content/uploads/2021/02/red-somali-cat-1920x1280.jpg",
  "Chartreux" : "https://th.bing.com/th/id/OIP.kaNxKMfeGeJ56ctd05dfUAAAAA?rs=1&pid=ImgDetMain",
  "Manx" : "https://thecatsite.com/ams/manx-cats-what-you-need-to-know-about-the-tailless-cat.33865/cover-image",
  "Balinés" : "https://blog.mystart.com/wp-content/uploads/shutterstock_705622957-e1524167401234.jpg"
}

const photosDog = {
  "Labrador Retriever": "https://th.bing.com/th/id/R.23fdd93f5a9d1337a3309c56c266a811?rik=oMt%2bq9KuT3fGeA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f9%2f90%2fLabrador_Retriever_portrait.jpg&ehk=Kse1knvMWRxxVOGeJ60Jp4w17ydmE%2fZMJ2i9%2bs977DM%3d&risl=&pid=ImgRaw&r=0",
  "Pastor Alemán": "https://th.bing.com/th/id/R.ff4f145f9e6fc27d08a6493948a3a1ff?rik=QnBlaSoT2bdgUw&riu=http%3a%2f%2fwww.mundoperro.net%2fwp-content%2fuploads%2fpastor-aleman-adulto.jpg&ehk=78XPzF0dZwh1GTtWaMEe%2fjQUqePSeRviH1EZWQ49rqM%3d&risl=&pid=ImgRaw&r=0",
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
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .post(`http://localhost:8080/user/${userId}`)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const fetchPets = async () => {
      if (!userId) return; 
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}/mascots`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [userId]);

  const handlePetClick = (petId,petData) => {
    localStorage.setItem('selectedPet',JSON.stringify(petData))
    navigate(`/pet/${petId}`);
  };

  const getPhotoPet = (breed) => {
    if (photosCat[breed]) {
        return photosCat[breed]
    } else if (photosDog[breed]) {
        return photosDog[breed]
    }
    return null
  }

  return (
    <div style={{ background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`, minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem',paddingLeft: '1500px' }}>Bienvenido {name}</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pets.map((pet, index) => (
          <div key={index} style={{ width: '33%', padding: '10px', boxSizing: 'border-box' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
              <a href={`/pet/${pet.id}`} onClick={() => handlePetClick(pet.id)}>
              <img
                  src={getPhotoPet(pet.breed)}
                  alt={pet.name}
                  style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto' }}                />
              </a>
            </div>
            <div style={{ borderRadius: '0 0 10px 10px', textAlign: 'center' }}>
              <h2 style={{ marginTop: '0', marginBottom: '5px' }}>{pet.name}</h2>
            </div>
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
        {isOpen && <Navigation />}
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </div>
  );
};

export default Home;