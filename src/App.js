import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [user, setUser] = useState({});

	function handleCallbackResponse(response) {
		console.log(response.credential);
		let userObject = jwt_decode(response.credential);
		console.log(userObject);
		setUser(userObject);
		document.getElementById("signInDiv").hidden = true;
	}

	function handleSignOut(event) {
		setUser({});
		document.getElementById("signInDiv").hidden = false;
	}

	useEffect(() => {
		/* global google*/
		google.accounts.id.initialize({
			client_id: '756550873174-o3n6pv90rkahtajrhk7i0f8j5v0rejei.apps.googleusercontent.com',
			callback: handleCallbackResponse
		});

		google.accounts.id.renderButton(
			document.getElementById('signInDiv'),
			{ theme: 'outline', size: 'large' }
		)
	}, []);

	return (
		<div className="App">
			<div id='signInDiv'></div>
			{Object.keys(user).length != 0 &&
				<button onClick={(e) => handleSignOut(e)}>Sign Out</button>
			}
			{
				user &&
				<div>
					<img src={user.picture} />
					<h3>{user.name}</h3>
				</div>
			}
		</div >
	);
}

export default App;
