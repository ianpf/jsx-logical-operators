import React, { FunctionComponent, PropsWithChildren } from 'react'

export interface ElseIfProps extends PropsWithChildren {
  condition: boolean
}

export const ElseIf: FunctionComponent<ElseIfProps> = ({ children }) => {
  return <>{children}</>
}
