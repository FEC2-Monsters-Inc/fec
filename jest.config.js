module.exports = {
  verbose: true,
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
};
