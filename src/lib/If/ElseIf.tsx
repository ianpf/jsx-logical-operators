import React, { FunctionComponent } from 'react'

export interface ElseIfProps {
  condition: boolean
}

export const ElseIf: FunctionComponent<ElseIfProps> = ({ children }) => {
  return <>{children}</>
}
