import * as React from 'react';
import { Many } from '../utility-types';
import { groupChildren } from '../children-helpers';

export interface IfProps {
    condition: boolean;
    children: Many<React.ReactChild>;
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