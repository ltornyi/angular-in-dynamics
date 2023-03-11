module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "package.json",
        "package-lock.json",
        "tsconfig.spec.json"
    ]
}
