import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

  const fotosGatos = {
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
  
  const fotosPerros = {
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

  const Pet = () => {
    const [pet, setPet] = useState(null);
    const [userId, setUserId] = useState('');

    const [showModalName, setShowModalName] = useState(false);
    const [showModalWeight, setShowModalWeight] = useState(false);
    const [showModalAge, setShowModalAge] = useState(false);

    const [newName, setNewName] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [newAge, setNewAge] = useState('');

    const [inputError, setInputError] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
  

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }, []);

    useEffect(() => {
      const fetchPetDetails = async () => {
        if (!userId || !id) return;
        try {
          const response = await axios.get(`https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascot/${id}`);
          setPet(response.data);
        } catch (error) {
          console.error('Error fetching pet details:', error);
        }
      };
  
      fetchPetDetails();
    }, [userId, id]); // Aquí estamos dependiendo de userId e id
  
  
    if (!pet || !userId) {
      return <div>No encontrada</div>;
    }
  
    const getPetImage = (breed) => {
      if (fotosGatos[breed]) {
        return fotosGatos[breed];
      } else if (fotosPerros[breed]) {
        return fotosPerros[breed];
      }
      return null;
    };
  
    
  const eliminarMascota = async () => {
    try {
      const response = await axios.delete(
        `https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascot/${id}`
      );
      if (response.status === 200) {
        navigate('/home');
      } else {
        console.error('Error al eliminar la mascota');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };  

    const handleChangePetName = async () => {
      if (!newName) {
        setInputError(true);
        return;
      }
  
      try {
        const response = await axios.put(
          `https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascot/${id}`,
          { name: newName },
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200) {
          setPet({ ...pet, name: newName });
          setShowModalName(false);
        } else {
          console.error('Error al cambiar el nombre');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    const handleChangePetWeight = async () => {
      if (!newWeight) {
        setInputError(true);
        return;
      }
  
      try {
        const response = await axios.put(
          `https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascot/${id}`,
          { weight: newWeight },
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200) {
          setPet({ ...pet, weight: newWeight });
          setShowModalWeight(false);
        } else {
          console.error('Error al cambiar el tamaño');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    const handleChangePetAge = async () => {
      if (!newAge) {
        setInputError(true);
        return;
      }
  
      try {
        const response = await axios.put(
          `https://3v3zpv2z-8080.uks1.devtunnels.ms/user/${userId}/mascot/${id}`,
          { year: newAge },
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200) {
          setPet({ ...pet, year: newAge });
          setShowModalAge(false);
        } else {
          console.error('Error al cambiar la edad');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };
    
    const closeModal = () => {
      setShowModalName(false);
      setShowModalWeight(false);
      setShowModalAge(false);
      setInputError(false);
    };

    const botonVolver = () => {
      navigate('/home');
    };

    return (
      <main style={{ background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`, width: '100%', height: '910px', objectFit: 'cover', padding: '26px' }}>
        <div style={styles.container} className='user-settings'>
          <h2 style={styles.header}>Configuración de Mascotas</h2>
  
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={getPetImage(pet.breed)}
                alt={pet.name}
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
  
            <div style={styles.infoContainer}>
              <label style={styles.label}>Nombre de la mascota: {pet.name}</label>
              <button onClick={() => setShowModalName(true)}>Cambiar nombre</button>

              {showModalName && (
                <div>
                  <h3 style={{fontSize: '1.5rem'}}>Cambiar nombre de la mascota</h3>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nuevo nombre"
                    style={{
                      width:'100%',
                      display: 'flex',
                      padding: '10px',
                      margin:'10px auto'
                    }}
                  />
                  {inputError && <p style={{ color: 'red' }}>Por favor, ingresa un nombre válido.</p>}
                  <button style={{
                    padding: '10px',
                    margin: '5px auto',
                    background: 'rgba(0,160,10,0.75)'
                  }} 
                  onClick={handleChangePetName}>Aceptar</button>
                  <button style={{
                    background:'red',
                    color:'white'
                  }} onClick={closeModal}>Cancelar</button>
                </div>
              )}
            </div>
  
            <div style={styles.infoContainer}>
              <label style={styles.label}>Peso de la mascota: {pet.weight}</label>
              <button onClick={() => setShowModalWeight(true)}>Cambiar tamaño</button>

              {showModalWeight && (
                <div>
                  <h3 style={{
                    fontSize: '1.5rem'
                  }}>Cambiar tamaño de la mascota</h3>
                  <input
                    type="text"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="Nuevo tamaño"
                    style={{
                      width:'100%',
                      display: 'flex',
                      padding: '10px',
                      margin:'10px auto',
                    }}
                  />
                  {inputError && <p style={{ color: 'red' }}>Por favor, ingresa un tamaño válido.</p>}
                  <button style={{
                    padding: '10px',
                    margin: '5px auto',
                    background: 'rgba(0,160,10,0.75)'                  }} onClick={handleChangePetWeight}>Aceptar</button>
                  <button style={{
                    background:'red',
                    color:'white'
                  }} onClick={closeModal}>Cancelar</button>
                </div>
              )}
            </div>
  
            <div style={styles.infoContainer}>
              <label style={styles.label}>Edad de la mascota: {pet.year}</label>
              <button onClick={() => setShowModalAge(true)}>Cambiar edad</button>

              {showModalAge && (
                <div>
                  <h3 style={{
                    fontSize: '1.5rem'
                  }}>Cambiar edad de la mascota</h3>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    placeholder="Nueva edad"
                    style={{
                      width:'100%',
                      display: 'flex',
                      padding: '10px',
                      margin:'10px auto'
                    }}
                  />
                  {inputError && <p style={{ color: 'red' }}>Por favor, ingresa una edad válida.</p>}
                  <button style={{
                    padding: '10px',
                    margin: '5px auto',
                    background: 'rgba(0,160,10,0.75)'}} onClick={handleChangePetAge}>Aceptar</button>
                  <button style={{
                    background:'red',
                    color:'white'}}
                     onClick={closeModal}>Cancelar</button>
                </div>
              )}
            </div>

          </div>
  
            <div>
            <button onClick={botonVolver} style={styles.logoutButton}>
            Volver
          </button>
          <button style={{
            width: '200px',
            height: '50px',
            padding: '10px',
            margin: '10px auto',
            marginLeft: '200px'
          }} onClick={eliminarMascota}>Eliminar Mascota</button>
            </div>
        </div>
      </main>
    );
  };
  
  const styles = {
    container: {
      flex: 1,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      width: '90%',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 4px 8px rgba(10,10,10,0.5)',
      borderRadius: '40px',
    },
    header: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    infoContainer: {
      marginBottom: '20px',
      width: '100%',
      maxWidth: '400px',
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      marginBottom: '8px',
      color: '#333',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#00A0B4',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    logoutButton: {
      width: '100px',
      maxWidth: '400px',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: 'red',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
  };
  
  export default Pet;