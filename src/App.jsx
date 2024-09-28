import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users' element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
