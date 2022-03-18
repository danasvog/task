import { Reducer } from 'react';
import { AnyAction } from 'redux';

const resetReducer =
  <T>(type: string[], reducer: Reducer<T | undefined, AnyAction>) =>
  (state: T | undefined, action: AnyAction) => {
    const shouldReset =
      Array.isArray(type) && type.some((val) => action.type === val);

    return reducer(shouldReset ? undefined : state, action);
  };

export default resetReducer;
