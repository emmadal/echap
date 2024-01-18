module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'types': './src/types/',
          'screens': './src/screens/',
          'components': './src/components/',
          'constants': './src/constants/',
          'navigation': './src/routes/',
          'utils': './src/utils/',
          'hooks': './src/hooks/',
          'api': './src/api/',
        },
      },
    ],
  ],
};
