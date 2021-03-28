import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from "styles/global";
import light from "styles/themes/light";
import dark from "styles/themes/dark";
import usePersistedState from "utils/usePersistedState";
import { Layout, Home } from "components";

const App = () => {
  //changing theme
  const [theme, setTheme] = usePersistedState("theme", light);

  //toggling theme
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout toggleTheme={toggleTheme}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
