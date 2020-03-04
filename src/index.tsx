import React, { useState, SyntheticEvent, useCallback } from 'react'
import { render } from 'react-dom'
import { If, Else, Switch, Case, Default, Then, ElseIf } from './lib'

const App = () => {
  const [someCondition, someConditionChange] = useState(true)
  const [someOtherCondition, someOtherConditionChange] = useState(false)
  const [someValue, someValueChange] = useState('')
  const someConditionCb = useCallback(
    (ev: SyntheticEvent<HTMLInputElement>) => someConditionChange(ev.currentTarget.checked),
    [],
  )
  const someOtherConditionCb = useCallback(
    (ev: SyntheticEvent<HTMLInputElement>) => someOtherConditionChange(ev.currentTarget.checked),
    [],
  )
  const someValueCb = useCallback((ev: SyntheticEvent<HTMLInputElement>) => someValueChange(ev.currentTarget.value), [])
  return (
    <div>
      <div>
        <label>
          someCondition
          <input type="checkbox" checked={someCondition} onClick={someConditionCb} />
        </label>
      </div>
      <div>
        <label>
          someOtherCondition
          <input type="checkbox" checked={someOtherCondition} onClick={someOtherConditionCb} />
        </label>
      </div>
      <div>
        <label>
          someValue
          <input value={someValue} onClick={someValueCb} />
        </label>
      </div>
      <div>
        <If simple condition={someCondition}>
          Show me if someCondition is true!
        </If>
      </div>
      <div>
        <If condition={someCondition}>
          <Then>Show me if someCondition is true!</Then>
          <ElseIf condition={someOtherCondition}>
            Show me if someCondition is false and someOtherCondition is true!
          </ElseIf>
          <Else>Show me if neither someCondition nor someOtherCondition are true!</Else>
        </If>
      </div>
      <div>
        <Switch on={someValue}>
          <Case when="A">Show me when someValue is A!</Case>
          <Case when="B">Show me when someValue is B!</Case>
          <Default>Show me if the value is not A or B!</Default>
        </Switch>
      </div>
      <div>
        <Switch>
          <Case when={someCondition}>
            <div>Show me when someCondition is true!</div>
          </Case>
          <Case when={someOtherCondition}>
            <div>Show me when someCondition is false and someOtherCondition is true!</div>
          </Case>
        </Switch>
      </div>
      <div>
        <Switch on={someValue}>
          <Case when={val => typeof val === 'string' && val?.startsWith('A')}>
            Show me when the value starts with A!
          </Case>
          <Case when={val => typeof val === 'string' && val?.startsWith('B')}>
            Show me when the value starts with B!
          </Case>
        </Switch>
      </div>
      <div>
        <Switch>
          <Case when={() => someCondition}>Show me when someCondition is true!</Case>
        </Switch>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
