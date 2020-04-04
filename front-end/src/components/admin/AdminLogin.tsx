import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";

import { LOGIN } from "../../graphql/mutations";

import Loading from "../loading/Loading";

import { AdminContext } from "./AdminContext";

import "./AdminLogin.scss";

export default () => {
	const [showAdmin, setShowAdmin] = useState(false);
	const {
		isLoggedIn,
		setIsLoggedIn,
	} = useContext(AdminContext);
	const [adminLogin, { loading }] = useMutation(LOGIN, {
		onCompleted({ Login: { token }}: any) {
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
		<Loading loading={loading}>
			{isLoggedIn &&
				<div className="admin-logout clickable">
					<input type="button" value="logout"
						onClick={() => logout()}
					/>
				</div>}
			{!isLoggedIn &&
				(showAdmin ?
					<form className="admin-login"
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
						<label htmlFor="cancel">
							cancel
						</label>
						<input id="cancel"
							type="button"
							value="cancel"
							onClick={() => setShowAdmin(false)}
						/>
					</form> :
					<p className="admin-login__button"
						onClick={() => setShowAdmin(true)}
					>
						admin
					</p>)
			}
		</Loading>
	);
};
