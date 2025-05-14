import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const ProtectedLayout: React.FC<{}> = () => {
	const user = localStorage.getItem("user");

	if (!user) {
		return <Navigate to="/" replace />;
	}
	return (
		<div>
			<Navbar />
			<main style={{ padding: "1rem" }}>
				<Outlet />
			</main>
		</div>
	);
};

export default ProtectedLayout;
