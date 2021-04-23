import { createMachine, assign, InvokeCreator, DoneInvokeEvent } from 'xstate';

export type FetchMachineContext<Data, Error> = {
  data?: Data;
  error?: Error;
};

export enum FetchMachineEventType {
  Fetch = 'FETCH',
}

export type FetchMachineEvent = {
  type: FetchMachineEventType.Fetch;
  data: any; // TODO CREATE MODEL
};

export enum FetchMachineStateValue {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Failure = 'failure',
}

export type FetchMachineState<Data, Error> =
  | {
      value: FetchMachineStateValue.Idle;
      context: {};
    }
  | {
      value: FetchMachineStateValue.Pending;
      context: {
        data?: Data;
        error?: Error;
      };
    }
  | {
      value: FetchMachineStateValue.Success;
      context: {
        data: Data;
      };
    }
  | {
      value: FetchMachineStateValue.Failure;
      context: {
        data?: Data;
        error: Error;
      };
    };

export enum FetchMachineService {
  FetchData = 'fetchData',
}

export function createFetchMachine<Data = unknown, ErrorType = Error>(
  fetcher: InvokeCreator<
    FetchMachineContext<Data, ErrorType>,
    FetchMachineEvent,
    FetchMachineState<Data, ErrorType>
  >
) {
  return createMachine<
    FetchMachineContext<Data, ErrorType>,
    FetchMachineEvent,
    FetchMachineState<Data, ErrorType>
  >(
    {
      id: 'fetch',
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
          },
          invoke: {
            src: FetchMachineService.FetchData,
            onDone: {
              target: FetchMachineStateValue.Success,
              actions: assign((_, event: DoneInvokeEvent<Data>) => ({
                data: event.data,
                error: undefined,
              })),
            },
            onError: {
              target: FetchMachineStateValue.Failure,
              actions: assign((_, event: DoneInvokeEvent<ErrorType>) => ({
                error: event.data,
              })),
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
        [FetchMachineService.FetchData]: fetcher,
      },
    }
  );
}
