import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

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
		<BrowserRouter>
			<div className="App">
				<header className="p-3 text-bg-dark">
					<div className="container">
						<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

							<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
								<li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
							</ul>

							<div className="text-end">
								<Link to="/login" className="btn btn-outline-light me-2">Login</Link>
								<Link to="/register" className="btn btn-outline-light me-2">Register</Link>
							</div>
						</div>
					</div>
				</header>
				{/* <div id='signInDiv'></div>
				{Object.keys(user).length != 0 &&
					<button onClick={(e) => handleSignOut(e)}>Sign Out</button>
				}
				{
					user &&
					<div>
						<img src={user.picture} />
						<h3>{user.name}</h3>
					</div>
				} */}
			</div >


			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
