import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { lightMode, darkMode } from '../styles/theme';
import Layout from '../components/Layout';
import Header from '../components/Header';
import ThemeButton from '../components/ThemeButton';
import dark from '../public/assets/images/dark.png';
import light from '../public/assets/images/light.png';

function MyApp({ Component, pageProps }) {
  const [isLightMode, setIsLightMode] = useState(true);

  const onClickTheme = () => setIsLightMode((prevMode) => !prevMode);

  return (
    <ThemeProvider theme={isLightMode ? lightMode : darkMode}>
      <GlobalStyle />
      <Layout>
        <Header>
          <ThemeButton
            onClick={onClickTheme}
            aria-label={isLightMode ? '라이트 모드' : '다크 모드'}
            bgImg={isLightMode ? light.src : dark.src}
          />
        </Header>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
