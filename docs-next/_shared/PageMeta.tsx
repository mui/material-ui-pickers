import Head from 'next/head';

interface PageMetaProps {
  title: string;
}

export function PageMeta({ title }: PageMetaProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

export default PageMeta;
