import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import Layout from "../../components/layout/Layout";

interface IProps { }

const Info: NextPage<IProps> = () => {
	const router = useRouter();
	const { slug } = router.query;

	return (
		<Layout>
			<div className="page">
				{slug}
			</div>
		</Layout>
	);
};

export default Info;