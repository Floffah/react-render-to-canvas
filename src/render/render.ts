import { DOMAttributes, ReactElement } from "react";
import { NodeCanvasRenderingContext2D } from "canvas";
import { Renderer } from "./Renderer";

export function render<T extends Element>(
    el: ReactElement<DOMAttributes<T>>,
    canvas: CanvasRenderingContext2D | NodeCanvasRenderingContext2D,
) {
    return new Renderer(el, canvas);
}
