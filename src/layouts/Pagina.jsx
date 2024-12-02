import Cabecalho from "./Cabecalho.jsx";
import Menu from "./Menu.jsx";

export default function Pagina(props) {
    return (
        <div>
            <Cabecalho titulo="Sistema de Controle Gerencial" />
            <Menu />
            {
                props.children
            }
        </div>
    );
}