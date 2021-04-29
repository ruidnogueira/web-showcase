import { RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthMachineEventType, createAuthMachine } from 'app/core/auth/authMachine';
import { AuthMachineProvider } from 'app/core/auth/AuthMachineProvider';
import { storageKeys } from 'app/core/configs/storage.config';
import { renderWithProviders } from 'test/component.helper';
import { createMachine, interpret } from 'xstate';
import { LoginCard, LoginCardPresentationProps } from './LoginCard';
import Story, { Submitting, Default } from './LoginCard.stories';
import { createModel } from '@xstate/test';
import { mockUserEmail, mockUserPassword } from 'mocks/model/user.mock';
import { server } from 'mocks/server/server.mock';
import { handleLoginRequest } from 'mocks/server/handlers.mock';
import { context } from 'msw';

test.each([
  ['Default', Default],
  ['Submitting', Submitting],
])('renders %s story', (_, Component) => {
  const props = { ...Story.args, ...Component.args } as LoginCardPresentationProps;
  renderWithProviders(<Component {...props} />);
});

describe('plans', () => {
  enum TestEventType {
    SubmitValid = 'SUBMIT_VALID',
    SubmitUnauthorized = 'SUBMIT_UNAUTHORIZED',
    SubmitUnexpected = 'SUBMIT_UNEXPECTED',
    SubmitIncompleteData = 'SUBMIT_INCOMPLETE_DATA',
    LoadingEnded = 'LOADING_ENDED',
  }

  enum TestStateValue {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Unauthorized = 'unauthorized',
    Unexpected = 'unexpected',
    Invalid = 'invalid',
  }

  interface TestContext {
    renderResult: RenderResult;
    sendAuthEventSpy: jest.SpyInstance;
  }

  const testMachine = createMachine({
    id: 'test',
    initial: 'idle',
    states: {
      [TestStateValue.Idle]: {
        on: {
          [TestEventType.SubmitValid]: `${TestStateValue.Loading}.${TestStateValue.Success}`,
          [TestEventType.SubmitUnauthorized]: `${TestStateValue.Loading}.${TestStateValue.Unauthorized}`,
          [TestEventType.SubmitUnexpected]: `${TestStateValue.Loading}.${TestStateValue.Unexpected}`,
          [TestEventType.SubmitIncompleteData]: TestStateValue.Invalid,
        },

        meta: { test: () => {} },
      },

      [TestStateValue.Loading]: {
        states: {
          [TestStateValue.Success]: {
            on: { [TestEventType.LoadingEnded]: '#success' },

            meta: { test: () => {} },
          },

          [TestStateValue.Unauthorized]: {
            on: { [TestEventType.LoadingEnded]: '#invalid' },

            meta: { test: () => {} },
          },

          [TestStateValue.Unexpected]: {
            on: { [TestEventType.LoadingEnded]: '#unexpected' },

            meta: { test: () => {} },
          },
        },

        meta: {
          test: async () => {
            expect(await loadingSubmitQueries.find()).toBeInTheDocument();
          },
        },
      },

      [TestStateValue.Success]: {
        id: 'success',
        type: 'final',

        meta: {
          test: ({ sendAuthEventSpy }: TestContext) => {
            expect(sendAuthEventSpy).toHaveBeenCalledWith(
              expect.objectContaining({ type: AuthMachineEventType.Login })
            );

            expect(invalidLoginErrorMessageQueries.query()).toBeNull();
            expect(unexpectedErrorMessageQueries.query()).toBeNull();
          },
        },
      },

      [TestStateValue.Invalid]: {
        id: 'invalid',
        type: 'final',

        meta: {
          test: async ({ sendAuthEventSpy }: TestContext) => {
            expect(sendAuthEventSpy).not.toHaveBeenCalled();
            expect(await invalidLoginErrorMessageQueries.find()).toBeInTheDocument();
            expect(unexpectedErrorMessageQueries.query()).toBeNull();
          },
        },
      },

      [TestStateValue.Unexpected]: {
        id: 'unexpected',
        type: 'final',

        meta: {
          test: async ({ sendAuthEventSpy }: TestContext) => {
            expect(sendAuthEventSpy).not.toHaveBeenCalled();
            expect(invalidLoginErrorMessageQueries.query()).toBeNull();
            expect(await unexpectedErrorMessageQueries.find()).toBeInTheDocument();
          },
        },
      },
    },
  });

  const testModel = createModel<TestContext>(testMachine).withEvents({
    [TestEventType.SubmitValid]: {
      exec: async () => {
        userEvent.type(emailQueries.get(), mockUserEmail());
        userEvent.type(passwordQueries.get(), mockUserPassword());
        userEvent.click(submitQueries.get());
      },
    },

    [TestEventType.SubmitUnauthorized]: {
      exec: async () => {
        server.use(handleLoginRequest({ transformer: () => context.status(401) }));

        userEvent.type(emailQueries.get(), mockUserEmail());
        userEvent.type(passwordQueries.get(), mockUserPassword());
        userEvent.click(submitQueries.get());
      },
    },

    [TestEventType.SubmitUnexpected]: {
      exec: async () => {
        server.use(handleLoginRequest({ transformer: () => context.status(500) }));

        userEvent.type(emailQueries.get(), mockUserEmail());
        userEvent.type(passwordQueries.get(), mockUserPassword());
        userEvent.click(submitQueries.get());
      },
    },

    [TestEventType.SubmitIncompleteData]: {
      exec: async (_, event) => {
        const { email, password } = event as { type: string; email: boolean; password: boolean };

        if (email) {
          userEvent.type(emailQueries.get(), mockUserEmail());
        }

        if (password) {
          userEvent.type(passwordQueries.get(), mockUserPassword());
        }

        userEvent.click(submitQueries.get());
      },
      cases: [
        { email: false, password: false },
        { email: true, password: false },
        { email: false, password: true },
      ],
    },

    [TestEventType.LoadingEnded]: {
      exec: async () => {
        expect(await submitQueries.find()).toBeInTheDocument();
      },
    },
  });

  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach((plan, planIndex) => {
    describe(`Plan ${planIndex}: ${plan.description}`, () => {
      plan.paths.forEach((path, pathIndex) => {
        test(`Path ${pathIndex}: ${path.description}`, async () => {
          const machine = createAuthMachine({ storageKeys });
          const service = interpret(machine).start();
          const sendSpy = jest.spyOn(service, 'send');

          const renderResult = renderWithProviders(
            <AuthMachineProvider service={service}>
              <LoginCard />
            </AuthMachineProvider>
          );

          await path.test({ renderResult, sendAuthEventSpy: sendSpy });
        });
      });
    });
  });

  test('has full coverage', () => {
    testModel.testCoverage();
  });
});

const submitQueries = {
  get: () => screen.getByRole('button', { name: /pages.login.submit/i }),
  find: () => screen.findByRole('button', { name: /pages.login.submit/i }),
};

const loadingSubmitQueries = {
  find: () => screen.findByRole('button', { name: /states.loading/i }),
};

const emailQueries = {
  get: () => screen.getByLabelText(/props.user.email/i),
};

const passwordQueries = {
  get: () => screen.getByLabelText(/props.user.password/i),
};

const invalidLoginErrorMessageQueries = {
  query: () => screen.queryByText(/pages.login.errors.invalidLogin/i),
  find: () => screen.findByText(/pages.login.errors.invalidLogin/i),
};

const unexpectedErrorMessageQueries = {
  query: () => screen.queryByText(/pages.login.errors.unexpected/i),
  find: () => screen.findByText(/pages.login.errors.unexpected/i),
};
