# jsx-logical-operators

## This may negatively impact performance for a react app, as it increases the size of the tree that needs to be diffed/rendered by React, and does not truncate the component tree below it in the same way as a ternary would.

That being said, personally I find this kind of declarative logic to be much easier to read in React code than ternaries, or even in many cases separated functions.

# If

### Simple

```tsx
<If condition={someCondition}>
  Show me if someCondition is true!
</If>
```

### Complex

```tsx
<If condition={someCondition}>
  <Then>Show me if someCondition is true!</Then>
  <ElseIf condition={someOtherCondition}>Show me if someCondition is false and someOtherCondition is true!</ElseIf>
  <Else>Show me if neither someCondition nor someOtherCondition are true!</Else>
</If>
```

## Switch

### Standard - Value Based

NOTE: Fall-through is not supported at this time.

```tsx
<Switch on={someValue}>
  <Case when="A">Show me when someValue is A!</Case>
  <Case when="B">Show me when someValue is B!</Case>
  <Default>Show me if the value is not A or B!</Default>
</Switch>
```

### Standard - Value Irrespective

```tsx
<Switch>
  <Case when={someCondition}>Show me when someCondition is true!</Case>
  <Case when={someOtherCondition}>Show me when someCondition is false and someOtherCondition is true!</Case>
</Switch>
```

### Function Support - Value Based

```tsx
<Switch on={someValue}>
  <Case when={val => val?.startsWith('A')}>Show me when the value starts with A!</Case>
  <Case when={val => val?.startsWith('B')}>Show me when the value starts with B!</Case>
</Switch>
```

### Function Support - Value Irrespective

```tsx
<Switch>
  <Case when={() => someCondition}>Show me when someCondition is true!</Case>
</Switch>
```
