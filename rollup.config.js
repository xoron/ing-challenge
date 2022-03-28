import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";
import typescript from "@rollup/plugin-typescript";
import html from "@rollup/plugin-html";

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: "./src/index.html",
  output: {
    dir: "dist",
  },
  plugins: [html(), typescript()],
});
