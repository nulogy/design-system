import React, { useState } from "react";
import { Box, Text, TopBar, Switcher, Switch, IconicButton, Sidebar, Input, Select, DescriptionList, DescriptionTerm, DescriptionDetails, DescriptionGroup, Divider, Card, Heading3, PrimaryButton, QuietButton, Button } from "../..";
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

  const getSelectedItemDescription = () => {
    return items.find(item => item.code === selectedItem)?.description || "";
  };

  const handlePalletInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowPalletCard(true);
    }
  };

  return (
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
                      <PrimaryButton>Cancel pick</PrimaryButton>
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
              <Card>
                <Box p="x1">
                  <Text fontSize="large" mb="x2">Location A1</Text>
                  <DescriptionList layout="inline" density="compact">
                    <DescriptionGroup>
                      <DescriptionTerm>Quantity available</DescriptionTerm>
                      <DescriptionDetails>25.00000 CS</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>
              </Card>
              <Card>
                <Box p="x1">
                  <Text fontSize="large" mb="x2">Location B2</Text>
                  <DescriptionList layout="inline" density="compact">
                    <DescriptionGroup>
                      <DescriptionTerm>Quantity available</DescriptionTerm>
                      <DescriptionDetails>15.00000 CS</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>
              </Card>
              <Card>
                <Box p="x1">
                  <Text fontSize="large" mb="x2">Location C3</Text>
                  <DescriptionList layout="inline" density="compact">
                    <DescriptionGroup>
                      <DescriptionTerm>Quantity available</DescriptionTerm>
                      <DescriptionDetails>10.00000 CS</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
      <Sidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Items to pick"
      >
        <Box p="x4">
          <Box mb="x4">
            <Select
              labelText="Item"
              value={selectedItem}
              onChange={(value) => setSelectedItem(value as string)}
              options={items.map(item => ({
                value: item.code,
                label: item.code
              }))}
            />
          </Box>

          <Box mb="x4">
            <DescriptionList>
              <Box>
                <Text fontWeight="bold">Description</Text>
                <Text>{getSelectedItemDescription()}</Text>
              </Box>
            </DescriptionList>
          </Box>

          <Box mb="x4">
            <Select
              labelText="Lot code and expiry date"
              value={selectedLot}
              onChange={(value) => setSelectedLot(value as string)}
              options={lotCodes.map(lot => ({
                value: lot.code,
                label: `${lot.code} • ${lot.expiryDate}`
              }))}
            />
          </Box>

          <Box mb="x4">
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
  );
};

export const DropOffPage = () => {
  const [locationInput, setLocationInput] = useState("");
  const [showPalletCard, setShowPalletCard] = useState(false);
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
      setShowPalletCard(true);
    }
  };

  return (
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
          <Input 
            placeholder="Scan or enter location" 
            mb="x3" 
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={handleLocationInputKeyDown}
          />
          <Divider mb="x3" />

          <Box display="flex" justifyContent="space-between" alignItems="center" mb="x2">
            <Heading3>Picked pallets</Heading3>
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
                <Button>Cancel pick</Button>
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
                <Button>Cancel pick</Button>
              </Box>
            </Box>
          </Card>

          {showPalletCard && locationInput && (
            <Card mb="x3">
              <Box px="x2" py="x1">
                <Text fontSize="large" mb="x2">{locationInput}</Text>
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
                  <Button>Cancel pick</Button>
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
}; 