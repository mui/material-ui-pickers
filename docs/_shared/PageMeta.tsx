import Head from 'next/head';
import { withRouter, WithRouterProps } from 'next/router';

interface PageMetaProps extends WithRouterProps {
  title?: string;
  component?: string;
  description?: string;
}

const host = process.env.NOW_URL;

export function PageMeta({ title, component, router, description }: PageMetaProps) {
  if (component) {
    title = `${component} - Material-ui-pickers component`;
    description = `${component} usage examples and API of material-ui-pickers`;
  }

  return (
    <Head>
      <title>{title}</title>

      {router && host && <meta name="og:url" content={host + router.pathname} />}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
    </Head>
  );
}

export default withRouter(PageMeta);
