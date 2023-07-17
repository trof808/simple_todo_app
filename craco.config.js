module.exports = {
    jest: {
        configure: {
            testRunner: "jest-jasmine2",
            transformIgnorePatterns: [
                "<rootDir>/node_modules/(?!axios)/"
            ],
            preset: 'ts-jest',
            testEnvironment: 'jsdom',
            moduleNameMapper: {
                ".\\.(css|CSS)$": "identity-obj-proxy",
            },
            setupFilesAfterEnv: ["jest-allure/dist/setup"],
        }
    }
};