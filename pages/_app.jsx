import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import { lightMode, darkMode } from "../styles/theme";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Button from "../components/Button";

function MyApp({ Component, pageProps }) {
  const [isLightMode, setIsLightMode] = useState(true);

  const onClickTheme = () => setIsLightMode((prevMode) => !prevMode);

  return (
    <ThemeProvider theme={isLightMode ? lightMode : darkMode}>
      <GlobalStyle />
      <Layout>
        <Header>
          <Menu />
        </Header>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
