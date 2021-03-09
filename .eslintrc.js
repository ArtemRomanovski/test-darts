// eslint-disable-next-line no-undef
module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
	},
	parser: "@typescript-eslint/parser",
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parserOptions: {
		// "env": {
		// 	"es6": true
		// },
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
	},
	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/semi": ["error", "always"],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
				overrides: {
					accessors: "explicit",
					constructors: "no-public",
					methods: "explicit",
					properties: "explicit",
					parameterProperties: "explicit",
				},
			},
		],
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/func-call-spacing": ["error"],
		"@typescript-eslint/type-annotation-spacing": ["error"],
		"@typescript-eslint/no-extra-parens": ["error"],
		"func-call-spacing": "off",
		"no-extra-parens": "off",
		"no-unused-vars": "off",
		"no-unneeded-ternary": ["warn"],
		"key-spacing": ["warn"],
		yoda: ["warn"],
		"no-multi-spaces": ["error"],
		"no-prototype-builtins": "off",
		"no-trailing-spaces": ["error", { ignoreComments: true }],
		"no-underscore-dangle": ["error", { allowAfterThis: false }],
		"@typescript-eslint/no-object-literal-type-assertion": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"eol-last": ["error", "always"],
		indent: "off",
		quotes: ["error", "double", { allowTemplateLiterals: true }],
		semi: "off",
		"no-console": "off",
		typedef: "off",
	},
};
