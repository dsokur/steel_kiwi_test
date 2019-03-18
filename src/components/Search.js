import React, {Component, lazy, Suspense} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.scss';
import _ from 'lodash';
import AppContext from './../app-context';

const Users = lazy(() => import('./UserDetailsPage'));
const SearchComponent = lazy(() => import('./SearchUsersPage'));


export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmit = _.debounce(this.handleSubmit, 250);
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

	async handleSubmit(e,username) {
		e.persist();
		let users = await this.getUsers(username);
		users.items === undefined
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
		return (
			<AppContext.Provider
				value={{
					users: this.state.users,
					handleSubmit:this.handleSubmit,
				}}>
					<Switch>
						<Route exact path={`${this.props.match.path}/:search`} render={(props) => (
							<Suspense fallback={
								<img alt='loader'
								     className='loader'
								     src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
								/>
							}>
								{
									this.props.isSignedIn === true
										?
										<SearchComponent {...props}/>
										:
										<Redirect to="/"/>
								}
							</Suspense>)}
						/>
						<Route path={`${this.props.match.path}/:login`} render={(props) => (
							<Suspense fallback={
								<img alt='loader'
								     className='loader'
								     src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
								/>
							}>
								{
									this.props.isSignedIn === true
										?
										<Users users={this.state.users}{...props}/>
										:
										<Redirect to="/"/>
								}
							</Suspense>)}
						/>
					</Switch>
			</AppContext.Provider>
		)
	}
}
