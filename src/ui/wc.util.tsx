import { createRoot, Root } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import React, { ComponentType } from "react";

export function registerReactWebComponent({
  name,
  attributes,
  Component,
}: {
  name: string;
  attributes: string[];
  Component: ComponentType<any>;
}) {
  class WebComponentClass extends HTMLElement {
    private readonly shadow: ShadowRoot;
    private readonly root: Root;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.root = createRoot(this.shadow);
    }

    connectedCallback() {
      const attrs = attributes.reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: this.getAttribute(key) ?? undefined,
          }),
        {}
      );

      console.log(attrs);

      this.root.render(
        <StyleSheetManager target={this.shadow}>
          <Component {...attrs} />
        </StyleSheetManager>
      );
    }

    disconnectedCallback() {
      if (!this.isConnected) {
        this.root.unmount();
      }
    }
  }

  customElements.define(name, WebComponentClass);
}
