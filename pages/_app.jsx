import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../styles/GlobalStyle';
import { lightMode, darkMode } from '../styles/theme.js';
import Layout from '../components/Layout';
import Header from '../components/Header';
import ThemeButton from '../components/ThemeButton';
import dark from '../public/assets/images/dark.svg';
import light from '../public/assets/images/light.svg';

function MyApp({ Component, pageProps }) {
  const [isLightMode, setIsLightMode] = useState(true);

  const onClickTheme = () => setIsLightMode((prevMode) => !prevMode);

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default MyApp;
