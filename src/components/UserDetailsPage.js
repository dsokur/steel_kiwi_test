import React, {Component} from 'react';


export default class UserDetailsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
	}

	getUser = user => {
		fetch(`https://api.github.com/users/${user}`)
			.then(response => response.json())
			.then(response => {
				this.setState({user: response});
			})
	};
	componentDidMount = () => {
		this.getUser(this.props.match.params.login);
	};

	componentDidUpdate(prevProps) {
		if (this.props.match.params.login !== prevProps.match.params.login) {
			this.getUser(this.props.match.params.login);
		}
	}
	render() {
		return (
			<div className='userDetails'>
				<img src={this.state.user.avatar_url} alt=""/>
				<span className='name'>{this.state.user.name}</span>
				<span className='login'>{this.state.user.login}</span>
				<p>{this.state.user.bio}</p>
				<div>
					<svg className='octicon octicon-location' viewBox='0 0 12 16' version='1.1' width='12' height='16'
					     aria-hidden='true'>
						<path fillRule='evenodd'
						      d='M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z'>
						</path>
					</svg>
					<p>{this.state.user.location}</p>
				</div>
				<p>{new Date(this.state.user.created_at).toLocaleString()}</p>
				<div>
					<svg height='16' className='octicon octicon-mark-github' viewBox='0 0 16 16' version='1.1' width='16'
					     aria-hidden='true'>
						<path fillRule='evenodd'
						      d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'>

						</path>
					</svg>
					<a href={this.state.user.html_url} rel='noopener noreferrer' target='_blank'>{this.state.user.html_url}</a>
				</div>
			</div>
		)
	}
}