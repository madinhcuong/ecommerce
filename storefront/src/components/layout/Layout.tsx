import React, { ReactNode, FC, memo } from "react";
import Head from "next/head";
import ThemeSwitch from "../themeSwitch";
import Footer from "../footer";
import Header from "../header";
import { storeName } from "../../data";

const name = "Description";
const content = "Learn how to build a personal website using Next.js";
interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = (props) => {
  const { children } = props;
  return (
    <>
      <Head>
        <link rel="icon" href="/images/icons/icon-36x36.png" />
        <meta name={name} content={content} />
        <title>{storeName}</title>
      </Head>
      <header>
        <Header />
      </header>
      <main>
        <div className="main-content">
          {children}
          <ThemeSwitch />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default memo(Layout);
