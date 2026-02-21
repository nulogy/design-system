import React, { useState } from "react";
import { Box } from "../../Box";
import { Text } from "../../Type";
import { TopBar } from "../../TopBar";
import { Input } from "../../Input";
import { Card } from "../../Card";
import { DescriptionList, DescriptionTerm, DescriptionDetails, DescriptionGroup } from "../../DescriptionList";
import { Link } from "../../Link";
import { StatusIndicator, StatusIndicatorValues } from "../../StatusIndicator";
import { IconicButton, PrimaryButton, QuietButton } from "../../Button";
import { Sidebar } from "../../Layout";
import { Select } from "../../Select";
import { Divider } from "../../Divider";
import { NDSProvider } from "../../NDSProvider";
import styled from "styled-components";

const Container = styled(Box)`
  margin: 0 auto;
  width: 100%;
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

const TruncatedNotes = styled(DescriptionDetails)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const workOrders = [
  {
    id: "WO-12345",
    picklistId: "12345",
    status: "not_started",
    remaining: 15,
    location: "Assembly Line A",
    notes: "Priority order for production line. Complete by end of shift. Please ensure all items are checked for quality and quantity before moving to the next stage. If any discrepancies are found, report immediately to the supervisor. This is a high-priority order and must be completed without delay.",
    finishedGoods: ["Pie Crust"]
  },
  {
    id: "WO-67890",
    picklistId: "67890",
    status: "in_progress",
    remaining: 8,
    location: "Maintenance Bay",
    notes: "Spare parts for equipment maintenance. Please double-check the part numbers and ensure all components are present. If any parts are missing, notify the inventory team immediately. This order supports critical maintenance operations.",
    finishedGoods: ["Pie Plate"]
  }
];

const shipOrders = [
  {
    id: "SO-54321",
    picklistId: "54321",
    status: "not_started",
    remaining: 12,
    location: "Shipping Dock 3",
    notes: "Express delivery. Handle with care. Ensure all packaging is secure and documentation is attached. This shipment is time-sensitive and must be prioritized for immediate dispatch. Contact the shipping coordinator if any issues arise.",
    retailers: ["Walmart"]
  },
  {
    id: "SO-09876",
    picklistId: "09876",
    status: "in_progress",
    remaining: 5,
    location: "International Shipping",
    notes: "Customs documentation attached. Verify all paperwork is complete and accurate before shipping. Any missing or incorrect documents may result in delays at customs. Coordinate with the export team for any questions.",
    retailers: ["Costco"]
  }
];

export default {
  title: "Prototypes/Picking",
};

export const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pickListType, setPickListType] = useState("all");
  const [workOrderCode, setWorkOrderCode] = useState("");
  const [finishedGoodCode, setFinishedGoodCode] = useState("");
  const [shipOrderId, setShipOrderId] = useState("");
  const [shipTo, setShipTo] = useState("");

  const [localSelectedLocation, setLocalSelectedLocation] = useState("");
  const [localPickListType, setLocalPickListType] = useState("all");
  const [localWorkOrderCode, setLocalWorkOrderCode] = useState("");
  const [localFinishedGoodCode, setLocalFinishedGoodCode] = useState("");
  const [localShipOrderId, setLocalShipOrderId] = useState("");
  const [localShipTo, setLocalShipTo] = useState("");

  React.useEffect(() => {
    if (showFilters) {
      setLocalSelectedLocation(selectedLocation);
      setLocalPickListType(pickListType);
      setLocalWorkOrderCode(workOrderCode);
      setLocalFinishedGoodCode(finishedGoodCode);
      setLocalShipOrderId(shipOrderId);
      setLocalShipTo(shipTo);
    }
  }, [showFilters]);

  const handleApplyFilters = () => {
    setSelectedLocation(localSelectedLocation);
    setPickListType(localPickListType);
    setWorkOrderCode(localWorkOrderCode);
    setFinishedGoodCode(localFinishedGoodCode);
    setShipOrderId(localShipOrderId);
    setShipTo(localShipTo);
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setLocalSelectedLocation("");
    setLocalPickListType("all");
    setLocalWorkOrderCode("");
    setLocalFinishedGoodCode("");
    setLocalShipOrderId("");
    setLocalShipTo("");
  };

  const allOrders = [...workOrders, ...shipOrders].sort((a, b) => a.picklistId.localeCompare(b.picklistId, undefined, { numeric: true }));
  const locations = [...new Set(allOrders.map(order => order.location))];
  const workOrderCodes = workOrders.map(order => order.id);
  const finishedGoods = [...new Set(workOrders.map(order => order.finishedGoods[0]))];
  const shipToOptions = [...new Set(shipOrders.map(order => order.retailers[0]))];

  // Filtering logic
  let filteredOrders = allOrders.filter(order => {
    // Location filter
    if (selectedLocation && order.location !== selectedLocation) return false;
    // Pick list type filter
    if (pickListType === "work" && !("finishedGoods" in order)) return false;
    if (pickListType === "ship" && !("retailers" in order)) return false;
    // Work order filters
    if (pickListType === "work") {
      if (workOrderCode && order.id !== workOrderCode) return false;
      if (finishedGoodCode && (order as any).finishedGoods[0] !== finishedGoodCode) return false;
    }
    // Ship order filters
    if (pickListType === "ship") {
      if (shipOrderId && !order.id.includes(shipOrderId)) return false;
      if (shipTo && (order as any).retailers[0] !== shipTo) return false;
    }
    return true;
  });

  return (
    <NDSProvider>
      <Box>
        <TopBar.Root>
          <TopBar.BackLink href="/?path=/story/prototypes-picking--index">Back</TopBar.BackLink>
          <TopBar.PageTitle>Pick lists</TopBar.PageTitle>
          <TopBar.Menu>
            <TopBar.MenuItem>Home</TopBar.MenuItem>
            <TopBar.MenuItem>Pick lists</TopBar.MenuItem>
            <TopBar.MenuItem>Cycle counts</TopBar.MenuItem>
          </TopBar.Menu>
        </TopBar.Root>
        <Container>
          <Box p="x2">
            <Box display="flex" justifyContent="flex-end" mb="x2">
              <IconicButton icon="filter" onClick={() => setShowFilters(true)}>Filters</IconicButton>
            </Box>
            <Input
              placeholder="Enter pick list ID"
              mb="x3"
            />
            <Divider mb="x3" />
            <Box display="flex" justifyContent="flex-end" mb="x2">
              <Text color="midGrey">Sorted by: Pick list ID (1 → 9)</Text>
            </Box>
            <CardsContainer>
              {filteredOrders.map((order) => (
                <StyledLink href="/?path=/story/prototypes-picking--item-location-index" key={order.id}>
                  <Card>
                    <TitleRow>
                      <Text fontSize="large" fontWeight="bold">
                        Pick list {order.picklistId}
                      </Text>
                    </TitleRow>
                    <DescriptionList layout="inline" density="compact">
                    <DescriptionGroup>
                        <DescriptionTerm>Drop-off location</DescriptionTerm>
                        <DescriptionDetails>{order.location}</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          {"finishedGoods" in order ? "Work order code" : "Ship order ID"}
                        </DescriptionTerm>
                        <DescriptionDetails>{order.id}</DescriptionDetails>
                      </DescriptionGroup>                    
                      {"finishedGoods" in order && Array.isArray((order as any).finishedGoods) && (
                        <DescriptionGroup>
                          <DescriptionTerm>Finished good</DescriptionTerm>
                          <DescriptionDetails>{(order as any).finishedGoods[0]}</DescriptionDetails>
                        </DescriptionGroup>
                      )}
                      {"retailers" in order && Array.isArray((order as any).retailers) && (
                        <DescriptionGroup>
                          <DescriptionTerm>Ship to</DescriptionTerm>
                          <DescriptionDetails>{(order as any).retailers[0]}</DescriptionDetails>
                        </DescriptionGroup>
                      )}
                      <DescriptionGroup>
                        <DescriptionTerm>Notes</DescriptionTerm>
                        <TruncatedNotes>{order.notes.slice(0, 250)}</TruncatedNotes>
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
          footer={
            <Box display="flex" justifyContent="flex-start">
              <PrimaryButton onClick={handleApplyFilters}>Apply</PrimaryButton>
              <QuietButton ml="x2" onClick={handleResetFilters}>Reset</QuietButton>
            </Box>
          }
        >
          <Box p="x2">
            <Select
              labelText="Drop-off location"
              options={[
                { value: "", label: "All locations" },
                ...locations.map(location => ({ value: location, label: location }))
              ]}
              value={localSelectedLocation}
              onChange={(value) => setLocalSelectedLocation(value === null ? "" : String(value))}
              mb="x3"
            />
            <Select
              labelText="Pick list type"
              options={[
                { value: "all", label: "All" },
                { value: "work", label: "Work order" },
                { value: "ship", label: "Ship order" },
              ]}
              value={localPickListType}
              onChange={(value) => setLocalPickListType(value as string)}
              mb="x3"
            />
            {localPickListType === "work" && (
              <>
                <Select
                  labelText="Work order code"
                  options={[
                    { value: "", label: "All work order codes" },
                    ...workOrderCodes.map(code => ({ value: code, label: code }))
                  ]}
                  value={localWorkOrderCode}
                  onChange={(value) => setLocalWorkOrderCode(value as string)}
                  mb="x3"
                />
                <Select
                  labelText="Finished good code"
                  options={[
                    { value: "", label: "All finished goods" },
                    ...finishedGoods.map(good => ({ value: good, label: good }))
                  ]}
                  value={localFinishedGoodCode}
                  onChange={(value) => setLocalFinishedGoodCode(value as string)}
                  mb="x3"
                />
              </>
            )}
            {localPickListType === "ship" && (
              <>
                <Input
                  labelText="Ship order ID"
                  placeholder="Enter ship order ID"
                  value={localShipOrderId}
                  onChange={(e) => setLocalShipOrderId(e.target.value)}
                  mb="x3"
                />
                <Select
                  labelText="Ship to"
                  options={[
                    { value: "", label: "All ship to" },
                    ...shipToOptions.map(retailer => ({ value: retailer, label: retailer }))
                  ]}
                  value={localShipTo}
                  onChange={(value) => setLocalShipTo(value as string)}
                  mb="x3"
                />
              </>
            )}
          </Box>
        </Sidebar>
      </Box>
    </NDSProvider>
  );
}; 