import React from 'react';
import { render } from "react-dom";
import { If, ElseIf } from './lib/If';
import { Else } from './lib/If';

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
    <If condition={true}>
      <div>
        True
      </div>
      <Else>
        False
      </Else>
    </If>
    <If condition={true}>
      condition 1
      <ElseIf condition={true}>
        condition 2
      </ElseIf>
      <ElseIf condition={true}>
        condition 3
      </ElseIf>
    </If>
  </div>
);

render(<App />, document.getElementById("root"));
