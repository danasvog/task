import { Reducer } from 'react';
import { AnyAction } from 'redux';

const resetReducer =
  <T>(type: string[] | string, reducer: Reducer<any, any>) =>
  (state: T | undefined, action: AnyAction) => {
    const shouldReset =
      Array.isArray(type) && type.some((val) => action.type === val);

    if (action.type === type || shouldReset) {
      state = undefined; // state should be defined as undefined
    }

    return reducer(state, action);
  };

export default resetReducer;
