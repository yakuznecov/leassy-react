import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [navigate, setNavigate] = useState(false);

	const submit = async (e) => {
		e.preventDefault();

		const response = await axios
			.post('auth/login/', {
				username: username,
				email: email,
				password: password,
				// password2: confirmPassword,
			})
			.then(function (response) {
				localStorage.setItem('access_token', response.data.access_token);
				localStorage.setItem('refresh_token', response.data.refresh_token);
			})
			.catch(function (error) {
				console.log(error);
			});

		setNavigate(true);
	};

	if (navigate) {
		return <Navigate to='/' />;
	}

	return (
		<main className='form-signin w-100 m-auto'>
			<form onSubmit={submit}>
				<h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
				<div className='form-floating'>
					<input className='form-control' placeholder='Name' onChange={(e) => setUsername(e.target.value)} />
					<label>Name</label>
				</div>
				<div className='form-floating'>
					<input
						type='email'
						className='form-control'
						id='floatingInput'
						placeholder='name@example.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor='floatingInput'>Email address</label>
				</div>
				<div className='form-floating'>
					<input
						type='password'
						className='form-control'
						id='floatingPassword'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor='floatingPassword'>Password</label>
				</div>

				<button className='w-100 btn btn-lg btn-primary' type='submit'>
					Sign in
				</button>
			</form>
		</main>
	);
};

export default Login;
