const path = require('path');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');
const rehypePrism = require('@mapbox/rehype-prism');
const highlight = require('remark-highlight.js');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    hastPlugins: [rehypePrism],
  },
});

module.exports = withCSS(
  withImages(
    withTypescript(
      withMDX({
        pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      })
    )
  )
);
