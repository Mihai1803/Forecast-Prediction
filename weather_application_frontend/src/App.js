import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register'
import Forecast from './pages/Forecast';
import PredictForecast from './pages/PredictForecast';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/forecast' element={<PrivateRoute />}>
          <Route path='/forecast' element={<Forecast />} />
        </Route>
        <Route path='/forecast_predict' element={<PrivateRoute />}>
          <Route path='/forecast_predict' element={<PredictForecast />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
