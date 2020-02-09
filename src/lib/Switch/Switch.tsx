import * as React from 'react';
import { Many } from "../utility-types";
import { CaseProps } from './Case';

export interface SwitchProps {
    /**
     * If provided, this will be tested for equality using triple equals, so in the case of objects it will be _referential equality_.
     * If this is not provided, then the case statements will be tested for "truthiness" if values are provided, and will be executed if functions are provided, 
     */
    on?: string | number | object;
    children: Many<React.ReactElement<CaseProps>>
}

export const Switch: React.SFC<SwitchProps> = (props) => {
    return <>{props.children}</>;
}