import { configure } from '@storybook/html';
import '../src/nds-dev.css';

const req = require.context('../src/scss', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

  configure(loadStories, module);
