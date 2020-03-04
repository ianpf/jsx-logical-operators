import React, { ReactChild, FunctionComponent } from 'react'
import { Many } from '../utility-types'

export interface DefaultProps {
    children: Many<ReactChild>
}

export const Default: FunctionComponent<DefaultProps> = ({ children }) => {
    return <>{children}</>
}
