import React, {lazy, Suspense, Component} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.scss';
import HomePage from './HomePage';
import Header from './Header';
import firebase from "firebase";

const Search = lazy(() => import('./Search'));

firebase.initializeApp({
	apiKey: "AIzaSyB2nRsIkZ-Mroz8j5Qb12VCB9LG4ChcXCg",
	authDomain: "test-b0823.firebaseapp.com"
});

export default class App extends Component {
	state = {
		isSignedIn: false,
	};

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({isSignedIn: !!user});
		})
	};

	render() {
		const {isSignedIn} = this.state;
		return (
			<>
				<Header isSignedIn={isSignedIn}/>
				<Switch>
					<Route exact path='/' render={(props) => (
						<Suspense fallback={
							<img alt='loader'
							     className='loader'
							     src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
							/>
						}>
							<HomePage sSignedIn={isSignedIn} {...props}/>
						</Suspense>)}
					/>
					<Route path='/search' render={(props) => (
						<Suspense fallback={
							<img alt='loader'
							     className='loader'
							     src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
							/>
						}>
							{
								isSignedIn === true
									?
									<Search isSignedIn={isSignedIn}{...props}/>
									:
									<Redirect to="/"/>
							}
						</Suspense>)}
					/>
				</Switch>
			</>
		)
	}
}

