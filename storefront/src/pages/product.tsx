import React, { FC } from "react";
import Layout from "../components/layout/Layout";

//-- Hook
import { useAppSelector } from "../redux/Hooks";

interface IProps {}

const Product: FC<IProps> = () => {
  const {
    themes: { setting },
  } = useAppSelector((state) => state.config);

  console.log("Product-Setting", setting);
  return (
    <Layout>
      <>Product</>
    </Layout>
  );
};

export default Product;
