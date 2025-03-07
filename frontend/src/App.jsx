import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ResponsiveModeUpdater from './components/ResponsiveModeUpdater';
import Layout from './components/Layout';
import InitialDataLoader from './components/InitialDataLoader';

function App() {
	return (
		<>
			<ResponsiveModeUpdater />
			<InitialDataLoader />
			<Layout>
				<Router>
					<AppRoutes />
				</Router>
			</Layout>

		</>
	);
}

export default App;
