// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    './jest.setup.js', // <- adiciona isso
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|expo(nent)?|@expo(nent)?)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};