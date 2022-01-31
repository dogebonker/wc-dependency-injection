"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
function makeRequestEvent(type) {
    return new CustomEvent("dependency-injection-request", {
        detail: { type },
        bubbles: true,
        composed: true,
    });
}
function Inject(type) {
    return (target, name) => {
        const paramType = type || Reflect.getMetadata("design:type", target, name);
        const property = {
            get() {
                const event = makeRequestEvent(paramType);
                this.dispatchEvent(event);
                return event.detail.instance;
            },
        };
        Object.defineProperty(target, name, property);
        return target;
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.decorator.js.map