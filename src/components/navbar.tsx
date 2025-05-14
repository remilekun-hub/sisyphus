import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
					<li>
						<Link to="/dashboard">markets</Link>
					</li>
					<li>
						<Link to="/wallet">Wallet</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<button
							onClick={() => {
								localStorage.removeItem("user");
								window.location.href = "/";
							}}
						>
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
