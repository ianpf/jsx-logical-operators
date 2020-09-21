import React, { ReactElement, FC } from 'react'

interface AwaitProps<T> {
  on: Promise<T>
  children: (result: T) => ReactElement
  error?: (error: any) => ReactElement
  fallback?: ReactElement
}

interface Await<T> extends FC<AwaitProps<T>> {}

export function Await<T>(props: AwaitProps<T>) {
  const [{ error, result, resolution }, resolutionChange] = React.useState<{
    error?: any
    result?: T
    resolution: 'pending' | 'resolved' | 'rejected'
  }>({ resolution: 'pending' })
  React.useEffect(() => {
    let mounted = true;
    resolutionChange({ resolution: 'pending' })
    props.on
      .then(result => {
        if (mounted) resolutionChange({ resolution: 'resolved', result })
      }, error => {
        if (mounted) resolutionChange({ resolution: 'rejected', error })
      })
    return () => {
      let mounted = false;
    }
  }, [props.on])
  if (resolution === 'resolved') {
    return props.children(result!)
  } else if (resolution === 'rejected') {
    return props.error?.(error) || null
  } else {
    return props.fallback || null
  }
}
