import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Exported design handoff files are reference artifacts, not application
    // source; linting their bundled legacy runtime blocks release validation.
    "design_handoff_projeler/**",
    "tmp/**",
    "output/**",
  ]),
]);

export default eslintConfig;
