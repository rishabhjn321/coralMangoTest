import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import LanguageProvider from '../components/atoms/locales/LanguageProvider';
import LoginProvider from '../components/context/loginContext';
import LogoutProvider from '../components/context/logoutContext';
import { Layout } from '../components/Organisms/Layout';
import '../styles/globals.css';
import LoginRoleProvider from '../components/context/roleContext';
import DashboardContentProvider from '../components/Modules/DashboardContent/DashboardContentContext';
const compose = (providers) =>
  // eslint-disable-next-line react/display-name
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));

const Provider = compose([
  LoginProvider,
  LogoutProvider,
  LoginRoleProvider,
  DashboardContentProvider,
]);

function MyApp({ Component, pageProps }) {
  // const {
  //   state:{isAuthenticated}
  // } = useContext(AppContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let item = null;
  if (typeof window !== 'undefined') {
    item = JSON.parse(localStorage.getItem('userData'));
  }

  useEffect(() => {
    if (item && item?.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [item]);

  return (
    <>
      <Provider>
        <LanguageProvider>
          <ToastContainer autoClose={2000} limit={1} />
          {isLoggedIn ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </LanguageProvider>
      </Provider>
    </>
  );
}

export default MyApp;
