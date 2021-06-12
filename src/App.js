import Subscriptions from './components/Subscriptions';
import NewSubscription from './components/NewSubscription';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="container mt-5 p-2 cont-all">
			<Subscriptions />
			<br/><br/><br/>
			<NewSubscription />
		</div>
	);
}

export default App;
