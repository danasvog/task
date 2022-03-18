export interface IPayloadItem<T> {
  payload: T;
}

export interface IUidsPayload {
  uid: string;
}

export const updateSimpleValue = <T>(_state: T, { payload }: IPayloadItem<T>) =>
  payload;

export const addUids = <T>(
  state: T[],
  { payload = [] }: { payload: IUidsPayload[] }
) => [...state, ...payload.map(({ uid }) => uid)];

export const addByUid = <T, T2>(
  state: T,
  { payload = [] }: { payload: Array<T2 & IUidsPayload> }
) =>
  payload.reduce(
    (result, item) => ({
      ...result,
      [item.uid]: item,
    }),
    state
  );

export const updateByUid = <T, T2>(
  state: T,
  { payload }: { payload: Array<IUidsPayload & T2> }
) => ({
  ...state,
  [payload[0].uid]: payload[0],
});
