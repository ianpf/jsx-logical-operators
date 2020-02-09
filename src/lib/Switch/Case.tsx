import * as React from 'react';
import { Many } from "../utility-types";

export interface CaseProps {
    when: string | number | object | ((value: string | object | number) => boolean);
    children: Many<React.ReactChild>;
    default?: boolean;
}

export const Case: React.SFC<CaseProps> = ({children}) => {
    return <>{children}</>;
}

Case.defaultProps = {
    default: false
};
