import React, { useState, SyntheticEvent, useCallback } from 'react'
import { render } from 'react-dom'
import { If, Else, Switch, Case, Default, Then, ElseIf, Await } from './lib'

const App = () => {
  const [someCondition, someConditionChange] = useState(true)
  const [someOtherCondition, someOtherConditionChange] = useState(false)
  const [someValue, someValueChange] = useState('')
  const [promise, promiseChange] = useState(Promise.resolve('initial state'))
  const someConditionCb = useCallback(
    (ev: SyntheticEvent<HTMLInputElement>) => someConditionChange(ev.currentTarget.checked),
    [],
  )
  const someOtherConditionCb = useCallback(
    (ev: SyntheticEvent<HTMLInputElement>) => someOtherConditionChange(ev.currentTarget.checked),
    [],
  )
  const resolvePromiseCb = useCallback(
    () => promiseChange(new Promise(resolve => setTimeout(() => resolve('resolved'), 3000))),
    [],
  )
  const rejectPromiseCb = useCallback(
    () => promiseChange(new Promise((_resolve, reject) => setTimeout(() => reject(new Error('rejected')), 3000))),
    [],
  )
  const someValueCb = useCallback((ev: SyntheticEvent<HTMLInputElement>) => someValueChange(ev.currentTarget.value), [])
  return (
    <div>
      <div>
        <label>
          someCondition
          <input type="checkbox" checked={someCondition} onChange={someConditionCb} />
        </label>
      </div>
      <div>
        <label>
          someOtherCondition
          <input type="checkbox" checked={someOtherCondition} onChange={someOtherConditionCb} />
        </label>
      </div>
      <div>
        <label>
          someValue
          <input value={someValue} onChange={someValueCb} />
        </label>
      </div>
      <div>
        <If condition={someCondition}>Show me if someCondition is true!</If>
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
          <Case when={val => typeof val === 'string' && val?.match(/A/i)}>Show me when the value starts with A!</Case>
          <Case when={val => typeof val === 'string' && val?.match(/B/i)}>Show me when the value starts with B!</Case>
        </Switch>
      </div>
      <div>
        <Switch>
          <Case when={() => someCondition}>Show me when someCondition is true!</Case>
        </Switch>
      </div>
      <div>
        <button onClick={resolvePromiseCb}>Resolve after 3 seconds</button>
        <button onClick={rejectPromiseCb}>Reject after 3 seconds</button>
        <Await
          on={promise}
          fallback={<span> Pending </span>}
          error={err => <span> Rejected with: {err.message} </span>}
        >
          {result => <span> Resolved with: {result} </span>}
        </Await>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
