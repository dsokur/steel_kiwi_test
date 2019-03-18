import React from "react";
import {Link} from "react-router-dom";
import './App.scss';
import firebase from "firebase";
import anonymous from './../assents/anonymous.png';


let provider = new firebase.auth.GithubAuthProvider();

const Header = props => {
	return (
		<header>
			<nav>
				<ul>
					<h2>Steel Kiwi test App</h2>
					<li><Link to='/'>home</Link></li>
					<li><Link to='/search'>search</Link></li>
				</ul>
			</nav>
			{
				props.isSignedIn
					?
					<div className='profile'>
						<p>{firebase.auth().currentUser.displayName}</p>
						<div className='profilePic'>
							<img alt="profile" src={firebase.auth().currentUser.photoURL}/>
						</div>
						<button onClick={() => firebase.auth().signOut()}>Sign out!</button>
					</div>
					:
					<div className='profile'>
						<p>please login</p>
						<div className='profilePic'>
							<img alt="profile" src={anonymous}/>
						</div>
						<button onClick={() => firebase.auth().signInWithPopup(provider).then((result) => {
						}).catch((error) => (error))}>Sign in!</button>
					</div>
			}
		</header>
	)
};
export default Header;