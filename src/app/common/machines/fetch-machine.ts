import { InvokeCreator, ContextFrom, EventFrom, ExtractEvent } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { fixModelEventNames } from '../utils/machine.util';

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
        error?: undefined;
      };
    }
  | {
      value: FetchMachineStateValue.Failure;
      context: {
        data?: ResponseData;
        error: ResponseError;
      };
    };

export function createFetchModel<
  RequestData = DefaultRequestData,
  ResponseData = DefaultResponseData,
  ResponseError = DefaultResponseError
>() {
  const fetchModel = createModel({} as FetchMachineContext<ResponseData, ResponseError>, {
    events: {
      fetch: (data: RequestData) => ({ data }),
      receiveDataSuccess: (data: ResponseData) => ({ data }),
      receiveDataFailure: (data: ResponseError) => ({ data }),
    },
  });

  fixModelEventNames(fetchModel.events);

  const assignData = fetchModel.assign(
    (_, event) => ({
      data: event.data,
    }),
    'receiveDataSuccess'
  );

  const assignError = fetchModel.assign(
    (_, event) => ({
      error: event.data,
    }),
    'receiveDataFailure'
  );

  const clearError = fetchModel.assign((_) => ({
    error: undefined,
  }));

  const createFetchMachine = (config: {
    id: string;
    fetcher: InvokeCreator<
      ContextFrom<typeof fetchModel>,
      ExtractEvent<EventFrom<typeof fetchModel>, 'fetch'>,
      FetchMachineState<ResponseData, ResponseError>
    >;
  }) =>
    fetchModel.createMachine({
      id: config.id,
      context: fetchModel.initialContext,
      initial: FetchMachineStateValue.Idle,
      states: {
        [FetchMachineStateValue.Idle]: {
          on: {
            fetch: FetchMachineStateValue.Pending,
          },
        },

        [FetchMachineStateValue.Pending]: {
          on: {
            fetch: FetchMachineStateValue.Pending,
            receiveDataSuccess: {
              target: FetchMachineStateValue.Success,
              actions: [assignData, clearError],
            },
            receiveDataFailure: {
              target: FetchMachineStateValue.Failure,
              actions: assignError,
            },
          },
          invoke: {
            src: (context, event, meta) =>
              event.type === 'fetch' ? config.fetcher(context, event, meta) : () => {},
          },
        },

        [FetchMachineStateValue.Success]: {
          on: {
            fetch: FetchMachineStateValue.Pending,
          },
        },

        [FetchMachineStateValue.Failure]: {
          on: {
            fetch: FetchMachineStateValue.Pending,
          },
        },
      },
    });

  return { fetchModel, createFetchMachine };
}
