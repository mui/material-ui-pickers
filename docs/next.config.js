const path = require('path');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');
const rehypePrism = require('@mapbox/rehype-prism');
const headings = require('./utils/anchor-autolink');
const withTM = require('next-transpile-modules');
const slug = require('remark-slug');

const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    hastPlugins: [rehypePrism],
    mdPlugins: [slug, headings],
  },
});

module.exports = withCSS(
  withImages(
    withTypescript(
      withMDX(
        withTM({
          pageExtensions: ['js', 'jsx', 'md', 'mdx'],
          transpileModules: ['material-ui-pickers'],
        })
      )
    )
  )
);
