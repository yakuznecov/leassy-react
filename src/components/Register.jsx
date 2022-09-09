import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [navigate, setNavigate] = useState(false);

	const submit = async (e) => {
		e.preventDefault();

		await axios
			.post('auth/registration/', {
				username: username,
				email: email,
				password1: password,
				password2: confirmPassword,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		setNavigate(true);
	};

	if (navigate) {
		return <Navigate to='/login' />;
	}

	return (
		<main className='form-signin w-100 m-auto'>
			<form onSubmit={submit}>
				<h1 className='h3 mb-3 fw-normal'>Please register</h1>

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
				<div className='form-floating'>
					<input
						type='password'
						className='form-control'
						id='confirmPassword'
						placeholder='Confirm Password'
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<label htmlFor='confirmPassword'>Confirm Password</label>
				</div>

				<button className='w-100 btn btn-lg btn-primary' type='submit'>
					Submit
				</button>
			</form>
		</main>
	);
};

export default Register;
