/* global document */
import { storiesOf } from '@storybook/html';

storiesOf('Components/Type', module)
.add('Title', () => '<h1 class="Title">.Title</h1>')
.add('SectionTitle', () => '<h2 class="SectionTitle">.SectionTitle</h2>')
.add('SubsectionTitle', () => '<h3 class="SubsectionTitle">.SubsectionTitle</h3>');