import * as React from 'react';
import { Many } from "../utility-types"

export interface ElseProps {
    children: Many<React.ReactChild>;
}

export const Else: React.SFC<ElseProps> = ({children}) => {
    return <>{children}</>
}