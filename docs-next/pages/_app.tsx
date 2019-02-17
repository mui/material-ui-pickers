import React from 'react';
import App from 'next/app';
import { PageWithContexts } from '../layout/PageWithContext';
import getPageContext from '../utils/getPageContext';
import 'prismjs/themes/prism.css';

class MyApp extends App {
  pageContext = getPageContext();

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <PageWithContexts pageContext={this.pageContext}>
        <Component pageContext={this.pageContext} {...pageProps} />
      </PageWithContexts>
    );
  }
}

export default MyApp;
