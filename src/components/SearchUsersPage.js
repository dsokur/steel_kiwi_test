import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './App.scss';
import AppContext from './../app-context';


export default class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleLayout: true,
		};
	}

	static contextType = AppContext;

	toggleLayout = () => {
		this.setState(prevState => {
			return {
				toggleLayout: !prevState.toggleLayout
			};
		});
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.toggleLayout !== nextState.toggleLayout) {
			return true;
		}
		if (this.props.match.path !== nextProps.match.path) {
			return true;
		}
		return false;
	}

	render() {
		const queryParameters = this.props.location.search;
		const params = new URLSearchParams(queryParameters);
		const foo = params.get('text');
		console.log('foo', foo);
		return (
			<section className='search'>
				<div className='search_form'>
					<p>Search</p>
					<form onChange={e => this.context.handleSubmit(e, this.refs.username.value)}>
						<input type="text" ref='username' placeholder='username'/>
					</form>
					<button onClick={this.toggleLayout}>
						switch to {this.state.toggleLayout ? 'table' : 'card'} mode
					</button>
				</div>
				{
					this.state.toggleLayout
						?
						<div className='search_result'>
							{this.context.users.map(user => (
								<div key={user.id} className='search_result-user'>
									<span><strong>User login:</strong>{user.login}</span>
									<Link to={`${this.props.match.path}/${user.login}`}>Details</Link>
									<a href={user.html_url} rel="noopener noreferrer" target='_blank'>GitHub page”</a>
								</div>
							))}
						</div>
						:
						<table border="1" cellPadding="5">
							<tbody>
							<tr>
								<th>User login:</th>
								<th>Details</th>
								<th>GitHub page</th>
							</tr>
							{this.context.users.map(user => (
								<tr key={user.id}>
									<td><span><strong>User login:</strong>{user.login}</span></td>
									<td><Link to={`${this.props.match.path}/${user.login}`}>Details</Link></td>
									<td><a href={user.html_url} rel="noopener noreferrer" target='_blank'>GitHub page”</a></td>
								</tr>
							))}
							</tbody>
						</table>
				}
			</section>
		)
	}
}
