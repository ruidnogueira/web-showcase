import { Chance } from 'chance';
import { interpret } from 'xstate';
import { createFetchMachine, FetchMachineEventType, FetchMachineStateValue } from './fetchMachine';

const chance = new Chance('fetchMachine');

test('sets machine id', () => {
  const id = chance.word();
  const machine = createFetchMachine({
    id,
    fetcher: jest.fn(),
  });

  expect(machine.id).toBe(id);
});

describe(`${FetchMachineStateValue.Pending}`, () => {
  test('calls provided fetcher', () => {
    const fetchMock = jest.fn();

    const machine = createFetchMachine({
      id: 'fetchTest',
      fetcher: fetchMock,
    });

    const service = interpret(machine).start();

    service.send({ type: FetchMachineEventType.Fetch });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe(`${FetchMachineStateValue.Success}`, () => {
  function setup() {
    const machine = createFetchMachine({
      id: 'fetchTest',
      fetcher: jest.fn(),
    });

    const service = interpret(machine).start();

    return { service };
  }

  test('reaches state', () => {
    const { service } = setup();

    service.send({ type: FetchMachineEventType.Fetch });
    service.send({ type: FetchMachineEventType.ReceiveDataSuccess, data: undefined });

    expect(service.state.matches(FetchMachineStateValue.Success)).toBe(true);
  });

  test('sets response data', () => {
    const response = chance.sentence();
    const { service } = setup();

    service.send({ type: FetchMachineEventType.Fetch });
    service.send({ type: FetchMachineEventType.ReceiveDataSuccess, data: response });

    expect(service.state.context.data).toBe(response);
  });

  test('clears response error', () => {
    const error = new Error();
    const { service } = setup();

    service.send({ type: FetchMachineEventType.Fetch });
    service.send({ type: FetchMachineEventType.ReceiveDataFailure, data: error });
    service.send({ type: FetchMachineEventType.Fetch });
    service.send({ type: FetchMachineEventType.ReceiveDataSuccess, data: undefined });

    expect(service.state.context.error).toBeUndefined();
  });
});

describe(`${FetchMachineStateValue.Failure}`, () => {
  function setup() {
    const machine = createFetchMachine({
      id: 'fetchTest',
      fetcher: jest.fn(),
    });

    const service = interpret(machine).start();

    return { service };
  }

  test('reaches state', () => {
    const { service } = setup();

    service.send({ type: FetchMachineEventType.Fetch });
    service.send({ type: FetchMachineEventType.ReceiveDataFailure, data: new Error() });

    expect(service.state.matches(FetchMachineStateValue.Failure)).toBe(true);
  });

  test('sets response error', () => {
    const error = new Error();
    const { service } = setup();

    service.send({ type: FetchMachineEventType.Fetch });
    service.send({ type: FetchMachineEventType.ReceiveDataFailure, data: error });

    expect(service.state.context.error).toBe(error);
  });
});
