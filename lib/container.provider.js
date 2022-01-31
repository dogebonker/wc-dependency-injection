"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerProvider = void 0;
const di_container_1 = require("./di.container");
function ContainerProvider(providers) {
    const container = new di_container_1.Container();
    providers.forEach(({ provide, useClass }) => container.provide(provide, useClass));
    return (target) => {
        const connectedCallback = target.prototype.connectedCallback;
        target.prototype.connectedCallback = function () {
            this.addEventListener("dependency-injection-request", (event) => {
                try {
                    event.detail.instance = container.get(event.detail.type);
                    event.stopPropagation();
                }
                catch (_a) { }
            });
            if (connectedCallback) {
                connectedCallback();
            }
        };
        return target;
    };
}
exports.ContainerProvider = ContainerProvider;
//# sourceMappingURL=container.provider.js.map