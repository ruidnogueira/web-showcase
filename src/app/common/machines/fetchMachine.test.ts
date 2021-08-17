import { Chance } from 'chance';
import { interpret } from 'xstate';
import { createFetchModel, FetchMachineStateValue } from './fetchMachine';

const chance = new Chance('fetchMachine');

test('sets machine id', () => {
  const id = chance.word();

  const { createFetchMachine } = createFetchModel();
  const machine = createFetchMachine({
    id,
    fetcher: jest.fn(),
  });

  expect(machine.id).toBe(id);
});

describe(`${FetchMachineStateValue.Pending}`, () => {
  test('calls provided fetcher', () => {
    const fetchMock = jest.fn();

    const { fetchModel, createFetchMachine } = createFetchModel();
    const machine = createFetchMachine({
      id: 'fetchTest',
      fetcher: fetchMock,
    });

    const service = interpret(machine).start();

    service.send(fetchModel.events.fetch(undefined));

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe(`${FetchMachineStateValue.Success}`, () => {
  function setup() {
    const { fetchModel, createFetchMachine } = createFetchModel();
    const machine = createFetchMachine({
      id: 'fetchTest',
      fetcher: jest.fn(),
    });

    const service = interpret(machine).start();

    return { fetchModel, service };
  }

  test('reaches state', () => {
    const { fetchModel, service } = setup();

    service.send(fetchModel.events.fetch(undefined));
    service.send(fetchModel.events.receiveDataSuccess(undefined));

    expect(service.state.matches(FetchMachineStateValue.Success)).toBe(true);
  });

  test('sets response data', () => {
    const response = chance.sentence();
    const { fetchModel, service } = setup();

    service.send(fetchModel.events.fetch(undefined));
    service.send(fetchModel.events.receiveDataSuccess(response));

    expect(service.state.context.data).toBe(response);
  });

  test('clears response error', () => {
    const error = new Error();
    const { fetchModel, service } = setup();

    service.send(fetchModel.events.fetch(undefined));
    service.send(fetchModel.events.receiveDataFailure(error));
    service.send(fetchModel.events.fetch(undefined));
    service.send(fetchModel.events.receiveDataSuccess(undefined));

    expect(service.state.context.error).toBeUndefined();
  });
});

describe(`${FetchMachineStateValue.Failure}`, () => {
  function setup() {
    const { fetchModel, createFetchMachine } = createFetchModel();
    const machine = createFetchMachine({
      id: 'fetchTest',
      fetcher: jest.fn(),
    });

    const service = interpret(machine).start();

    return { fetchModel, service };
  }

  test('reaches state', () => {
    const { fetchModel, service } = setup();

    service.send(fetchModel.events.fetch(undefined));
    service.send(fetchModel.events.receiveDataFailure(new Error()));

    expect(service.state.matches(FetchMachineStateValue.Failure)).toBe(true);
  });

  test('sets response error', () => {
    const error = new Error();
    const { fetchModel, service } = setup();

    service.send(fetchModel.events.fetch(undefined));
    service.send(fetchModel.events.receiveDataFailure(error));

    expect(service.state.context.error).toBe(error);
  });
});
