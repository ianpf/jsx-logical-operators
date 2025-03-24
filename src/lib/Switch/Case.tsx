import React, { FunctionComponent, PropsWithChildren } from 'react'

export interface CaseProps extends PropsWithChildren {
  when: string | number | object | boolean | ((value?: string | object | number | null) => boolean)
}

export const Case: FunctionComponent<CaseProps> = ({ children }) => {
  return <>{children}</>
}
