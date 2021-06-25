import ReactReconciler, { HostConfig } from "react-reconciler";
import { Renderer } from "./Renderer";
import {
    HTMLContentNodes,
    HTMLHasChildNode,
    HTMLLiteralTextNode,
} from "../dom/structures/Dom";

export const CanvasReconciler: <T extends Element>(r: Renderer<T>) => any = (
    r,
) =>
    // @ts-ignore
    ReactReconciler({
        now: () => Date.now(),
        getRootHostContext: (_container) => ({}),
        prepareForCommit: () => ({}),
        resetAfterCommit: () => ({}),
        getChildHostContext: () => ({}),
        shouldSetTextContent: (_type, props) => {
            return (
                typeof props.children === "string" ||
                typeof props.children === "number"
            );
        },
        createInstance: (type: any, props: any) => {
            const el = r.dom.createElement(type);
            for (const prop of Object.keys(props)) {
                const val = props[prop];
                if (prop === "children") {
                    if (typeof val === "string" || typeof val === "number") {
                        el.text = `${val}`;
                    }
                } else if (prop === "className") {
                    el.className = val;
                } else el.setAttribute(prop, props[prop]);
            }
            return el;
        },
        createTextInstance: (text) => {
            return new HTMLLiteralTextNode(r.dom, text);
        },
        appendInitialChild: (
            parent: HTMLContentNodes,
            child: HTMLContentNodes,
        ) => {
            parent.appendChild(child);
        },
        appendChild: (parent: HTMLContentNodes, child: HTMLContentNodes) => {
            parent.appendChild(child);
        },
        appendChildToContainer: (
            parent: HTMLContentNodes,
            child: HTMLContentNodes,
        ) => {
            parent.appendChild(child);
        },
        finalizeInitialChildren: () => {},
        clearContainer: () => {},
        getPublicInstance: () => {},
        prepareUpdate() {
            return true;
        },
        commitUpdate: (
            el: HTMLContentNodes,
            _payload,
            _type,
            _oldprops,
            newprops,
        ) => {
            for (const prop of Object.keys(newprops)) {
                const val = newprops[prop];
                if (prop === "children") {
                    if (typeof val === "string" || typeof val === "number") {
                        el.text = `${val}`;
                    }
                } else {
                    el.setAttribute(prop, val);
                }
            }
        },
        commitTextUpdate: (el: HTMLContentNodes, _old, newtext) => {
            el.text = newtext;
        },
        removeChild(parent: HTMLHasChildNode<any>, child: HTMLContentNodes) {
            parent.removeChild(child);
        },
        supportsMutation: true,
    } as Partial<HostConfig<any, any, any, any, any, any, any, any, any, any, any, any, any>> as any);
