import { useRecoilState } from 'recoil';
import { authUser } from '../provider';
import { supabase } from '../supabase';
import { showToast } from '../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { LoginType, SignUpType } from '../types';
import { ROUTES } from '../routes';

const useAuth = () => {
  const [, setAuth] = useRecoilState(authUser);
  const navigate = useNavigate();

  const createAccount = async (data: SignUpType) => {
    if (supabase) {
      const { data: registerData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        showToast({ type: 'error', message: 'Something Went Wrong!' });
      }
      if (!error && registerData) {
        showToast({ type: 'success', message: 'Successfully Created' });
        setAuth(registerData?.session);
        navigate(ROUTES.HOME);
      }
    }
    return;
  };

  const login = async (data: LoginType) => {
    if (supabase) {
      const { data: logindata, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        showToast({ type: 'error', message: 'Something Went Wrong!' });
      }
      if (!error && logindata) {
        showToast({ type: 'success', message: 'Successfully Login' });
        setAuth(logindata?.session);
        navigate(ROUTES.HOME);
      }
    }
  };

  const signout = async () => {
    if (supabase) {
      const res = await supabase.auth.signOut();
      if (!res.error) {
        setAuth(res.error);
        navigate(ROUTES.LOGIN);
      } else {
        showToast({ type: 'error', message: 'Logout Operation Not Performed' });
      }
    }
  };
  return {
    createAccount,
    login,
    signout,
  };
};

export default useAuth;
