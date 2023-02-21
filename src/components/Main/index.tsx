import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Chat from '../../pages/Chat';
import { ROUTES } from '../../routes';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.CHAT} element={<Chat />} />
    </Routes>
  );
};

export default MainRoutes;
