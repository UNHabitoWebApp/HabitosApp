import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Registro from './pages/Registro.jsx';
import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';

// function App() {
// 	return (
// 		<div>
// 			<Registro />
// 		</div>
// 	);
// }

// export default App;


const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
