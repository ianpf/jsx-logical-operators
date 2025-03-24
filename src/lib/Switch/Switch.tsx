import React, { FunctionComponent, PropsWithChildren } from 'react'
import { Case } from './Case'
import { groupChildren, wrapChildren } from '../children-helpers'
import { Default } from './Default'

export interface SwitchProps extends PropsWithChildren {
  /**
   * If provided, this will be tested for equality using triple equals, so in the case of objects it will be _referential equality_.
   * If this is not provided, then the case statements will be tested for "truthiness" if values are provided, and will be executed if functions are provided,
   */
  on?: string | number | object | null
}

export const Switch: FunctionComponent<SwitchProps> = ({ children, on }) => {
  const [, cases, defaults] = groupChildren(wrapChildren(children), Case, Default)
  return (
    cases.find(({ props: { when } }) => {
      return (typeof when === 'function' && when(on)) || when === on
    }) ||
    defaults[0] || <></>
  )
}
