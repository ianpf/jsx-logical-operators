import React, {ReactElement, FC} from 'react';

interface AwaitProps<T> {
  on: Promise<T>;
  children: (result: T) => ReactElement;
  error?: (error: any) => ReactElement;
  fallback?: ReactElement;
}

interface Await extends FC {}

export const Await: FC<AwaitProps<any>> = function <T>(props: AwaitProps<T>) {
  const [{error, result, resolution}, resolutionChange] = React.useState<{error?: any, result?: T, resolution: 'pending' | 'resolved' | 'rejected'}>({resolution: 'pending'});
  React.useEffect(() => {
    resolutionChange({resolution: 'pending'});
    props.on.then((result) => {
      resolutionChange({resolution: 'resolved', result});
    }).catch((error) => {
      resolutionChange({resolution: 'rejected', error});
    });
  }, [props.on]);
  if (resolution === 'resolved') {
    return props.children(result!);
  } else if (resolution === 'rejected') {
    return props.error?.(error) || null;
  } else {
    return props.fallback || null;
  }
}
