import React from "react";
import Routes from "./routes";
import Context from "./providers/context";
import useStore from "./hooks/useStore";
import GlobalStyle from "./global.style";

const App = () => {
  const [store, handler] = useStore();
  return (
    <Context.Provider value={[store, handler]}>
      <GlobalStyle>
        <div className="App">
          <Routes />
        </div>
      </GlobalStyle>
    </Context.Provider>
  );
};

export default App;
