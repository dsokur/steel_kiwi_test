import React, {Component, lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './App.scss';
import AppContext from './../app-context';

const Users = lazy(() => import('./UserDetailsPage'));
const SearchComponent = lazy(() => import('./SearchUsersPage'));


export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
		const debounceEvent = (callback, time, interval) =>
			(...args) => clearTimeout(interval, interval = setTimeout(callback, time, ...args));
		this.handleSubmit = debounceEvent(this.handleSubmit.bind(this), 1000);
	}

	getUsers=(username)=> {
		return fetch(`https://api.github.com/search/users?per_page=10&q=${username}`)
			.then(response => response.json())
			.then(response => {
				return response;
			}).catch(error => {
				return error
			});
	};

	async handleSubmit(e,username){
		e.persist();
		let users = await this.getUsers(username);
		!users.items
			?
			this.setState({
				users: [],
			})
			:
			this.setState({
				users: users.items,
			})
	};


	render() {
		// console.log('pathname', this.props.pathname);
		console.log('search', this.props);
		return (
			<AppContext.Provider
				value={{
					users: this.state.users,
					handleSubmit:this.handleSubmit,
				}}>
				<Switch>
					<Route exact path={`${this.props.match.path}`} render={(props) => (
						<Suspense fallback={
							<img alt='loader'
							     className='loader'
							     src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
							/>
						}>
							{
								this.props.isSignedIn
									?
									<SearchComponent {...props}/>
									:
									<Redirect to='/'/>
							}
						</Suspense>)}
					/>
					<Route path={`${this.props.match.path}/:login`} render={(props) => (
						<Suspense fallback={
							<img alt='loader'
							     className='loader'
							     src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
							/>
						}>
							{
								this.props.isSignedIn
									?
									<Users users={this.state.users}{...props}/>
									:
									<Redirect to='/'/>
							}
						</Suspense>)}
					/>
				</Switch>
			</AppContext.Provider>
		)
	}
}