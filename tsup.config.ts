import { Options } from "tsup";

export const tsup: Options = {
    splitting: true,
    target: "node12",
    entryPoints: ["./src/index.ts", "./src/test.tsx"],
    external: [
        "react",
        "react-reconciler",
        "canvas",
        "react-dom",
        "source-map-support/register",
        "jju",
    ],
    dts: true,
    clean: true,
    sourcemap: true,
};
