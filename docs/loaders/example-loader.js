const loaderUtils = require('loader-utils');
const safeJsonStringify = require('safe-json-stringify');
const nextBabelLoader = require('next/dist/build/webpack/loaders/next-babel-loader');

module.exports = function exampleLoader(source) {
  const escapedRawSource = safeJsonStringify(source.replace(/'/g, '"'));
  const sourceWithExportedRaw = source + `\nexport const raw = '${escapedRawSource}'`;

  nextBabelLoader.call(this, sourceWithExportedRaw);
};
