const withMDX = require('@zeit/next-mdx')();
const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');

module.exports = withImages(
  withTypescript(
    withMDX({
      pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    })
  )
);
