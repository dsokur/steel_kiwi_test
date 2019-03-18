import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './App.scss';
import AppContext from './../app-context';


export default class SearchUsersPage extends Component {
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

	render() {
		return (
			<section className='search'>
				<form onChange={e => this.context.handleSubmit(e, this.refs.username.value)}>
					<p>Search</p>
					<input type="text" ref='username' placeholder='username'/>
					<button onClick={this.toggleLayout}>switch mode</button>
				</form>
				{
					this.state.toggleLayout
						?
						<div className='result'>
							{this.context.users.map(user => (
								<div key={user.id} className='user'>
									<span><strong>User login:</strong> {user.login}</span>
									<Link to={`${this.props.match.path}/${user.login}`}>Details</Link>
									<a href={user.html_url} rel="noopener noreferrer" target='_blank'>GitHub page</a>
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
									<td><span><strong>User login:</strong> {user.login}</span></td>
									<td><Link to={`${this.props.match.path}/${user.login}`}>Details</Link></td>
									<td><a href={user.html_url} rel="noopener noreferrer" target='_blank'>GitHub page</a></td>
								</tr>
							))}
							</tbody>
						</table>
				}
			</section>
		)
	}
}
