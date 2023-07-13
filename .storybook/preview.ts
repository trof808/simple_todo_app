import type { Preview } from "@storybook/react";

import { initialize, mswDecorator } from 'msw-storybook-addon';

import '../src/index.css';

initialize();

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
