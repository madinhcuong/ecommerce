import React from "react";
import { NextPage } from "next";
import Layout from "../components/layout/Layout";

interface IProps { }

const Cart: NextPage<IProps> = () => {

	return (
		<Layout>
			<div className="page">
				Cart
			</div>
		</Layout>
	);
};

export default Cart;