import React, { createContext, ReactNode, SetStateAction, useState } from "react";

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
	const context = {
		isLoggedIn,
		setIsLoggedIn: (newIsLoggedIn: boolean) => setIsLoggedIn(newIsLoggedIn),
	};
	return (
		<AdminContext.Provider value={context}>
			{children}
		</AdminContext.Provider>
	);
};
