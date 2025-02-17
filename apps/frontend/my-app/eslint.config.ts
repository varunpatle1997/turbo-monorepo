import { vueEslintConfig } from "@repo/eslint-config/vue-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...vueEslintConfig,
  {
    rules: {},
  },
];