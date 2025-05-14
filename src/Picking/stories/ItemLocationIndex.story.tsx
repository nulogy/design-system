import React, { useState } from "react";
import { Box, Text, TopBar, Switcher, Switch, IconicButton, Sidebar } from "../..";
import styled from "styled-components";

const Container = styled(Box)`
  margin: 0 auto;
  width: 100%;
`;

const SwitcherContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.x2};
`;

export default {
  title: "Prototypes/Picking",
};

export const ItemLocationIndex = () => {
  const [viewBy, setViewBy] = useState("item");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Box>
      <TopBar.Root>
        <TopBar.BackLink href="/?path=/story/prototypes-picking--index">Back</TopBar.BackLink>
        <TopBar.PageTitle>Item Location Index</TopBar.PageTitle>
        <TopBar.Menu>
          <TopBar.MenuItem>Home</TopBar.MenuItem>
          <TopBar.MenuItem>Picklists</TopBar.MenuItem>
          <TopBar.MenuItem>Cycle counts</TopBar.MenuItem>
        </TopBar.Menu>
      </TopBar.Root>
      <Container>
        <Box p="x4">
          <Box display="flex" justifyContent="flex-end" mb="x2">
            <IconicButton icon="filter" onClick={() => setShowFilters(true)}>Filters</IconicButton>
          </Box>
          <SwitcherContainer mb="x3">
            <Text>View by</Text>
            <Switcher selected={viewBy} onChange={setViewBy}>
              <Switch value="item">Item</Switch>
              <Switch value="location">Location</Switch>
            </Switcher>
          </SwitcherContainer>
          <Text>Item Location Index</Text>
        </Box>
      </Container>
      <Sidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
      >
        <Box p="x4">
          <Text>Filter options will go here</Text>
        </Box>
      </Sidebar>
    </Box>
  );
}; 