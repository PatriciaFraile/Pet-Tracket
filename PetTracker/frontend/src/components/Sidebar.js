import { Link } from "react-router-dom"

const Sidebar = () => {
    return(
        <div className="sidebar">
            <Link to="">Inicio </Link>
            <Link to=""> Recetas</Link>
            <Link to="">Informacion </Link>
        </div>
    )
}
export default Sidebar