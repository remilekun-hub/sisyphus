import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import md5 from "blueimp-md5";

function AuthPage() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email) return;
		const cleanEmail = email.trim().toLowerCase();
		const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
			cleanEmail
		)}?s=200`;

		localStorage.setItem(
			"user",
			JSON.stringify({ email: cleanEmail, gravatarUrl })
		);
		navigate(`/exchange`);
	};

	return (
		<div className="auth-container">
			<div className="auth-content">
				<h1 className="title">Log In</h1>
				<form onSubmit={handleSubmit} className="auth-form">
					<input
						type="email"
						required
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="email-input"
					/>
					<button type="submit" className="auth-cta">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default AuthPage;
