import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './App.scss';
import AppContext from './../app-context';


export default class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardMode: true,
		};
	}

	static contextType = AppContext;

	toggleLayout = () => {
		this.setState(prevState => {
			return {
				cardMode: !prevState.cardMode
			};
		});
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.cardMode !== nextState.cardMode) {
			return true;
		}
		if (this.props.match.path !== nextProps.match.path) {
			return true;
		}
		return false;
	}
	renderCardMode=(users)=>(
		<div className='search_result'>
			{users.map(user => (
				<div key={user.id} className='search_result-user'>
					<span><strong>User login:</strong>{user.login}</span>
					<Link to={`${this.props.match.path}/${user.login}`}>Details</Link>
					<a href={user.html_url} rel='noopener noreferrer' target='_blank'>GitHub page”</a>
				</div>
			))}
		</div>
	);
	renderTableMode=(users)=>(
		<table border='1' cellPadding='5'>
			<tbody>
			<tr>
				<th>User login:</th>
				<th>Details</th>
				<th>GitHub page</th>
			</tr>
			{users.map(user => (
				<tr key={user.id}>
					<td><span><strong>User login:</strong>{user.login}</span></td>
					<td><Link to={`${this.props.match.path}/${user.login}`}>Details</Link></td>
					<td><a href={user.html_url} rel='noopener noreferrer' target='_blank'>GitHub page”</a></td>
				</tr>
			))}
			</tbody>
		</table>
	);
	render() {
		return (
			<section className='search'>
				<div className='search_form'>
					<p>Search</p>
					<form onChange={e => this.context.handleSubmit(e, this.refs.username.value)}>
						<input type='text' ref='username' placeholder='username'/>
					</form>
					<button onClick={this.toggleLayout}>
						switch to {this.state.cardMode ? 'table' : 'card'} mode
					</button>
				</div>
				{
					this.state.cardMode
						?
						this.renderCardMode(this.context.users)
						:
						this.renderTableMode(this.context.users)
				}
			</section>
		)
	}
}
