import LogoPrincipal from "./img/img-logo/logov2.png";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FF6F91' }}>


            <div className="container-fluid">

                <a className="navbar-brand" href="#">
                    <img src={LogoPrincipal} alt="Logo" width="280px" className="d-inline-block align-text-top" />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
                        <li className="nav-item">
                            <a className="nav-link fw-bold" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold" href="#">Catálogo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold" data-bs-toggle="modal" data-bs-target="#contactoModal" href="#">Contacto</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold" data-bs-toggle="modal" data-bs-target="#sobreNosotrosModal" href="#">Quienes
                                somos</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link fw-bold" href="#">Carrito</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 fw-bold" type="search" placeholder="Buscar" aria-label="Search" />
                        <button type="button" className="btn btn-danger fw-bold">Buscar</button>
                    </form><br />
                </div>
            </div>
        </nav>
    )
}

export default Header;