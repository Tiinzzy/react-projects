import { useState } from "react";

import LoginForm from "./components/login/LoginForm";
import BackEndConnection from './components/tools/BackEndConnection';
import UserPage from "./components/home_page/UserPage";
import SignUp from "./components/login/SignUp";
import ForgotPassword from "./components/login/ForgotPassword";

const backend = BackEndConnection.INSTANCE();
const CURENT_PATH = window.location.pathname;

export const SIGNUP_PATH = '/sign-up';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const LOGIN_PATH = '/login';

const VALID_PATHS = [SIGNUP_PATH, FORGOT_PASSWORD_PATH, LOGIN_PATH]



function checkLoginStatus(setIsLogin, setUser, setPageReady) {
  backend.checkLoginStatus((result) => {
    if (CURENT_PATH === '/' && !result.authorized) {
      window.location = '/login';
    } else {
      setUser(result.user);
      setIsLogin(result.authorized);
      setPageReady(true);
    }
  })
}

function App() {
  const [pageReady, setPageReady] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  checkLoginStatus(setIsLogin, setUser, setPageReady);

  return (
    <div>
      {pageReady && <div>
        {isLogin ?
          <>
            {(user !== null) && <UserPage user={user} />}
          </>
          :
          <>
            {(CURENT_PATH === '/sign-up' && user !== null) && <SignUp />}
            {(CURENT_PATH === '/forgot-password') && <ForgotPassword />}
            {(CURENT_PATH === '/login') && <LoginForm />}
            {(!VALID_PATHS.includes(CURENT_PATH)) && <LoginForm />}
          </>
        }
      </div>}
    </div>
  );
}

export default App;
