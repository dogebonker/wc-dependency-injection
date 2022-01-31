"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
require("reflect-metadata");
const KEY_IS_INJECTABLE = Symbol("IS_INJECTABLE");
class Container {
    constructor() {
        this.container = new Map();
    }
    provide(token, clazz) {
        const actualClass = clazz || token;
        if (actualClass.prototype.constructor.length &&
            !this.isInjectable(actualClass)) {
            throw new Error(`${actualClass.name} is not decorated!`);
        }
        this.container.set(token, { clazz: actualClass });
    }
    get(token) {
        const item = this.container.get(token);
        if (!item) {
            throw new Error(`Nothing found for token ${token.name}`);
        }
        const { clazz, instance } = item;
        if (!instance) {
            const params = this.getInjectedParams(clazz);
            const newInstance = Reflect.construct(clazz, params);
            this.container.set(token, { clazz, instance: newInstance });
            return newInstance;
        }
        return instance;
    }
    // Check if target is decorated
    isInjectable(target) {
        return Reflect.getMetadata(KEY_IS_INJECTABLE, target) === true;
    }
    // Read type information from metadata
    getInjectedParams(clazz) {
        const argTypes = Reflect.getMetadata("design:paramtypes", clazz);
        if (argTypes === undefined) {
            return [];
        }
        return argTypes.map((token) => this.get(token));
    }
}
exports.Container = Container;
//# sourceMappingURL=di.container.js.map