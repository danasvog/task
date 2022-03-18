import React from 'react';

interface IWithConditionalComponent {
  isVisible: boolean;
}

export type TWithHideableProp<T> = T & IWithConditionalComponent;

function hideable<T>(Component: React.ElementType) {
  return function withConditionalComponent({
    isVisible,
    ...props
  }: IWithConditionalComponent & T) {
    if (!isVisible) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default hideable;
