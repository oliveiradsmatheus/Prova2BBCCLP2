import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarMensagem, consultarMensagem, excluirMensagem, gravarMensagem } from "../servicos/servicoMensagem";

export const apagarMensagem = createAsyncThunk('apagarMensagem', async (usuario) => {
    const resultado = await excluirMensagem(usuario);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            usuario
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (usuario) => {
    const resultado = await alterarMensagem(usuario);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            usuario
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const buscarMensagens = createAsyncThunk('buscarMensagens', async () => {
    const resultado = await consultarMensagem();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Mensagens recuperadas com sucesso",
                "listaDeMensagens": resultado
            };
        } else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os usuarios do backend",
                "listaDeMensagens": []
            }
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem,
            "listaDeMensagens": []
        };
    };
});

export const incluirMensagem = createAsyncThunk('incluirMensagem', async (usuario) => {
    const resultado = await gravarMensagem(usuario);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            usuario
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeMensagens: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagens.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Buscando usuarios)";
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagens = action.payload.listaDeMensagens;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(apagarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Excluindo usuario)";
            })
            .addCase(apagarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagens = state.listaDeMensagens.filter((usuario) =>
                        usuario.codigo !== action.payload.usuario.codigo
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(apagarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(incluirMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Incluindo usuario)";
            })
            .addCase(incluirMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagens.push(action.payload.usuario);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(atualizarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Atualizando usuario)";
            })
            .addCase(atualizarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const i = state.listaDeMensagens.findIndex((usuario) => usuario.codigo === action.payload.usuario.codigo);
                    state.listaDeMensagens[i] = action.payload.usuario;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default usuarioReducer.reducer;