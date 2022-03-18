import { IReduxState } from 'state/types';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

interface IByUid<T> {
  [key: string]: T;
}

type TDispatch = ThunkDispatch<IReduxState, void, AnyAction>;

type TGetState = () => IReduxState;

type TThunk = ThunkAction<void, IReduxState, unknown, AnyAction>;
