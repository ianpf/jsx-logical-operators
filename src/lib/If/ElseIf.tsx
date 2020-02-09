import * as React from 'react';
import { Many } from "../utility-types";

export interface ElseIfProps {
    condition: boolean;
    children: Many<React.ReactChild>;
}

export const ElseIf: React.SFC<ElseIfProps> = ({children}) => {
    return <>{children}</>;
}
