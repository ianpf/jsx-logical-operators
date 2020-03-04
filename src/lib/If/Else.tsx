import React, { ReactChild, FunctionComponent } from 'react'
import { Many } from '../utility-types'

export interface ElseProps {
    children?: Many<ReactChild>
}

export const Else: FunctionComponent<ElseProps> = ({ children }) => {
    return <>{children}</>
}
