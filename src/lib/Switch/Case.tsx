import React, { ReactChild, FunctionComponent } from 'react'
import { Many } from '../utility-types'

export interface CaseProps {
  when: string | number | object | boolean | ((value: string | object | number) => boolean)
  children: Many<ReactChild>
}

export const Case: FunctionComponent<CaseProps> = ({ children }) => {
  return <>{children}</>
}
