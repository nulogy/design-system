import React from 'react';
import {Type, Link} from '@nulogy/components';
import packageJson from '../../package.json';

export default () => (
  <main className="welcome">

    <section class="intro">
      <div className="welcome-container">
        <img className="intro__logo" src="/logos/Nulogy_Full_Color.svg" style={{maxWidth: '100%'}} />
        <blockquote class="intro__text">The <strong>Nulogy Design System</strong> is a collection of Visual Guidelines and UI Components that will allow designers and developers to quickly create consistent experiences for our customers using established best practices.</blockquote>
      </div>
    </section>

    <section className="welcome-container">
      <div className="flex-container">
        <div>
          <Type.SectionTitle>Visual Style</Type.SectionTitle>
            <Type.Text>Learn about the style that makes up Nulogy applications; including logo usage, typography, our colour system, iconography and spacing.</Type.Text>
            <p><Link href="/visual_style/colour">Learn how to design for Nulogy</Link></p>
        </div>
        <div>
          <Type.SectionTitle>Components</Type.SectionTitle>
          <Type.Text>Built using React, components are tested interface design patterns designed to ensure a consistent experience for our users.</Type.Text>
          <p><Link href="/components">Use our components</Link></p>
        </div>
      </div>
    </section>
  </main>
);
