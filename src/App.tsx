import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainRoutes from './components/Main';
import { ToastContainer } from 'react-toastify';
import { toastCustomStyle } from './utils/Toast';
import Background from './components/Background';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Background />
        <MainRoutes />
        <ToastContainer style={toastCustomStyle} />
      </Router>
    </RecoilRoot>
  );
};

export default App;
