import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';
import flush from 'styled-jsx/server';
import { PageContext } from '../utils/getPageContext';

class MyDocument extends Document {
  static getInitialProps = (ctx: NextDocumentContext) => {
    // Render app and page and get the context of the page with collected side effects.
    let pageContext: PageContext | undefined;

    const page = ctx.renderPage(Component => {
      const WrappedComponent = (props: any) => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired,
      };

      return WrappedComponent;
    });

    let css: string;
    // It might be undefined, e.g. after an error.
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css! }} />
          {flush() || null}
        </React.Fragment>
      ),
    };
  };

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="theme-color" content="3f51b5" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
