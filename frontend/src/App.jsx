import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ResponsiveModeUpdater from './components/ResponsiveModeUpdater';
import Layout from './components/Layout';

function App() {
	return (
		<>
			<ResponsiveModeUpdater />
			<Layout>
				<Router>
					<AppRoutes />
				</Router>
			</Layout>

		</>
	);
}

export default App;
