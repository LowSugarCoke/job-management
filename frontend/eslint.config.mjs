import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import prettierConfig from 'eslint-config-prettier'

const jestGlobals = {
  afterAll: false,
  afterEach: false,
  beforeAll: false,
  beforeEach: false,
  describe: false,
  expect: false,
  jest: false,
  test: false,
}

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...jestGlobals,
        Intl: 'readonly', 
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  prettierConfig,
]
