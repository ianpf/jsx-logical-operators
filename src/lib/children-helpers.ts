
import { Else } from "./If";
import { Children } from 'react';
import { ElseIfProps, ElseIf } from "./If/ElseIf";
import { ElseProps } from "./If/Else";
interface GroupedIfElsesChildren {
    standard: React.ReactNode[];
    elseIfClauses?: (React.Component & {props: ElseIfProps})[];
    elseClauses: (React.Component & {props: ElseProps})[];
}

function childComponentGuard<T extends (...args: any[]) => any, TProps>(childType: T): (child: React.ReactNode) => child is (React.Component & {props: TProps}) {
    return ((child) => {
        return typeof child === 'object' && child != null && 'type' in child && child.type === childType;
    }) as (child: React.ReactNode) => child is (React.Component & {props: TProps});
}

const isElseComponent = childComponentGuard<typeof Else, ElseProps>(Else);
const isElseIfComponent = childComponentGuard<typeof ElseIf, ElseIfProps>(ElseIf); 

export function groupChildren(children: JSX.Element[]): GroupedIfElsesChildren {
    const childrenArray = Children.toArray(children);
    const standard = childrenArray.filter(item => !isElseComponent(item) && !isElseIfComponent(item));
    const elseIfClauses = childrenArray.filter(isElseIfComponent);
    const elseClauses = childrenArray.filter(isElseComponent);

    return {
        standard,
        elseIfClauses,
        elseClauses
    };
}