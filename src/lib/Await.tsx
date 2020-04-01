import React, {ReactElement} from 'react';

interface AwaitProps<T> {
  on: Promise<T>;
  children: (result: T) => ReactElement;
  fallback: ReactElement;
}

export function Await<T>(props: AwaitProps<T>) {
  const [{result, resolved}, resolutionChange] = React.useState<{result: T | undefined, resolved: boolean}>({resolved: false, result: undefined});
  React.useEffect(() => {
    resolutionChange({resolved: false, result: undefined});
    props.on.then((result) => {
      resolutionChange({resolved: true, result});
    });
  }, [props.on]);
  if (resolved) {
    return props.children(result!);
  } else {
    return props.fallback;
  }
}
