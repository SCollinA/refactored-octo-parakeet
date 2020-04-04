import React from "react";

import Layout from "../components/layout/Layout";
import Collections from "../components/collections/Collections";
import Hoops from "../components/hoops/Hoops";

import "../styles/Collections.scss";

export default  () => (
	<Layout>
		<Collections/>
		<Hoops/>
	</Layout>
);
