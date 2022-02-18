import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import Layout from "../../components/layout/Layout";

interface IProps { }

const Search: NextPage<IProps> = () => {
	const router = useRouter();
	const { key } = router.query;

	return (
		<Layout>
			<>{key}</>
		</Layout>
	);
};

export default Search;