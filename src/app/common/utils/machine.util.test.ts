import { createModel } from 'xstate/lib/model';
import { fixModelEventNames } from './machine.util';

test('fixModelEventNames', () => {
  const model = createModel(
    {},
    {
      events: {
        add: () => ({}),
        delete: () => ({}),
        update: () => ({}),
      },
    }
  );

  const events = fixModelEventNames(model.events);
  const result = Object.values(events).map((eventFn) => eventFn.name);

  expect(result).toEqual(expect.arrayContaining(['add', 'delete', 'update']));
});
