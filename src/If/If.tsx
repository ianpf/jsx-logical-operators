import * as React from 'react';

export interface IfProps {
    condition: boolean;
    children: React.ReactChildren;
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

function groupChildren(children: React.ReactChildren): GroupedIfElsesChildren {
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
    const {standard, elseClauses, elseIfClauses} = groupChildren(children);
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
    children: React.ReactChildren;
}

export const ElseIf: React.SFC<ElseIfProps> = ({children}) => {
    return <>{children}</>;
}

interface ElseProps {
    children: React.ReactChildren;
}

export const Else: React.SFC<ElseProps> = ({children}) => {
    return <>{children}</>
}