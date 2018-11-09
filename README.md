# rollup-plugin-stylus-to-css

A Rollup.js plugin to compile Stylus files to css for use in web components. As if 1.1.0 it will work with stylus @import and @require statements. 

## Installation

```bash
npm i rollup-plugin-stylus-to-css -D
```

## Usage

Add the following code to your project's `rollup.config.js`:

```js
import stylus from 'rollup-plugin-stylus-to-css';

export default {
  entry: 'index.js',
  plugins: [
    stylus(),
  ]
};
```

### in Stylus

```stylus
.container
  height 100%
```

### in JS

```js
import css from './component.styl';

class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<style>${css}</style><div></div>`;
  }

  static get observedAttributes() {
    return [];
  }
}

customElements.define('my-component', MyComponent);

export { IdxFindBatches };
```

## License

MIT
