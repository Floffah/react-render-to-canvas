import { VirtualDom } from "../VirtualDom";

export interface Dom {
    indexes: {
        html: {
            index: number;
            head: {
                index: number;
            };
            body: {
                index: number;
            };
        };
    };
    document: DocumentNode;
}

export class HTMLAttributableNode {
    attrs: NodeAttributes = {};

    getAttribute(name: string) {
        return this.attrs[name];
    }

    setAttribute(name: string, value: any) {
        this.attrs[name] = value;
    }
}

export class HTMLHasChildNode<T extends any> extends HTMLAttributableNode {
    children: T[];
    dom: VirtualDom<any>;

    constructor(dom: VirtualDom<any>, children: T[] = []) {
        super();
        this.dom = dom;
        this.children = children;
    }

    appendChild(child: T) {
        this.children.push(child);
    }

    removeChild(child: T) {
        const index = this.children.indexOf(child);
        if (index >= 0) this.children.splice(index, 1);
    }
}

export class DocumentNode extends HTMLHasChildNode<HTMLHTMLNode> {
    nodeName = "#document";

    constructor(dom: VirtualDom<any>, children: HTMLHTMLNode[] = []) {
        super(dom, children);
    }
}

export type NodeAttributes = { [k: string]: any };

export class HTMLHTMLNode extends HTMLHasChildNode<HTMLChildNodes> {
    nodeName: "html";

    constructor(dom: VirtualDom<any>, children: HTMLChildNodes[] = []) {
        super(dom, children);
    }
}

export type HTMLChildNodes = HTMLBodyNode | HTMLHeadNode;

export class HTMLBodyNode extends HTMLHasChildNode<HTMLContentNodes> {
    nodeName: "body";

    constructor(dom: VirtualDom<any>, children: HTMLContentNodes[] = []) {
        super(dom, children);
    }
}

export class HTMLHeadNode extends HTMLHasChildNode<HTMLHeadNodes> {
    nodeName: "head";

    constructor(dom: VirtualDom<any>, children: HTMLHeadNodes[] = []) {
        super(dom, children);
    }
}

export type HTMLHeadNodes = HTMLTitleNode;

export class HTMLTitleNode extends HTMLHasChildNode<HTMLLiteralNodes> {
    nodeName: "title";

    constructor(dom: VirtualDom<any>, children: HTMLLiteralNodes[] = []) {
        super(dom, children);
    }
}

export type HTMLLiteralNodes = HTMLLiteralTextNode;
export type HTMLContentNodes =
    | HTMLParagraphNode
    | HTMLDivNode
    | HTMLLiteralTextNode;

export class HTMLContentBasedNode extends HTMLHasChildNode<HTMLContentNodes> {
    constructor(dom: VirtualDom<any>, children: HTMLContentNodes[] = []) {
        super(dom, children);
    }

    get className() {
        return this.getAttribute("class") as string | undefined;
    }

    set className(val) {
        this.setAttribute("class", val);
    }

    get text() {
        for (const child of this.children) {
            if (child instanceof HTMLLiteralTextNode) {
                return child.value;
            }
        }
        return undefined;
    }

    set text(value) {
        if (value) this.children = [new HTMLLiteralTextNode(this.dom, value)];
    }
}

export class HTMLParagraphNode extends HTMLContentBasedNode {
    nodeName: "p";

    constructor(dom: VirtualDom<any>, children: HTMLContentNodes[] = []) {
        super(dom, children);
    }
}

export class HTMLDivNode extends HTMLContentBasedNode {
    nodeName: "div";
    tagName: "div";

    constructor(dom: VirtualDom<any>, children: HTMLContentNodes[] = []) {
        super(dom, children);
    }
}

export class HTMLLiteralTextNode extends HTMLContentBasedNode {
    nodeName: "#text";
    value: string;

    constructor(dom: VirtualDom<any>, value: string) {
        super(dom);
        this.value = value;
    }
}
