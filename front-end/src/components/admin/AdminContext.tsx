import { useQuery } from "@apollo/react-hooks";
import React, { createContext, ReactNode, useState } from "react";

import client from "../../graphql/apollo";
import { IS_LOGGED_IN } from "../../graphql/queries";

export const AdminContext = createContext({
	isLoggedIn: false,
	setIsLoggedIn: (isLoggedIn: boolean) => { return; },
});

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useQuery(IS_LOGGED_IN, {
		onCompleted(data) {
			setIsLoggedIn(data.IsLoggedIn);
		},
	});
	const context = {
		isLoggedIn,
		setIsLoggedIn: (newIsLoggedIn: boolean) => {
			if (!newIsLoggedIn) {
				client.writeQuery({
					data: { IsLoggedIn: newIsLoggedIn },
					query: IS_LOGGED_IN,
				});
			}
			setIsLoggedIn(newIsLoggedIn);
		},
	};
	return (
		<AdminContext.Provider value={context}>
			{children}
		</AdminContext.Provider>
	);
};
