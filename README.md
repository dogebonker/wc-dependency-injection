# wc-dependency-injection

## <img src="https://web-components-resources.appspot.com/static/logo.svg" alt="Web Components" width="32" height="32" /> Dependency Injection Solution for Web Components 😎

## Credits

This code has been taken from the [web components dependency injection](https://www.thinktecture.com/en/web-components/dependency-injection/) article, published by [Manuel Rauber](https://www.thinktecture.com/en/manuel-rauber/) and [Yannick Baron](https://www.thinktecture.com/en/yannick-baron/). You can find their github repository [here](https://github.com/thinktecture-labs/web-components-dependency-injection) and github profiles [Manuel Rauber](https://github.com/ManuelRauber) and [Yannick Baron](https://github.com/npx).

## Usage

> **_Warning! ⚠️_**
> In order to use this package you will to declare a `experimentalDecorators` property to `true` in either your `jsconfig.json` or `tsconfig.json`

Considering your web component tree looks like this:

```html
<my-root>
  <my-child></my-child>
</my-root>
```

```js
// my-root.component.js

import { ContainerProvider } from "wc-dependency-injection";
import { Logger } from "@services/logger.service.ts";

@ContainerProvider([{ provide: Logger, useClass: Logger }])
export class MyRoot extends HTMLElement {
  // ...
}

// my-child.component.js

import { Inject } from "wc-dependency-injection";

export class MyChild extends HTMLElement {
  @Inject() logger: Logger;

  connectedCallback() {
    this.logger.log("Hello World!");
  }
}
```

## Installation

```sh
npm install wc-dependency-injection
```

## Development

If you want to contribute to this library - you are very welcome! Please create a pull request and describe the changes you made and which problem it solves.

## License

MIT
