import { html } from 'lit-html';
import '../warehouse-app.js';

export default {
  title: 'App',
  component: 'warehouse-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <warehouse-app
      style="--warehouse-app-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </warehouse-app>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
