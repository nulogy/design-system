import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text, P, Title, SectionTitle, SubsectionTitle } from './Type';

storiesOf('Type', module)
  .add('All components', () => (
    <React.Fragment>
      <Text>Text component is for inline content.</Text>
      <P>The P component is for block text.</P>
      <Title>The Title component is for page titles.</Title>
      <SectionTitle>The SectionTitle component is for sub-sections of a page.</SectionTitle>
      <SubsectionTitle>The SubsectionTitle component is for sub-sections of a page.</SubsectionTitle>
    </React.Fragment>
  ))
  .add('Text', () => (
    <React.Fragment>
      <Text>This is a line of text.\n</Text>
      The <Text>Text component</Text> is for inline content.
    </React.Fragment>
  ))
  .add('P', () => (
    <React.Fragment>
      <P>This is a block of text.</P>
      <P>The P component is for block content. It gives you a standard font size and line height.</P>
      <P>Aliquam erat volutpat. Integer elementum orci vestibulum porta venenatis. Phasellus porta quam ligula, eu venenatis nisl rutrum gravida. Aliquam ultricies sollicitudin accumsan. Duis consequat ex sit amet mi laoreet, sed fringilla augue interdum. Vivamus pharetra laoreet gravida. Pellentesque varius vitae erat ullamcorper vestibulum. Nunc ornare lectus risus, eu dapibus nisl iaculis sit amet. Pellentesque aliquet orci mi, quis elementum tellus viverra in. Mauris sit amet mi diam. Cras rhoncus, justo et consectetur tempor, quam odio pulvinar velit, ut vulputate urna mi ut tortor. Quisque ac tortor pretium, volutpat neque sed, molestie mauris. Duis eros nisi, faucibus quis orci sit amet, ornare dignissim purus. Proin eu sem ex.</P>
    </React.Fragment>
  ))
  .add('Title', () => (
    <React.Fragment>
      <Title>This is a block of text.</Title>
      <Title>The Title component is for page titles. It gives you a standard font size and line height.</Title>
      <Title>Aliquam erat volutpat. Integer elementum orci vestibulum porta venenatis. Phasellus porta quam ligula, eu venenatis nisl rutrum gravida. Aliquam ultricies sollicitudin accumsan. Duis consequat ex sit amet mi laoreet, sed fringilla augue interdum. Vivamus pharetra laoreet gravida. Pellentesque varius vitae erat ullamcorper vestibulum. Nunc ornare lectus risus, eu dapibus nisl iaculis sit amet. Pellentesque aliquet orci mi, quis elementum tellus viverra in. Mauris sit amet mi diam. Cras rhoncus, justo et consectetur tempor, quam odio pulvinar velit, ut vulputate urna mi ut tortor. Quisque ac tortor pretium, volutpat neque sed, molestie mauris. Duis eros nisi, faucibus quis orci sit amet, ornare dignissim purus. Proin eu sem ex.</Title>
    </React.Fragment>
  ))
  .add('SectionTitle', () => (
    <React.Fragment>
      <SectionTitle>This is a block of text.</SectionTitle>
      <SectionTitle>The SectionTitle component is for page Sectiontitles. It gives you a standard font size and line height.</SectionTitle>
      <SectionTitle>Aliquam erat volutpat. Integer elementum orci vestibulum porta venenatis. Phasellus porta quam ligula, eu venenatis nisl rutrum gravida. Aliquam ultricies sollicitudin accumsan. Duis consequat ex sit amet mi laoreet, sed fringilla augue interdum. Vivamus pharetra laoreet gravida. Pellentesque varius vitae erat ullamcorper vestibulum. Nunc ornare lectus risus, eu dapibus nisl iaculis sit amet. Pellentesque aliquet orci mi, quis elementum tellus viverra in. Mauris sit amet mi diam. Cras rhoncus, justo et consectetur tempor, quam odio pulvinar velit, ut vulputate urna mi ut tortor. Quisque ac tortor pretium, volutpat neque sed, molestie mauris. Duis eros nisi, faucibus quis orci sit amet, ornare dignissim purus. Proin eu sem ex.</SectionTitle>
    </React.Fragment>
  ))
  .add('SubsectionTitle', () => (
    <React.Fragment>
      <SubsectionTitle>This is a block of text.</SubsectionTitle>
      <SubsectionTitle>The SubsectionTitle component is for page Subsectiontitles. It gives you a standard font size and line height.</SubsectionTitle>
      <SubsectionTitle>Aliquam erat volutpat. Integer elementum orci vestibulum porta venenatis. Phasellus porta quam ligula, eu venenatis nisl rutrum gravida. Aliquam ultricies sollicitudin accumsan. Duis consequat ex sit amet mi laoreet, sed fringilla augue interdum. Vivamus pharetra laoreet gravida. Pellentesque varius vitae erat ullamcorper vestibulum. Nunc ornare lectus risus, eu dapibus nisl iaculis sit amet. Pellentesque aliquet orci mi, quis elementum tellus viverra in. Mauris sit amet mi diam. Cras rhoncus, justo et consectetur tempor, quam odio pulvinar velit, ut vulputate urna mi ut tortor. Quisque ac tortor pretium, volutpat neque sed, molestie mauris. Duis eros nisi, faucibus quis orci sit amet, ornare dignissim purus. Proin eu sem ex.</SubsectionTitle>
    </React.Fragment>
  ));