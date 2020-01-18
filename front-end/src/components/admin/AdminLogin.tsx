import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";

import { LOGIN } from "../../graphql/mutations";

import ColLoading from "../generic/loading/ColLoading";

import { AdminContext } from "./AdminContext";

import "./AdminLogin.css";

export default () => {
	const [showAdmin, setShowAdmin] = useState(false);
	const {
		isLoggedIn,
		setIsLoggedIn,
	} = useContext(AdminContext);
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
	const logout = () => {
		localStorage.clear();
		setIsLoggedIn(false);
		setShowAdmin(false);
	};
	return (
		<ColLoading loading={loading}
			text={"hallie's • hoops •"}
		>
			{isLoggedIn &&
				<div className="logout clickable">
					<input type="button" value="logout"
						onClick={() => logout()}
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
						<label htmlFor="username">
								admin password
						</label>
						<input id="username"
							autoComplete={"username"}
							type="text"
							name="adminUsername"
							placeholder="no username"
							style={{ display: "none" }}
						/>
						<label htmlFor="password">
							admin password
						</label>
						<input id="password"
							autoFocus
							autoComplete={"current-password"}
							type="password"
							placeholder="not 'password1'"
							name="adminPassword"
						/>
						<label htmlFor="submit">
							submit
						</label>
						<input id="submit" type="submit" value="submit"/>
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
