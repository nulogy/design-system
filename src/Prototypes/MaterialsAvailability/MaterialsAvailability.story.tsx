import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialsAvailability } from './MaterialsAvailability';
import { Box } from '../../Box';

const meta: Meta = {
  title: 'Prototypes/Materials availability/Materials Availability',
  component: MaterialsAvailability,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// Stories that show just the content without navigation
export const POLITab: Story = () => (
  <Box p="x4">
    <MaterialsAvailability selectedIndex={0} hideNavigation />
  </Box>
);

export const MaterialsTab: Story = () => (
  <Box p="x4">
    <MaterialsAvailability selectedIndex={1} hideNavigation />
  </Box>
);

// Story that shows the full module with navigation and tabs
export const POLineItemsModule: Story = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <MaterialsAvailability 
      selectedIndex={selectedTab} 
      onTabChange={setSelectedTab}
    />
  );
};

