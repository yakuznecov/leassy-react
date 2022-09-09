import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
	const [name, setName] = useState('');
	const [navigate, setNavigate] = useState(false);

	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('access_token'),
	};

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('auth/user/', { headers: headers });

				setName(data.username);
			} catch (e) {
				setNavigate(true);
			}
		})();
	}, []);

	const logout = async () => {
		await axios.post('logout', {}, localStorage.clear());

		setNavigate(true);
	};

	if (navigate) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='form-signin mt-5 text-center m-auto'>
			<h3>Hi {name}</h3>

			<button className='btn btn-lg btn-primary' onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default Home;
