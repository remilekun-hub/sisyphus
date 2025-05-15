import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthPage from "./pages/authpage";
import ProfilePage from "./pages/profilepage";
import ProtectedLayout from "./layout/protectedlayout";
import Dashboardpage from "./pages/dashboardpage";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route element={<ProtectedLayout />}>
						<Route path="/exchange" element={<Dashboardpage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
