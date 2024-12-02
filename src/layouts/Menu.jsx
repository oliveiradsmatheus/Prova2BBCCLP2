import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ContextoUsuario } from '../App';

export default function Menu(props) {
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    return (
        <Navbar expand="lg" className="bg-body-tertiary mt-02 mb-02">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/Prova2BBCCLP2">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#" as={Link} to="/usuarios">
                                <p><img width="20" src="https://img.icons8.com/?size=100&id=dnFLrXkYCNiG&format=png&color=000000" /> Usuários</p>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={() => {
                            setUsuario({
                                "usuario": "",
                                "logado": false
                            })
                        }}>
                            Sair
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>Usuario logado: {usuario.usuario}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}