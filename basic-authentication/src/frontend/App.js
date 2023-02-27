import { useState } from "react";

import LoginForm from "./components/login/LoginForm";
import BackEndConnection from './components/tools/BackEndConnection';
import UserPage from "./components/home_page/UserPage";

const backend = BackEndConnection.INSTANCE();

function callLoginStatus(setIsLogin, setUser) {
  backend.checkLoginStatus((result) => {
    setUser(result.user);
    setIsLogin(result.authorized);
  })
}


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  callLoginStatus(setIsLogin, setUser);

  return (
    <div>
      {(isLogin && user !== null) && <UserPage user={user} />}
      {!isLogin && <LoginForm />}
    </div>
  );
}

export default App;
