import "../../src/styles/profilepage.css";
import type { UserData } from "@/types";
import React from "react";

const ProfilePage: React.FC = () => {
	const user = localStorage.getItem("user");
	const parsedUser: UserData = JSON.parse(user || "");
	return (
		<div className="profile-container">
			<div className="profile-image-wrapper">
        <p className="profile-label">Image: </p>
				<img src={parsedUser.gravatarUrl} alt="profileimage" />
			</div>
			<p className="profile-label">Email: {parsedUser.email}</p>
		</div>
	);
};

export default ProfilePage;
