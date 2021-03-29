import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from "styles/global";
import light from "styles/themes/light";
import dark from "styles/themes/dark";
import usePersistedState from "utils/usePersistedState";
import { Layout, Home } from "components";
import ContactState from "context/contact/ContactState";

const App = () => {
  //changing theme
  const [theme, setTheme] = usePersistedState("theme", light);

  //toggling theme
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ContactState>
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
    </ContactState>
  );
};

export default App;
