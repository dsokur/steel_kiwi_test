import React from 'react';
import {Link} from 'react-router-dom';
import './App.scss';
import firebase from 'firebase';
import anonymous from './../assents/anonymous.png';


let provider = new firebase.auth.GithubAuthProvider();

const Header = props => {
	return (
		<header>
			<nav>
				<ul>
					<li><strong>Steel Kiwi test App</strong></li>
					<li><Link to='/'>home</Link></li>
					<li><Link to='/search'>search</Link></li>
				</ul>
			</nav>
			<div className='profile'>
				{
					props.isSignedIn
						?
						<p>{firebase.auth().currentUser.displayName}</p>
						:
						<p>please login</p>
				}
				<div className='profilePic'>
					<img alt='profile' src={props.isSignedIn ? firebase.auth().currentUser.photoURL : anonymous}/>
				</div>
				{
					props.isSignedIn
						?
						<button onClick={() => firebase.auth().signOut()}>Sign out!</button>
						:
						<button onClick={() => firebase.auth().signInWithPopup(provider).then((result) => {
						}).catch((error) => (error))}>Sign in!</button>
				}
			</div>
		</header>
	)
};
export default Header;