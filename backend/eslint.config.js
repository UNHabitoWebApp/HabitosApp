import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import"; // <-- Importar el plugin correctamente

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ["dist", "node_modules"],
	},
	{
		files: ["**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: globals.node,
			parserOptions: {
				sourceType: "module",
			},
		},
		plugins: {
			import: importPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			"indent": ["error", "tab"],
			"import/extensions": ["error", "ignorePackages"],
			"import/no-unresolved": "error",
			"quotes": ["error", "double"],
			"semi": ["error", "always"],
			"no-console": "off",
			"prefer-const": "error",
			"no-extra-semi": "error",
			"no-unused-expressions": "error",
			"no-trailing-spaces": "error"
		},
	},
];
