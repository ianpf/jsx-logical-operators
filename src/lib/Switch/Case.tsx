import React, { FunctionComponent } from 'react'

export interface CaseProps {
  when: string | number | object | boolean | ((value: string | object | number) => boolean)
}

export const Case: FunctionComponent<CaseProps> = ({ children }) => {
  return <>{children}</>
}
