const path = require('path');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');
const rehypePrism = require('@mapbox/rehype-prism');
const highlight = require('remark-highlight.js');
const headings = require('./utils/anchor-autolink');
const slug = require('remark-slug');

const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    hastPlugins: [rehypePrism],
    mdPlugins: [
      slug,
      [
        headings,
        {
          behaviour: 'wrap',
          content: {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['anchor-container'],
            },
            children: [
              {
                type: 'text',
                value: '#',
              },
            ],
          },
          linkProperties: { ariaHidden: 'true', className: 'anchor-link' },
        },
      ],
    ],
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
