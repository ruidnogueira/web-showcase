import '../src/styles/styles.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Atoms', 'Molecules', 'Organisms', 'Pages'],
    },
  },
  viewport: {
    viewports: {
      galaxyS9: {
        name: 'Galaxy S9/S9+',
        styles: {
          width: '360px',
          height: '740px',
        },
      },
    },
  },
};
