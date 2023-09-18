import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger';
import RedirectToLogin from './components/RedirectToLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/messenger/login" element={<Login />} />
          <Route path="/messenger/register" element={<Register />} />
          <Route
            path="/"
            element={
              <RedirectToLogin>
                <Messenger />
              </RedirectToLogin>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
