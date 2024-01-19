module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          types: './src/types/',
          screens: './src/screens/',
          components: './src/components/',
          constants: './src/constants/',
          routes: './src/routes/',
          hooks: './src/hooks/',
          state: './src/state/',
          store: './src/store/',
          themes: './src/themes/',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
