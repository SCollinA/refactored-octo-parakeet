import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";

import { LOGIN } from "../../graphql/mutations";

import ColLoading from "../generic/loading/ColLoading";

import "./AdminLogin.css";

export default () => {
	const [showAdmin, setShowAdmin] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [adminLogin, { loading }] = useMutation(LOGIN, {
		onCompleted({ login: { token }}: any) {
			localStorage.setItem("auth-token", token);
			setIsLoggedIn(true);
			setShowAdmin(false);
		},
		onError(err: any) {
			window.alert(err.message);
			setShowAdmin(false);
		},
	});
	return (
		<ColLoading loading={loading}
			text={"hallie's • hoops •"}
		>
			{isLoggedIn &&
				<div className="logout clickable">
					<input type="button" value="logout"
						onClick={() => setIsLoggedIn(false)}
					/>
				</div>}
			{!isLoggedIn &&
				(showAdmin ?
					<form className="AdminLogin"
						onSubmit={(event: any) => {
							event.preventDefault();
							adminLogin({
								variables: {
									password: event.target.adminPassword.value,
								},
							});
						}}
					>
						<label style={{ display: "none" }}>admin password
							<input autoComplete={"username"} type="text" name="adminUsername" placeholder="no username"/>
						</label>
						<label>admin password
							<input autoFocus autoComplete={"current-password"} type="password" placeholder="not 'password1'" name="adminPassword"/>
						</label>
						<label>submit
							<input type="submit" value="proceed"/>
						</label>
					</form> :
					<p className="adminLoginButton"
						onClick={() => setShowAdmin(true)}
					>
						admin
					</p>)
			}
		</ColLoading>
	);
};
