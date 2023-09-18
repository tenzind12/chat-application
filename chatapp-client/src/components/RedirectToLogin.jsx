import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectToLogin = ({ children }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return authenticated ? children : <Navigate to="/messenger/login" />;
};

export default RedirectToLogin;
