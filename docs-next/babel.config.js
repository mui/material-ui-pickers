module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          'material-ui-pickers': './.material-ui-pickers.dev.build/dist/material-ui-pickers.esm.js',
        },
      },
    ],
  ],
};
