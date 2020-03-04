import {ReactElement, FunctionComponent, ComponentClass, ComponentPropsWithRef, ReactNode, JSXElementConstructor} from 'react';

export const wrapChildren = (children: ReactNode) => {
    return (Array.isArray(children) ? children : [children]) as ReactElement[]
}

function isReactElement
// <T extends (...args: any[]) => any>
(
    // childType: T,
    child: ReactNode
): child is ReactElement<any> {
    return typeof child === 'object' && child != null && 'type' in child
    //  && child.type === childType
}

type ElementWithProps<T extends ComponentClass<any> | FunctionComponent<any>> = ReactElement<
    ComponentPropsWithRef<T>
>

export function groupChildren<T extends ComponentClass<any> | FunctionComponent<any>>(
    children: JSX.Element[],
    type1: T
): [JSX.Element[], ElementWithProps<T>[]]
export function groupChildren<
    T1 extends ComponentClass<any> | FunctionComponent<any>,
    T2 extends ComponentClass<any> | FunctionComponent<any>
>(children: JSX.Element[], type1: T1, type2: T2): [JSX.Element[], ElementWithProps<T1>[], ElementWithProps<T2>[]]
export function groupChildren<
    T1 extends ComponentClass<any> | FunctionComponent<any>,
    T2 extends ComponentClass<any> | FunctionComponent<any>,
    T3 extends ComponentClass<any> | FunctionComponent<any>
>(
    children: JSX.Element[],
    type1: T1,
    type2: T2,
    type3: T3
): [JSX.Element[], ElementWithProps<T1>[], ElementWithProps<T2>[], ElementWithProps<T3>[]]
export function groupChildren<
    T1 extends ComponentClass<any> | FunctionComponent<any>,
    T2 extends ComponentClass<any> | FunctionComponent<any>,
    T3 extends ComponentClass<any> | FunctionComponent<any>,
    T4 extends ComponentClass<any> | FunctionComponent<any>
>(
    children: JSX.Element[],
    type1: T1,
    type2: T2,
    type3: T3
): [JSX.Element[], ElementWithProps<T1>[], ElementWithProps<T2>[], ElementWithProps<T3>[], ElementWithProps<T4>[]]
export function groupChildren<
    T1 extends ComponentClass<any> | FunctionComponent<any>,
    T2 extends ComponentClass<any> | FunctionComponent<any>,
    T3 extends ComponentClass<any> | FunctionComponent<any>,
    T4 extends ComponentClass<any> | FunctionComponent<any>,
    T5 extends ComponentClass<any> | FunctionComponent<any>
>(
    children: JSX.Element[],
    type1: T1,
    type2: T2,
    type3: T3
): [
    JSX.Element[],
    ElementWithProps<T1>[],
    ElementWithProps<T2>[],
    ElementWithProps<T3>[],
    ElementWithProps<T4>[],
    ElementWithProps<T5>[]
]
export function groupChildren(children: JSX.Element[], ...types: any[]): ReactElement<any>[][] {
    const results = types.reduce<Map<string | JSXElementConstructor<any>, Array<ReactElement>>>((acc, type) => {
        acc.set(type, []);
        return acc;
    }, new Map<string | JSXElementConstructor<any>, Array<ReactElement>>())
    const others = [];
    for (const child of children) {
        // const index = types.findIndex(type => {
        if (isReactElement(child) && results.has(child.type)) {
            results.get(child.type)!.push(child);
            // return true
        } else {
            others.push(child);
        }
            // return false
        // })
        // const array = [...(results[index + 1] || []), child]
        // results[index + 1] = array
    }

    return [others, ...types.map(item => results.get(item) || [])];
}
