import { Button, Container, Form } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextoUsuario } from "../App";
import { consultarUsuario } from "../servicos/servicoUsuario";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const formulario = useRef();
    const [usuarios, setUsuarios] = useState([]);
    const { setUsuario } = useContext(ContextoUsuario);

    useEffect(() => {
        consultarUsuario().then((resultado) => {
            if (Array.isArray(resultado))
                setUsuarios(resultado);
        })
    }, []);

    function manipularSubmissao(evento) {
        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senha.current.value;
        var i = 0;
        while (i < usuarios.length && usuarios[i].login != usuarioDigitado)
            i++;
        if (i < usuarios.length) {
            if (usuarios[i].senha === senhaDigitada) {
                setUsuario({
                    "usuario": usuarios[i].login,
                    "logado": true,
                    "admin": usuarios[i].tipo
                });
            } else {
                formulario.current.reset();
            }
        } else {
            formulario.current.reset();
        }
        evento.preventDefault();
        evento.stopPropagation();
    };

    return (
        <Container className="mt-5 p-5">
            <Container className="square rounded-4 mt-5 w-25 border p-4 bg-body-primary">
                <Form onSubmit={manipularSubmissao} ref={formulario}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Informe o usuário"
                            ref={nomeUsuario} />
                        <Form.Text className="text-muted">
                            Nunca compartilhe suas credenciais de acesso.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Password"
                            ref={senha} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}