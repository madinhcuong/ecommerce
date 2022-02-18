import React, { FC, useEffect, memo } from "react";
import { NextPage } from "next";

//-- Components
import { Menu, Layout } from "../components";

//-- Container
import Banner from "../layouts/home/Banner";
import FeaturedCategory from "../layouts/home/FeaturedCategory";
import SaleProduct from "../layouts/home/SaleProduct";

//-- Hook
import { useAppSelector, useAppDispatch } from "../redux/Hooks";

//-- Actions
import { Actions } from "../redux/reducers";
const { ConfigActions } = Actions;

interface IProps { }

const Home: NextPage<IProps> = () => {
  const dispatch = useAppDispatch();
  const { config, themes } = useAppSelector((state) => state.config);

  return (
    <Layout>
      <div className="home-page">
        <Banner />
        <SaleProduct />
        <FeaturedCategory />
      </div>
    </Layout>
  );
};

export default memo(Home);
