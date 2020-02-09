import React from 'react';
import { render } from 'react-dom';
import { Switch } from './lib/Switch/Switch';
import { Case } from './lib/Switch/Case';

const App = () => 
    <div>
            <If condition={true}>
      <div>
        True
      </div>
      <Else>
        False
      </Else>
    </If>
        <Switch on={'a'}>
            <Case when={'a'}>
                Whatever nerd
            </Case>
            <Case when="b">
                Whatever geek
            </Case>
            <Case when="c">
                Whatever boomer
            </Case>
        </Switch>
    </div>

render(<App />, document.getElementById('root'));
