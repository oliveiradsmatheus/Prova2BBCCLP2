import Pagina from "../layouts/Pagina.jsx";
import { Alert, Container } from "react-bootstrap";

export default function TelaMenu(props) {
    return (
        <Pagina>
            <Container className="p-4 mt-3">
                <Alert>
                    <h1 className="text-center">Tela Principal</h1>
                </Alert>
            </Container>
        </Pagina>
    )
}