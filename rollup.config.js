import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/api/index.ts",
  output: {
    file: "build/bundle.js",
    format: "cjs",
  },
  plugins: [typescript(), json(), commonjs(), resolve(), terser()],
};
