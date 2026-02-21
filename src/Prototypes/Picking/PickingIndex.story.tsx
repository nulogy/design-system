import React, { useState } from "react";
import { Box } from "../../Box";
import { Text, Heading3 } from "../../Type";
import { TopBar } from "../../TopBar";
import { Switcher, Switch } from "../../Switcher";
import { IconicButton, PrimaryButton, QuietButton, Button } from "../../Button";
import { Sidebar } from "../../Layout";
import { Input } from "../../Input";
import { Select } from "../../Select";
import { DescriptionList, DescriptionTerm, DescriptionDetails, DescriptionGroup } from "../../DescriptionList";
import { Divider } from "../../Divider";
import { Card } from "../../Card";
import { NDSProvider } from "../../NDSProvider";
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

const NoWrapText = styled.span`
  white-space: nowrap;
`;

export default {
  title: "Prototypes/Picking",
};

export const PickingPage = () => {
  const [pickBy, setPickBy] = useState("pallet");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState("ITEM001");
  const [selectedLot, setSelectedLot] = useState("LOT001");
  const [tempSelectedItem, setTempSelectedItem] = useState(selectedItem);
  const [tempSelectedLot, setTempSelectedLot] = useState(selectedLot);
  const [palletInput, setPalletInput] = useState("");
  const [showPalletCard, setShowPalletCard] = useState(false);

  const items = [
    { code: "ITEM001", description: "Item 1 Description" },
    { code: "ITEM002", description: "Item 2 Description" },
    { code: "ITEM003", description: "Item 3 Description" },
    { code: "ITEM004", description: "Item 4 Description" },
    { code: "ITEM005", description: "Item 5 Description" },
  ];

  const lotCodes = [
    { code: "LOT001", expiryDate: "2024-12-31" },
    { code: "LOT002", expiryDate: "2024-11-30" },
    { code: "LOT003", expiryDate: "2024-10-31" },
  ];

  const locationsByItem = {
    ITEM001: [
      { location: "Location A1", quantity: "25.00000" },
      { location: "Location B2", quantity: "15.00000" },
      { location: "Location C3", quantity: "10.00000" },
    ],
    ITEM002: [
      { location: "Location D4", quantity: "30.00000" },
      { location: "Location E5", quantity: "20.00000" },
    ],
    ITEM003: [
      { location: "Location F6", quantity: "40.00000" },
    ],
    ITEM004: [
      { location: "Location G7", quantity: "35.00000" },
      { location: "Location H8", quantity: "25.00000" },
      { location: "Location I9", quantity: "15.00000" },
    ],
    ITEM005: [
      { location: "Location J10", quantity: "45.00000" },
      { location: "Location K11", quantity: "20.00000" },
    ],
  };

  const getSelectedItemDescription = () => {
    return items.find(item => item.code === tempSelectedItem)?.description || "";
  };

  const handlePalletInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowPalletCard(true);
    }
  };

  const handleApplyFilters = () => {
    setSelectedItem(tempSelectedItem);
    setSelectedLot(tempSelectedLot);
    setShowFilters(false);
  };

  const handleCancelFilters = () => {
    setTempSelectedItem(selectedItem);
    setTempSelectedLot(selectedLot);
    setShowFilters(false);
  };

  // Get current locations based on selected item
  const currentLocations = locationsByItem[selectedItem] || [];

  return (
    <NDSProvider>
      <Box>
        <TopBar.Root>
          <TopBar.BackLink href="/?path=/story/prototypes-picking--index">Back</TopBar.BackLink>
          <TopBar.PageTitle>Pick list 123456</TopBar.PageTitle>
          <TopBar.Menu>
            <TopBar.MenuItem>Home</TopBar.MenuItem>
            <TopBar.MenuItem>Picklists</TopBar.MenuItem>
            <TopBar.MenuItem>Cycle counts</TopBar.MenuItem>
          </TopBar.Menu>
        </TopBar.Root>
        <Container>
          <Box p="x4">
            <Box display="flex" justifyContent="flex-end" mb="x2">
              <IconicButton icon="filter" onClick={() => setShowFilters(true)}>Items to pick</IconicButton>
            </Box>

            <SwitcherContainer mb="x3">
              <Text>Pick by</Text>
              <Switcher selected={pickBy} onChange={setPickBy}>
                <Switch value="pallet">Pallet</Switch>
                <Switch value="unit">Unit</Switch>
              </Switcher>
            </SwitcherContainer>

            {pickBy === "pallet" ? (
              <>
                <Heading3 mb="x2">Pallet</Heading3>
                {!showPalletCard && (
                  <Input 
                    placeholder="Scan or enter pallet" 
                    mb="x3" 
                    value={palletInput}
                    onChange={(e) => setPalletInput(e.target.value)}
                    onKeyDown={handlePalletInputKeyDown}
                  />
                )}
                {showPalletCard && palletInput && (
                  <Card mb="x3">
                    <Box px="x2" py="x1">
                      <Text fontSize="large" mb="x2"> {palletInput}</Text>
                      <DescriptionList layout="inline" density="compact">
                        <DescriptionGroup>
                          <DescriptionTerm>Item</DescriptionTerm>
                          <DescriptionDetails>{selectedItem}</DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Lot</DescriptionTerm>
                          <DescriptionDetails>{selectedLot}</DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Expiry</DescriptionTerm>
                          <DescriptionDetails>{lotCodes.find(lot => lot.code === selectedLot)?.expiryDate}</DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Status</DescriptionTerm>
                          <DescriptionDetails>Available</DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Quantity</DescriptionTerm>
                          <DescriptionDetails>50.00000 CS</DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                      <Divider my="x2" />
                      <Box display="flex">
                        <PrimaryButton>Pick up</PrimaryButton>
                        <QuietButton ml="x2">Cancel pick</QuietButton>
                      </Box>
                    </Box>
                  </Card>
                )}
              </>
            ) : (
              <>
                <Heading3 mb="x2">To pallet</Heading3>
                <Box display="flex" alignItems="bottom" mb="x3">
                  <Input placeholder="Scan or enter pallet" mr="x2" />
                  <Button><NoWrapText>Generate Pallet</NoWrapText></Button>
                </Box>
              </>
            )}
            <Divider mb="x3" />
            <Heading3 mb="x2">Pick-up locations</Heading3>
            <Box display="flex" justifyContent="flex-end" mb="x2">
              <Text color="midGrey">Sorted by: Location (A → Z)</Text>
            </Box>

            <Box mb="x2">
              <Box display="grid" gridTemplateColumns="1fr" gridGap="x2">
                {currentLocations.map((loc) => (
                  <Card key={loc.location}>
                    <Box p="x1">
                      <Text fontSize="large" mb="x2">{loc.location}</Text>
                      <DescriptionList layout="inline" density="compact">
                        <DescriptionGroup>
                          <DescriptionTerm>Quantity available</DescriptionTerm>
                          <DescriptionDetails>{loc.quantity} CS</DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
        <Sidebar
          isOpen={showFilters}
          onClose={handleCancelFilters}
          title="Items to pick"
          footer={
            <Box display="flex" justifyContent="flex-start">
              <PrimaryButton onClick={handleApplyFilters}>Apply</PrimaryButton>
              <QuietButton ml="x2" onClick={handleCancelFilters}>Cancel</QuietButton>
            </Box>
          }
        >
          <Box p="x2">
            <Box mb="x3">
              <Select
                labelText="Item"
                value={tempSelectedItem}
                onChange={(value) => setTempSelectedItem(value as string)}
                options={items.map(item => ({
                  value: item.code,
                  label: item.code
                }))}
              />
            </Box>

            <Box mb="x3">
              <DescriptionList>
                <Box>
                  <Text fontWeight="bold">Description</Text>
                  <Text>{getSelectedItemDescription()}</Text>
                </Box>
              </DescriptionList>
            </Box>

            <Box mb="x3">
              <Select
                labelText="Lot code and expiry date"
                value={tempSelectedLot}
                onChange={(value) => setTempSelectedLot(value as string)}
                options={lotCodes.map(lot => ({
                  value: lot.code,
                  label: `${lot.code} • ${lot.expiryDate}`
                }))}
              />
            </Box>

            <Box>
              <DescriptionList>
                <Box>
                  <Text fontWeight="bold">Remaining to pick</Text>
                  <Text>50.00000 CS</Text>
                </Box>
              </DescriptionList>
            </Box>
          </Box>
        </Sidebar>
      </Box>
    </NDSProvider>
  );
};

export const DropOffPage = () => {
  const [locationInput, setLocationInput] = useState("");
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [selectedItem, setSelectedItem] = useState("ITEM001");
  const [selectedLot, setSelectedLot] = useState("LOT001");

  const lotCodes = [
    { code: "LOT001", expiryDate: "2024-12-31" },
    { code: "LOT002", expiryDate: "2024-11-30" },
    { code: "LOT003", expiryDate: "2024-10-31" },
  ];

  const handleLocationInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowLocationCard(true);
    }
  };

  const handleCancelLocation = () => {
    setShowLocationCard(false);
    setLocationInput("");
  };

  return (
    <NDSProvider>
      <Box>
        <TopBar.Root>
          <TopBar.BackLink href="/?path=/story/prototypes-picking--index">Back</TopBar.BackLink>
          <TopBar.PageTitle>Pick list 123456</TopBar.PageTitle>
          <TopBar.Menu>
            <TopBar.MenuItem>Home</TopBar.MenuItem>
            <TopBar.MenuItem>Picklists</TopBar.MenuItem>
            <TopBar.MenuItem>Cycle counts</TopBar.MenuItem>
          </TopBar.Menu>
        </TopBar.Root>
        <Container>
          <Box p="x4">
            <Heading3 mb="x2">Drop off</Heading3>
            {!showLocationCard ? (
              <Input 
                labelText="Drop off location (Line 1)"
                placeholder="Scan or enter location" 
                mb="x3" 
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={handleLocationInputKeyDown}
              />
            ) : (
              <Card mb="x3">
                <Box px="x2" py="x1">
                  <Text fontSize="large" mb="x2">{locationInput}</Text>
                  <Divider my="x2" />
                  <Box display="flex">
                    <PrimaryButton>Drop off pallets</PrimaryButton>
                    <QuietButton ml="x2" onClick={handleCancelLocation}>Cancel</QuietButton>
                  </Box>
                </Box>
              </Card>
            )}
            <Divider mb="x3" />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb="x2">
              <Heading3>Pallets in transit</Heading3>
              <Button icon="add" iconSide="left">Pick another pallet</Button>
            </Box>

            <Card mb="x3">
              <Box px="x2" py="x1">
                <Text fontSize="large" mb="x2">001</Text>
                <DescriptionList layout="inline" density="compact">
                  <DescriptionGroup>
                    <DescriptionTerm>Item</DescriptionTerm>
                    <DescriptionDetails>ITEM001</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Lot</DescriptionTerm>
                    <DescriptionDetails>LOT001</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Expiry</DescriptionTerm>
                    <DescriptionDetails>2024-12-31</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Status</DescriptionTerm>
                    <DescriptionDetails>Available</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Quantity</DescriptionTerm>
                    <DescriptionDetails>50.00000 CS</DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
                <Divider my="x2" />
                <Box display="flex">
                  <QuietButton>Cancel pick</QuietButton>
                </Box>
              </Box>
            </Card>

            <Card mb="x3">
              <Box px="x2" py="x1">
                <Text fontSize="large" mb="x2">002</Text>
                <DescriptionList layout="inline" density="compact">
                  <DescriptionGroup>
                    <DescriptionTerm>Item</DescriptionTerm>
                    <DescriptionDetails>ITEM002</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Lot</DescriptionTerm>
                    <DescriptionDetails>LOT002</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Expiry</DescriptionTerm>
                    <DescriptionDetails>2024-11-30</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Status</DescriptionTerm>
                    <DescriptionDetails>Available</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Quantity</DescriptionTerm>
                    <DescriptionDetails>25.00000 CS</DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
                <Divider my="x2" />
                <Box display="flex">
                  <QuietButton>Cancel pick</QuietButton>
                </Box>
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>
    </NDSProvider>
  );
}; 