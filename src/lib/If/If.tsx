import React, { FunctionComponent } from 'react'
import { groupChildren, wrapChildren } from '../children-helpers'
import { Else } from './Else'
import { ElseIf } from './ElseIf'
import { Then } from './Then'

export interface IfProps {
  condition: boolean
}

export const If: FunctionComponent<IfProps> = ({ condition, children }) => {
  const [others, thenClauses, elseClauses, elseIfClauses] = groupChildren(wrapChildren(children), Then, Else, ElseIf)
  if (condition) {
    return <>{thenClauses.length >= 1 ? thenClauses[0] : others}</>
  }
  if (elseIfClauses) {
    const elseIf = elseIfClauses.find(item => item.props.condition)
    if (elseIf) {
      return <>{elseIf}</>
    }
  }
  if (elseClauses && elseClauses.length > 0) {
    return <>{elseClauses[0]}</>
  }
  return <></>
}
