import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Users';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';
import Repairs from './pages/Repairs';
import SpareParts from './pages/SpareParts';
import Charts from './pages/Charts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users' element={<Usuarios />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/repairs' element={<Repairs />} />
        <Route path='/spareparts' element={<SpareParts />} />
        <Route path='/charts' element={<Charts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
