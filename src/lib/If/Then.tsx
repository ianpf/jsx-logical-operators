import React, { FunctionComponent, ReactChild } from 'react'
import { Many } from '../utility-types'

interface ThenProps {
  children?: Many<ReactChild>
}

export const Then: FunctionComponent<ThenProps> = ({ children }) => <>{children}</>
