import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<App history={history}/>
	</Router>
	, document.getElementById('root'));
serviceWorker.unregister();
