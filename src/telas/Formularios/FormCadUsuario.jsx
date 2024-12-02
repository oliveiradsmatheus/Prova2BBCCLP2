import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useContext, useState } from "react";
import { atualizarUsuario, incluirUsuario } from "../../redux/usuarioReducer.js"
import { useDispatch } from 'react-redux';
import { ContextoUsuario } from '../../App.js';

export default function FormCadusuario(props) {
    const despachante = useDispatch();
    const [usu, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [senhaC, setSenhaC] = useState("");
    const { usuario } = useContext(ContextoUsuario)
    const usuarioVazio = {
        id: 0,
        nickname: "",
        urlAvatar: "",
        senha: "",
        dataIngresso: "",
        mensagens: []
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (usu.senha === senhaC) {
            if (form.checkValidity()) {
                if (!props.modoEdicao)
                    despachante(incluirUsuario(usu));
                else {
                    despachante(atualizarUsuario(usu));
                    props.setModoEdicao(false);
                }
                props.setUsuarioSelecionado(usuarioVazio);
                props.setExibirTabela(true);
                setFormValidado(false);
            } else
                setFormValidado(true);
        } else
            window.alert("As senhas não batem")
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usu, [elemento]: valor });
        console.log(`componente: ${elemento} : ${valor}`);
    }

    function voltar() {
        props.setExibirTabela(true);
        props.setModoEdicao(false);
        props.setUsuarioSelecionado(usuarioVazio);
    }

    return (
        <Container className="mt-02 mb-02">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-4">
                                <p className="mb-4">
                                    {
                                        props.modoEdicao ?
                                            "Alteração de usuário" :
                                            "Cadastro de usuário"
                                    }
                                </p>
                                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                                    <h3>Dados Pessoais</h3>
                                    <Row className="mt-4">
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Nickname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="nickname"
                                                name="nickname"
                                                placeholder="Nome Completo"
                                                value={usu.nickname}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Avatar</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="urlAvatar"
                                                name="urlAvatar"
                                                placeholder="Envie sua foto"
                                                value={usu.urlAvatar}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    {
                                        <Row>
                                            <Form.Group as={Col} className="mb-3">
                                                {
                                                    props.modoEdicao ?
                                                        <Form.Label className="text-center">Nova Senha</Form.Label> :
                                                        <Form.Label className="text-center">Senha</Form.Label>
                                                }
                                                <Form.Control
                                                    type="password"
                                                    id="senha"
                                                    name="senha"
                                                    placeholder="Digite sua nova senha"
                                                    value={usu.senha}
                                                    onChange={manipularMudanca}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3">
                                                <Form.Label className="text-center">Confirmar Senha</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    id="senha"
                                                    name="senha"
                                                    placeholder="Digite sua nova senha"
                                                    value={senhaC}
                                                    onChange={(e) => setSenhaC(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Row>
                                    }   
                                    <Row>
                                        <Col md={1}>
                                            <div className="mb-2 mt-2">
                                                <Button type="submit">
                                                    {
                                                        props.modoEdicao ?
                                                            "Alterar" :
                                                            "Cadastrar"
                                                    }
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col md={{ offset: 1 }}>
                                            <div className="mb-2 mt-2">
                                                <Button onClick={() => { voltar(); }}>
                                                    Voltar
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}