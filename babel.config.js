module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          navigation: './src/navigation',
          theme: './src/theme',
          components: './src/components',
          features: './src/features',
          state: './src/state',
          utils: './src/utils',
          api: './src/api',
        },
      },
    ],
  ],
};
