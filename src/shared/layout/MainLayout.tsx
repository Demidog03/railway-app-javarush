import { Layout } from 'antd';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import classes from './MainLayout.module.css';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className={classes.root}>
      <Layout.Header className={classes.header}>
        <div className={classes.brand}>Railway</div>
        <nav className={classes.nav}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/buy-tickets" className={classes.link}>
            Buy tickets
          </Link>
        </nav>
      </Layout.Header>
      <Layout.Content className={classes.content}>{children}</Layout.Content>
    </Layout>
  );
}

