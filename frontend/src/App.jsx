import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ResponsiveModeUpdater from './components/ResponsiveModeUpdater';

function App() {
	return (
		<>
			<ResponsiveModeUpdater />
			<Router>
				<AppRoutes />
			</Router>
		</>
	);
}

export default App;
