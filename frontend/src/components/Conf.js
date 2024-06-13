import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserSettings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [showModalName, setShowModalName] = useState(false);
  const [showModalPass, setShowModalPass] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPass, setNewPass] = useState("");

  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .post(`http://localhost:8080/user/${userId}`)
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    const cerrar = window.confirm("¿Estás seguro de cerrar sesión?");
    if (cerrar) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleReturn = () => {
    navigate("/home");
  };

  const handleChangeUsername = async () => {
    if (!newName) {
      setInputError(true);
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/update_username/${userId}`,
        { new_username: newName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUsername(newName);
        setShowModalName(false);
        console.log("Nombre de usuario cambiado correctamente");
      } else {
        console.error("Error al cambiar el nombre de usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPass) {
      setInputError(true);
      return;
    }
    try {
      const verifyResponse = await axios.put(
        `http://localhost:8080/update_password/${userId}`,
        {
          old_password: currentPassword,
          new_password: newPass, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (verifyResponse.status === 200) {
        
        setPassword(newPass);
        setShowModalPass(false);
        console.log("Contraseña cambiada correctamente");
      } else {
        console.error("Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setInputError(true);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/${userId}`);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      } else {
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const closeModal = () => {
    setShowModalName(false);
    setShowModalPass(false);
    setInputError(false);
  };


  return (
    <main
    style={{
      background: `linear-gradient(rgba(0, 60, 0, 0.75), rgba(0, 160, 180, 1)`,
      width: "100%",
      height: "910px",
      objectFit: "cover",
      padding: "26px",
    }}
  >
    <div style={styles.container} className="user-settings">
      <h2 style={styles.header}>Configuración de Usuario</h2>
  
      <div style={styles.infoContainer}>
        <label style={styles.label}>Nombre de Usuario: {username}</label>
        <button style={styles.button} onClick={() => setShowModalName(true)}>
          Cambiar nombre de Usuario
        </button>
        {showModalName && (
          <div>
            <h3 style={{ fontSize: "1.5rem" }}>Cambiar username</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nuevo username"
              style={{
                width: "100%",
                display: "flex",
                padding: "10px",
                margin: "10px auto",
              }}
            />
            {inputError && (
              <p style={{ color: "red" }}>
                Por favor, ingresa un username válido.
              </p>
            )}
            <button
              style={{
                padding: "10px",
                margin: "5px auto",
                background: "rgba(0,160,10,0.75)",
              }}
              onClick={handleChangeUsername}
            >
              Aceptar
            </button>
            <button
              style={{
                background: "red",
                color: "white",
              }}
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
  
      <div style={styles.infoContainer}>
        <label style={styles.label}>
          Contraseña: {new Array(password.length + 1).join("*")}
        </label>
        <button style={styles.button} onClick={() => setShowModalPass(true)}>
          Cambiar contraseña
        </button>
        {showModalPass && (
          <div>
            <h3 style={{ fontSize: "1.5rem" }}>Cambiar contraseña</h3>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Contraseña actual"
              style={{
                width: "100%",
                display: "flex",
                padding: "10px",
                margin: "10px auto",
              }}
            />
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Nueva contraseña"
              style={{
                width: "100%",
                display: "flex",
                padding: "10px",
                margin: "10px auto",
              }}
            />
            {inputError && (
              <p style={{ color: "red" }}>
                Por favor, ingresa una contraseña válida.
              </p>
            )}
            <button
              style={{
                padding: "10px",
                margin: "5px auto",
                background: "rgba(0,160,10,0.75)",
              }}
              onClick={handleChangePassword}
            >
              Aceptar
            </button>
            <button
              style={{
                background: "red",
                color: "white",
              }}
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
  
      <button style={styles.logoutButton} onClick={handleLogout}>
        Cerrar Sesión
      </button>
  
      <div style={styles.buttonContainer}>
        <button style={styles.volverButton} onClick={handleReturn}>
          Volver
        </button>
        <button style={styles.deleteButton} onClick={handleDelete}>
          Eliminar Usuario
        </button>
      </div>
    </div>
  </main>
  );
}
  
  const styles = {
    container: {
      flex: 1,
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      width: "90%",
      maxWidth: "600px",
      margin: "0 auto",
      boxShadow: "0 4px 8px rgba(10,10,10,0.5)",
      borderRadius: "40px",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    infoContainer: {
      marginBottom: "20px",
      width: "100%",
      maxWidth: "400px",
    },
    label: {
      display: "block",
      fontSize: "1rem",
      marginBottom: "8px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    },
    button: {
      width: "100%",
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#00A0B4",
      color: "#fff",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    logoutButton: {
      width: "100%",
      maxWidth: "400px",
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "red",
      color: "#fff",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "400px",
      marginTop: "10px",
    },
    volverButton: {
      width: "100px",
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "red",
      color: "#fff",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    deleteButton: {
      width: "200px",
      height: "50px",
      padding: "10px",
      backgroundColor: "#00A0B4",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
  };
  export default UserSettings