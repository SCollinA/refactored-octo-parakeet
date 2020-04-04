import React from "react";

import Layout from "../components/layout/Layout";
import CollectionContext from "../components/collections/CollectionContext";
import Collections from "../components/collections/Collections";
import Hoops from "../components/hoops/Hoops";

import "../styles/Collections.scss";

export default  () => (
	<Layout>
		<CollectionContext>
			<Collections/>
			<Hoops/>
		</CollectionContext>
	</Layout>
);
