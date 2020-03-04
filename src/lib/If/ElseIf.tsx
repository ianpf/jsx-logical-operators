import React, {FunctionComponent} from 'react'
import { Many } from '../utility-types'

export interface ElseIfProps {
    condition: boolean
    children?: Many<React.ReactChild>
}

export const ElseIf: FunctionComponent<ElseIfProps> = ({ children }) => {
    return <>{children}</>
}
