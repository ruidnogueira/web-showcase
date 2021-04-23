import { createMachine, assign, InvokeCreator } from 'xstate';

export type FetchMachineContext<ResponseData, ResponseError> = {
  data?: ResponseData;
  error?: ResponseError;
};

export enum FetchMachineEventType {
  Fetch = 'FETCH',
  ReceiveDataSuccess = 'RECEIVE_DATA_SUCCESS',
  ReceiveDataFailure = 'RECEIVE_DATA_ERROR',
}

export type FetchMachineEvent<RequestData, ResponseData, ResponseError> =
  | {
      type: FetchMachineEventType.Fetch;
      data: RequestData;
    }
  | {
      type: FetchMachineEventType.ReceiveDataSuccess;
      data: ResponseData;
    }
  | {
      type: FetchMachineEventType.ReceiveDataFailure;
      data: ResponseError;
    };

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

export enum FetchMachineService {
  FetchData = 'fetchData',
}

export enum FetchMachineAction {
  AssignData = 'assignData',
  AssignError = 'assignError',
}

export function createFetchMachine<
  RequestData = unknown,
  ResponseData = unknown,
  ResponseError = Error
>(config: {
  id: string;
  fetcher: InvokeCreator<
    FetchMachineContext<ResponseData, ResponseError>,
    FetchMachineEvent<RequestData, ResponseData, ResponseError>,
    FetchMachineState<ResponseData, ResponseError>
  >;
}) {
  return createMachine<
    FetchMachineContext<ResponseData, ResponseError>,
    FetchMachineEvent<RequestData, ResponseData, ResponseError>,
    FetchMachineState<ResponseData, ResponseError>
  >(
    {
      id: config.id,
      initial: FetchMachineStateValue.Idle,
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
              actions: FetchMachineAction.AssignData,
            },
            [FetchMachineEventType.ReceiveDataFailure]: {
              target: FetchMachineStateValue.Failure,
              actions: FetchMachineAction.AssignError,
            },
          },
          invoke: {
            src: FetchMachineService.FetchData,
            onDone: {
              target: FetchMachineStateValue.Success,
              actions: FetchMachineAction.AssignData,
            },
            onError: {
              target: FetchMachineStateValue.Failure,
              actions: FetchMachineAction.AssignError,
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
    },
    {
      services: {
        [FetchMachineService.FetchData]: config.fetcher,
      },
      actions: {
        [FetchMachineAction.AssignData]: assign((_, event) => {
          if (event.type !== FetchMachineEventType.ReceiveDataSuccess) {
            return {};
          }

          return {
            data: event.data,
            error: undefined,
          };
        }),
        [FetchMachineAction.AssignError]: assign((_, event) => {
          if (event.type !== FetchMachineEventType.ReceiveDataFailure) {
            return {};
          }

          return {
            error: event.data,
          };
        }),
      },
    }
  );
}
