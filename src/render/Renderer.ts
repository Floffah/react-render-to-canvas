import { DOMAttributes, ReactElement } from "react";
import { NodeCanvasRenderingContext2D } from "canvas";
import { VirtualDom } from "../dom/VirtualDom";
import { CanvasReconciler } from "./Reconciler";

export class Renderer<T extends Element> {
    el: ReactElement<DOMAttributes<T>>;
    canvas: CanvasRenderingContext2D | NodeCanvasRenderingContext2D;

    dom: VirtualDom<T>;
    reconciler: ReturnType<typeof CanvasReconciler>;

    mode: "node" | "web";

    constructor(
        el: ReactElement<DOMAttributes<T>>,
        canvas: CanvasRenderingContext2D | NodeCanvasRenderingContext2D,
    ) {
        this.el = el;
        this.canvas = canvas;

        this.mode = typeof window !== "undefined" ? "web" : "node";

        this.dom = new VirtualDom<T>(this);

        this.initialise();
    }

    initialise() {
        this.reconciler = CanvasReconciler<T>(this);
        const container = this.reconciler.createContainer(
            this.dom.body,
            0,
            false,
            null,
        );
        this.reconciler.updateContainer(this.el, container, null, () => null);
    }
}
