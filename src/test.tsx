import "source-map-support/register";
import { render } from "./";
import { createCanvas } from "canvas";
import React from "react";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { inspect } from "util";

const canvas = createCanvas(500, 500);
const rendered = render(<p>hi</p>, canvas.getContext("2d"));

writeFileSync(
    resolve(__dirname, "../dist", "debug.inspect"),
    inspect(rendered, false, 15, false),
);
