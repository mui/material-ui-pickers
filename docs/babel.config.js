module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        [
          'istanbul',
          {
            all: true,
            excludeNodeModules: false,
            include: ['**/node_modules/@material-ui/pickers/**'],
          },
        ],
      ],
    },
  },
};
