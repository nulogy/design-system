/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Components/Type', module)
.add('Headings', () => `
    <h1 class="Title">.Title</h1>
    <h2 class="SectionTitle">.SectionTitle</h2>
    <h3 class="SubsectionTitle">.SubsectionTitle</h3>
`);