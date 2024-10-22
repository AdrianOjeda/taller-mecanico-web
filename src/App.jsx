import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Users';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';
import Repairs from './pages/Repairs';
import SpareParts from './pages/SpareParts';
import Charts from './pages/Charts';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users' element={<PrivateRoute element={<Usuarios />} allowedRoles={['ADMINISTRADOR']} />} />
        <Route path='/customers' element={<PrivateRoute element={<Customers />} allowedRoles={['ADMINISTRADOR', 'GERENTE']} />} />
        <Route path='/vehicles' element={<PrivateRoute element={<Vehicles />} allowedRoles={['ADMINISTRADOR', 'GERENTE']} />} />
        <Route path='/repairs' element={<PrivateRoute element={<Repairs />} allowedRoles={['ADMINISTRADOR', 'GERENTE', 'MECANICO']} />} />
        <Route path='/spareparts' element={<PrivateRoute element={<SpareParts />} allowedRoles={['ADMINISTRADOR', 'GERENTE', 'MECANICO']} />} />
        <Route path='/charts' element={<PrivateRoute element={<Charts />} allowedRoles={['ADMINISTRADOR','GERENTE']} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
