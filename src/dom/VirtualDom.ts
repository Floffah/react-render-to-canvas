import { Renderer } from "../render/Renderer";
import {
    DocumentNode,
    Dom,
    HTMLBodyNode,
    HTMLContentNodes,
    HTMLDivNode,
    HTMLHeadNode,
    HTMLHTMLNode,
    HTMLParagraphNode,
} from "./structures/Dom";

export class VirtualDom<T extends Element> {
    renderer: Renderer<T>;

    dom: Dom;
    body: HTMLBodyNode;

    constructor(r: Renderer<T>) {
        this.renderer = r;

        this.dom = {
            indexes: {
                html: {
                    index: -1,
                    body: {
                        index: -1,
                    },
                    head: {
                        index: -1,
                    },
                },
            },
            document: new DocumentNode(this, [
                new HTMLHTMLNode(this, [
                    new HTMLHeadNode(this),
                    new HTMLBodyNode(this),
                ]),
            ]),
        };

        this.index();
        this.body = this.dom.document.children[this.dom.indexes.html.index]
            .children[this.dom.indexes.html.body.index] as HTMLBodyNode;
    }

    createElement(
        type: "div" | "p",
        _options?: ElementCreationOptions,
    ): HTMLContentNodes {
        let el: HTMLContentNodes;

        if (type === "div") {
            el = new HTMLDivNode(this);
        } else if (type === "p") {
            el = new HTMLParagraphNode(this);
        } else {
            throw new Error("Invalid element type");
        }

        // const head = this.dom.document.children[
        //     this.dom.indexes.html.index
        // ] as HTMLHTMLNode;
        // const body = head.children[
        //     this.dom.indexes.html.body.index
        // ] as HTMLBodyNode;
        //
        // body.children.push(el);

        return el;
    }

    index() {
        for (let dci = 0; dci < this.dom.document.children.length; dci++) {
            const documentChild = this.dom.document.children[dci];
            if (documentChild instanceof HTMLHTMLNode) {
                this.dom.indexes.html = {
                    index: dci,
                    body: {
                        index: -1,
                    },
                    head: {
                        index: -1,
                    },
                };

                for (let hci = 0; hci < documentChild.children.length; hci++) {
                    const htmlChild = documentChild.children[hci];

                    if (htmlChild instanceof HTMLBodyNode) {
                        this.dom.indexes.html.body = {
                            index: hci,
                        };
                    } else if (htmlChild instanceof HTMLHeadNode) {
                        this.dom.indexes.html.head = {
                            index: hci,
                        };
                    }
                }
            }
        }
    }
}
