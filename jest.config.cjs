module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.cjs",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.cjs",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    "tsx",
    "ts",
    "web.js",
    "js",
    "web.ts",
    "web.tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  resetMocks: true,
};
