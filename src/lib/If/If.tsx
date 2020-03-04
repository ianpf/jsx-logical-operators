import React, { ReactChild, FunctionComponent } from 'react'
import { Many } from '../utility-types'
import { groupChildren, wrapChildren } from '../children-helpers'
import { Else } from './Else'
import { ElseIf } from './ElseIf'
import { Then } from './Then'

export interface IfProps {
  condition: boolean
  children: Many<ReactChild>
  simple?: boolean
}

export const If: FunctionComponent<IfProps> = ({ condition, children, simple }) => {
  if (!simple) {
    const [, thenClauses, elseClauses, elseIfClauses] = groupChildren(wrapChildren(children), Then, Else, ElseIf)
    if (condition) {
      return <>{thenClauses}</>
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
  } else if (condition) {
    return <>{children}</>
  }
  return <></>
}

If.defaultProps = {
  simple: false,
}
