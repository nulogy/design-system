import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialsAvailability } from './MaterialsAvailability';

const meta: Meta = {
  title: 'Prototypes/Materials availability/Materials Availability',
  component: MaterialsAvailability,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const POLITab: Story = () => <MaterialsAvailability selectedIndex={0} />;
export const MaterialsTab: Story = () => <MaterialsAvailability selectedIndex={1} />;

