import * as React from 'react';

export type Many<T> = T | T[];

export interface IfProps {
    condition: boolean;
    children: Many<React.ReactChild>;
}

interface GroupedIfElsesChildren {
    standard: React.ReactNode[];
    elseIfClauses?: (React.SFC & {props: ElseIfProps})[];
    elseClauses: (React.SFC & {props: ElseProps})[];
}

function isElseChild(child: React.ReactNode): child is (React.SFC & {props: ElseProps}) {
    return typeof child === 'object' && child != null && 'type' in child && child.type === Else;
}

function isElseIfChild(child: React.ReactNode): child is (React.SFC & {props: ElseIfProps}) {
    return typeof child === 'object' && child != null && 'type' in child && child.type === ElseIf;
}

function groupChildren(children: JSX.Element[]): GroupedIfElsesChildren {
    const childrenArray = React.Children.toArray(children);
    const standard = childrenArray.filter(item => !isElseChild(item) && !isElseIfChild(item));
    const elseIfClauses = childrenArray.filter(isElseIfChild);
    const elseClauses = childrenArray.filter(isElseChild);

    return {
        standard,
        elseIfClauses,
        elseClauses
    };
}

export const If: React.SFC<IfProps> = ({condition, children}) => {
    const childrenArray = (Array.isArray(children) ? children : [children]) as JSX.Element[];
    const {standard, elseClauses, elseIfClauses} = groupChildren(childrenArray);
    if (condition) {
        return <>{standard}</>;
    }
    if (elseIfClauses) {
        const elseIf = elseIfClauses.find(item => item.props.condition);
        if (elseIf) {
            return <>{elseIf}</>;
        }
    }
    if (elseClauses && elseClauses.length > 0) {
        return <>{elseClauses[0]}</>;
    }
    return <></>
}

interface ElseIfProps {
    condition: boolean;
    children: Many<React.ReactChild>;
}

export const ElseIf: React.SFC<ElseIfProps> = ({children}) => {
    return <>{children}</>;
}

interface ElseProps {
    children: Many<React.ReactChild>;
}

export const Else: React.SFC<ElseProps> = ({children}) => {
    return <>{children}</>
}