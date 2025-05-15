import { Link } from "react-router-dom";
import "../../src/styles/navbar.css";
import { useLocation } from "react-router-dom";
import World from "@/assets/icons/world";
import LogOut from "@/assets/icons/logout";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
	const location = useLocation();
	const user = localStorage.getItem("user");
	const parsedUser = JSON.parse(user || "");
	const pages = [
		{ name: "Exchange", path: "/exchange" },
		{ name: "Wallet", path: "/wallet" },
		{ name: "Profile", path: "/profile" },
	];
	return (
		<header className="nav-header">
			<nav className="nav">
				<ul className="nav-list">
					<div style={{ marginRight: "50px", flexShrink: 0 }}>
						<img
							src="../../src/assets/logo.png"
							width={121}
							height={24}
							alt="logo"
							style={{
								maxWidth: "121px",
								width: "100%",
							}}
						/>
					</div>
					{pages.map((page) => (
						<li key={page.path}>
							<Link
								to={page.path}
								style={{
									color:
										location.pathname === page.path
											? "white"
											: "#A7B1BC",
								}}
							>
								{page.name}
							</Link>
						</li>
					))}
				</ul>
				<div className="nav-misc">
					<button className="profile-box">
						<div>
							<img
								width={32}
								height={32}
								style={{
									marginRight: "10px",
									borderRadius: "100%",
								}}
								src={parsedUser?.gravatarUrl}
								alt=""
							/>
						</div>
						<p className="user-email">{parsedUser?.email}</p>
						<ChevronRight className="text-[#A7B1BC]" />
					</button>
					<World />
					<button
						onClick={() => {
							localStorage.removeItem("user");
							window.location.href = "/";
						}}
					>
						<LogOut />
					</button>
				</div>
			</nav>
		</header>
	);
}
