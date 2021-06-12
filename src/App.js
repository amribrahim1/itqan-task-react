import Subscriptions from './components/Subscriptions';
import NewSubscription from './components/NewSubscription';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="container pt-5">
			<Subscriptions />
			<br/><br/><br/>
			<NewSubscription />
		</div>
	);
}

export default App;
