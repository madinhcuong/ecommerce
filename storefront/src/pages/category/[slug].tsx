import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import Layout from "../../components/layout/Layout";

import { IndexProduct } from "../../components";

interface IProps { }

const Category: NextPage<IProps> = () => {
	const router = useRouter();
	const { slug } = router.query;

	return (
		<Layout>
			<div className="page">
				{slug}
				{/* <IndexProduct /> */}
			</div>
		</Layout>
	);
};

export default Category;