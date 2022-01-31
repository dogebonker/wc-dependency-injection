import { Token } from "./di.container";

interface DiRequest {
  type?: any;
  instance?: any;
}

function makeRequestEvent(type: Token<any>): CustomEvent<DiRequest> {
  return new CustomEvent<DiRequest>("dependency-injection-request", {
    detail: { type },
    bubbles: true,
    composed: true,
  });
}

export function Inject(type?: Token<any>): (target: any, name: string) => any {
  return (target: any, name: string): any => {
    const paramType = type || Reflect.getMetadata("design:type", target, name);

    const property = {
      get(): HTMLElement {
        const event = makeRequestEvent(paramType);
        (this as unknown as HTMLElement).dispatchEvent(event);
        return event.detail.instance;
      },
    };

    Object.defineProperty(target, name, property);

    return target;
  };
}
