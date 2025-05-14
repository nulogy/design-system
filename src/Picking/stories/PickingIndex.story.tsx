import React, { useState } from "react";
import { Box, Text, TopBar, Input, Switcher, Switch, Card, DescriptionList, DescriptionTerm, DescriptionDetails, DescriptionGroup, Link, StatusIndicator, StatusIndicatorValues, IconicButton, Sidebar, Select, Divider } from "../..";
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

const CardsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.x3};
`;

const DividerGroup = styled(DescriptionGroup)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding-bottom: ${({ theme }) => theme.space.x2};
  margin-bottom: ${({ theme }) => theme.space.x2};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const TitleRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.x2};
`;

const workOrders = [
  {
    id: "WO-12345",
    picklistId: "12345",
    status: "not_started",
    remaining: 15,
    location: "Assembly Line A",
    notes: "Priority order for production line. Complete by end of shift."
  },
  {
    id: "WO-67890",
    picklistId: "67890",
    status: "in_progress",
    remaining: 8,
    location: "Maintenance Bay",
    notes: "Spare parts for equipment maintenance."
  }
];

const shipOrders = [
  {
    id: "SO-54321",
    picklistId: "54321",
    status: "not_started",
    remaining: 12,
    location: "Shipping Dock 3",
    notes: "Express delivery. Handle with care."
  },
  {
    id: "SO-09876",
    picklistId: "09876",
    status: "in_progress",
    remaining: 5,
    location: "International Shipping",
    notes: "Customs documentation attached."
  }
];

export default {
  title: "Prototypes/Picking",
};

export const Index = () => {
  const [type, setType] = useState("work");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const orders = type === "work" ? workOrders : shipOrders;
  const locations = [...new Set(orders.map(order => order.location))];

  return (
    <Box>
      <TopBar.Root>
        <TopBar.BackLink href="/?path=/story/prototypes-picking--index">Back</TopBar.BackLink>
        <TopBar.PageTitle>Picklists</TopBar.PageTitle>
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
          <Input
            placeholder="Enter picklist ID"
            mb="x3"
          />
          <Divider mb="x3" />
          <SwitcherContainer mb="x3">
            <Text>Type</Text>
            <Switcher selected={type} onChange={setType}>
              <Switch value="work">Work order</Switch>
              <Switch value="ship">Ship order</Switch>
            </Switcher>
          </SwitcherContainer>
          <Box display="flex" justifyContent="flex-end" mb="x2">
            <Text color="midGrey">Sorted by: Picklist ID (1 → 9)</Text>
          </Box>
          <CardsContainer>
            {orders
              .filter(order => !selectedLocation || order.location === selectedLocation)
              .map((order) => (
              <StyledLink href="/?path=/story/prototypes-picking--item-location-index" key={order.id}>
                <Card>
                  <TitleRow>
                    <Text fontSize="large" fontWeight="bold">
                      Picklist {order.picklistId}
                    </Text>
                    <StatusIndicator
                      type={order.status === "not_started" ? StatusIndicatorValues.quiet : StatusIndicatorValues.neutral}
                    >
                      {order.status === "not_started" ? "Not started" : "In progress"}
                    </StatusIndicator>
                  </TitleRow>
                  <DescriptionList layout="inline" density="compact">
                    <DividerGroup>
                      <DescriptionTerm>Remaining</DescriptionTerm>
                      <DescriptionDetails>{order.remaining} items</DescriptionDetails>
                    </DividerGroup>
                    
                    <DescriptionGroup>
                      <DescriptionTerm>Order ID</DescriptionTerm>
                      <DescriptionDetails>{order.id}</DescriptionDetails>
                    </DescriptionGroup>
                    
                    <DescriptionGroup>
                      <DescriptionTerm>Drop-off location</DescriptionTerm>
                      <DescriptionDetails>{order.location}</DescriptionDetails>
                    </DescriptionGroup>
                    
                    <DescriptionGroup>
                      <DescriptionTerm>Notes</DescriptionTerm>
                      <DescriptionDetails>{order.notes}</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Card>
              </StyledLink>
            ))}
          </CardsContainer>
        </Box>
      </Container>
      <Sidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
      >
        <Box p="x4">
          <Select
            labelText="Drop-off location"
            options={[
              { value: "", label: "All locations" },
              ...locations.map(location => ({ value: location, label: location }))
            ]}
            value={selectedLocation}
            onChange={(value) => setSelectedLocation(value === null ? "" : String(value))}
          />
        </Box>
      </Sidebar>
    </Box>
  );
}; 