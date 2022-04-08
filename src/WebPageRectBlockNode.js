// ----------------------------------------------
//         Copyright 2022 Leonid Petrunya
//              All rights reserved
// ----------------------------------------------
//             WebPageRectBlockNode
// ----------------------------------------------

import {WebPageBaseNode} from "./WebPageBaseNode.js";
 
class WebPageRectBlockNode extends WebPageBaseNode {
    constructor(argObject = {}, argDataVar = {}) {
        super(argObject, argDataVar);
        this.__loadInputVar(argObject,
            {name: "width", defaultValue: 100},
            {name: "height", defaultValue: 20},
            {name: "color", defaultValue: [0,0,0,1]},
            {name: "pivotPointX", defaultValue: "center"},
            {name: "pivotPointY", defaultValue: "center"},
            {name: "scaleX", defaultValue: 1},
            {name: "scaleY", defaultValue: 1},
            {name: "translateX", defaultValue: 0},
            {name: "translateY", defaultValue: 0},
            {name: "translateZ", defaultValue: 0},
            {name: "instantDraw"},
        );
    }
    async init() {
        const nodes = [
            "graph",
            "rect",
            "pivotPoint",
            "scale",
            "translate",
            "drawTexture",
        ];
        await this.root.importNode(...nodes);
        this.data.graph = this.root.node("Graph", {
            name: "Graph",
            clear: false
        });
        
        this.data.rectNode = this.data.graph.node("Rect", {
            name: "Rect Node",
            width: () => this.width,
            height: () => this.height,
            color: () => this.color,
            instantDraw: this.instantDraw
        });

        const pivotPointRect = this.data.graph.node("PivotPoint", {
            name: "Pivot Point Rect",
            x: this.pivotPointX,
            y: this.pivotPointY,
            objectNode: this.data.rectNode,
        });
    
        const scaleRect = this.data.graph.node("Scale", {
            name: "Scale Rect",
            transformNode: pivotPointRect,
            x: () => this.scaleX,
            y: () => this.scaleY,
            z: 1,
        });

        const translateRect = this.data.graph.node("Translate", {
            name: "Translate Rect",
            transformNode: scaleRect,
            x: () => this.translateX,
            y: () => this.translateY,
            z: () => this.translateZ,
        });
    
        const drawRect = this.data.graph.node("DrawTexture", {
            name: "Draw Rect",
            textureNode: this.data.rectNode,
            transformNode: translateRect,
            instantDraw: this.instantDraw,
        });
        
        this.data.graph.sort();
//         this.data.graph.showSortedGraph();
    }
    __update() {
        if(this.enable && this.update) {
            this.__setup();
            this.update();
            this.__cleanup();
        }
    }
    update() {
        this.data.graph.__update();
    }
    
}
Object.defineProperties(WebPageRectBlockNode.prototype, {
    "width": {
        get() {return this.__getValue(this.input.width);},
        set(value) {this.input.width = value;}
    },
    "height": {
        get() {return this.__getValue(this.input.height);},
        set(value) {this.input.height = value;}
    },
    "color": {
        get() {return this.__getValue(this.input.color);},
        set(value) {this.input.color = value;}
    },
    "pivotPointX": {
        get() {return this.__getValue(this.input.pivotPointX);},
        set(value) {this.input.pivotPointX = value;}
    },
    "pivotPointY": {
        get() {return this.__getValue(this.input.pivotPointY);},
        set(value) {this.input.pivotPointY = value;}
    },
    "scaleX": {
        get() {return this.__getValue(this.input.scaleX);},
        set(value) {this.input.scaleX = value;}
    },
    "scaleY": {
        get() {return this.__getValue(this.input.scaleY);},
        set(value) {this.input.scaleY = value;}
    },
    "translateX": {
        get() {return this.__getValue(this.input.translateX);},
        set(value) {this.input.translateX = value;}
    },
    "translateY": {
        get() {return this.__getValue(this.input.translateY);},
        set(value) {this.input.translateY = value;}
    },
    "translateZ": {
        get() {return this.__getValue(this.input.translateZ);},
        set(value) {this.input.translateZ = value;}
    },
    "instantDraw": {
        get() {return this.__getValue(this.input.instantDraw);},
        set(value) {this.input.instantDraw = value;}
    },
});

export {WebPageRectBlockNode};
