import React, { FunctionComponent } from "react";
import { LayoutProps } from "./Layout.props";

import styles from "./Layout.module.css";
import cn from "classnames";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { AppContextProvaider, IAppContext } from "../context/app.context";


const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>
        {children}
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

// пишем HOC и возвращаем обернутый компонент
export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Comonent: FunctionComponent<T>
) => function withLayoutComponent(props: T): JSX.Element {
  return (
    <AppContextProvaider menu={props.menu} firstCategory={props.firstCategory}>
      <Layout>
        <Comonent {...props} />
      </Layout>
    </AppContextProvaider>
  );
};
