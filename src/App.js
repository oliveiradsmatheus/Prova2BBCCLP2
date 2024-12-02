import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { Provider } from "react-redux";
import TelaCadUsuario from "./telas/TelaCadUsuario.jsx"
import TelaLogin from "./telas/TelaLogin.jsx";
import TelaMenu from "./telas/TelaMenu.jsx";
import store from "./redux/store.js";

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false,
    "admin": 0
  });

  if (usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    );
  } else
    return (
      <div className="App">
        <Provider store={store}>
          <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
            <BrowserRouter>
              <Routes>
                <Route path="/usuarios" element={<TelaCadUsuario />} />
                <Route path="*" element={<TelaMenu />} />
              </Routes>
            </BrowserRouter>
          </ContextoUsuario.Provider>
        </Provider>
      </div>
    );
}

export default App;
