import { createMachine, assign, InvokeCreator, StateMachine } from 'xstate';

type DefaultRequestData = unknown;
type DefaultResponseData = unknown;
type DefaultResponseError = Error;

export type FetchMachineContext<
  ResponseData = DefaultResponseData,
  ResponseError = DefaultResponseError
> = {
  data?: ResponseData;
  error?: ResponseError;
};

export enum FetchMachineEventType {
  Fetch = 'FETCH',
  ReceiveDataSuccess = 'RECEIVE_DATA_SUCCESS',
  ReceiveDataFailure = 'RECEIVE_DATA_ERROR',
}

export type FetchMachineEvent<
  RequestData = DefaultRequestData,
  ResponseData = DefaultResponseData,
  ResponseError = DefaultResponseError
> =
  | FetchEvent<RequestData>
  | ReceiveDataSuccessEvent<ResponseData>
  | ReceiveDataFailureEvent<ResponseError>;

interface FetchEvent<RequestData> {
  type: FetchMachineEventType.Fetch;
  data?: RequestData;
}

interface ReceiveDataSuccessEvent<ResponseData> {
  type: FetchMachineEventType.ReceiveDataSuccess;
  data: ResponseData;
}

interface ReceiveDataFailureEvent<ResponseError> {
  type: FetchMachineEventType.ReceiveDataFailure;
  data: ResponseError;
}

export enum FetchMachineStateValue {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Failure = 'failure',
}

export type FetchMachineState<ResponseData, ResponseError> =
  | {
      value: FetchMachineStateValue.Idle;
      context: {};
    }
  | {
      value: FetchMachineStateValue.Pending;
      context: {
        data?: ResponseData;
        error?: ResponseError;
      };
    }
  | {
      value: FetchMachineStateValue.Success;
      context: {
        data: ResponseData;
      };
    }
  | {
      value: FetchMachineStateValue.Failure;
      context: {
        data?: ResponseData;
        error: ResponseError;
      };
    };

export type FetchMachine<RequestData, ResponseData, ResponseError> = StateMachine<
  FetchMachineContext<ResponseData, ResponseError>,
  any,
  FetchMachineEvent<RequestData, ResponseData, ResponseError>,
  FetchMachineState<ResponseData, ResponseError>
>;

export function createFetchMachine<
  RequestData = DefaultRequestData,
  ResponseData = DefaultResponseData,
  ResponseError = DefaultResponseError
>(config: {
  id: string;
  fetcher: InvokeCreator<
    FetchMachineContext<ResponseData, ResponseError>,
    FetchEvent<RequestData>,
    FetchMachineState<ResponseData, ResponseError>
  >;
}): FetchMachine<RequestData, ResponseData, ResponseError> {
  const assignData = assign((_: any, event: { data: ResponseData }) => ({
    data: event.data,
  }));

  const assignError = assign((_: any, event: { data: ResponseError }) => ({
    error: event.data,
  }));

  const clearError = assign(() => ({
    error: undefined,
  }));

  return createMachine({
    id: config.id,
    initial: FetchMachineStateValue.Idle,
    context: {},
    states: {
      [FetchMachineStateValue.Idle]: {
        on: {
          [FetchMachineEventType.Fetch]: FetchMachineStateValue.Pending,
        },
      },

      [FetchMachineStateValue.Pending]: {
        on: {
          [FetchMachineEventType.Fetch]: FetchMachineStateValue.Pending,
          [FetchMachineEventType.ReceiveDataSuccess]: {
            target: FetchMachineStateValue.Success,
            actions: [assignData, clearError],
          },
          [FetchMachineEventType.ReceiveDataFailure]: {
            target: FetchMachineStateValue.Failure,
            actions: assignError,
          },
        },
        invoke: {
          src: (context, event, meta) =>
            event.type === FetchMachineEventType.Fetch
              ? config.fetcher(context, event, meta)
              : () => {},
          onError: {
            target: FetchMachineStateValue.Failure,
            actions: assignError,
          },
        },
      },

      [FetchMachineStateValue.Success]: {
        on: {
          [FetchMachineEventType.Fetch]: FetchMachineStateValue.Pending,
        },
      },

      [FetchMachineStateValue.Failure]: {
        on: {
          [FetchMachineEventType.Fetch]: FetchMachineStateValue.Pending,
        },
      },
    },
  });
}
