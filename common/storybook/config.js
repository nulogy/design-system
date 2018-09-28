import { configure } from '@storybook/react';

const rootDir = process.env.PWD;
console.log('rootDir :', rootDir);

export default requireContext => {
  function loadStories() {
    // iterate on all the stories and require them
    requireContext.keys().forEach(story => requireContext(story));
  }
  
  configure(loadStories, module);
}