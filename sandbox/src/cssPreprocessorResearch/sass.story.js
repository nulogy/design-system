import React from 'react';
import { storiesOf } from '@storybook/react';
import './sass.scss';

storiesOf('CSS preprocessors', module)
  .add('Sass', () => (
    <div className="sass">
      <p className="local_vars">This text is styled with local vars</p>

      <p>This solution uses <a href="https://github.com/tompascall/js-to-styles-var-loader">js-to-styles-var-loader</a> to enable loading of JS variables into sass.</p>
      
      <h2>Pros</h2>
      <ol>
        <li>If you like Scss, then this is it.</li>
      </ol>
      
      <h2>Cons</h2>
      <ol>
        <li>Scss mixins and Javascript functions can't be shared. Two sets of helpers would have to be maintained: One set for Scss and one for JS.</li>
        <li>It seems you can only require local JS files: my attempts to require <code>@nulogy/tokens</code> failed. I tried importing them directly into the <code>.scss</code> file with <code>require('@nulogy/tokens');</code> and also requiring and re-exporting them from the <code>localTokens.js</code> file.</li>
        <li>Variables must be imported as a single-level key-value map. Nested values need to be imported separately.</li>
        <li>Variables in Sass are global. When there are multiple requires or imports its hard to trace where things are coming from.</li>
        <li>Variables defined in JS can't be renamed on import - they are still in a global name space and suspectable to collisions.</li>
        <li>Scss as a language lacks the expressiveness of Javascript.</li>
        <li>node-sass is slow and monolithic - in the end you will need to recompile all Sass on every change.</li>
      </ol>

      <h2>Recommendation</h2>
      <p>If we were going to go with sass, it would probably be better to do some static build of sass-vars file from the tokens. This would give us more control of variable naming, and we could for example turn object paths into variable names: So <code>{" { colour: { blue: { 600: 'blue' } } } "}</code> could become <code>$nds-colour-blue-600: 'blue';</code></p>
    </div>
  ))