import React from "react";
import { Result, Button } from "antd";
import Link from "next/link";
import { NextPage } from "next";
import { Links } from "../constants";
import { Layout } from "../components";

interface IProps {
  statusCode: any;
}

const Error: NextPage<IProps> = (props) => {
  const { statusCode } = props;
  return (
    <Layout>
      <Result
        status={statusCode}
        title={statusCode}
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link href={Links.Home}>
              <a>Back Home</a>
            </Link>
          </Button>
        }
      />
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
