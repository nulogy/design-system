import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  Navigation,
  Page,
  IconicButton,
  Sidebar,
  Flex,
  Form,
  FormSection,
  FieldLabel,
  Input,
  Checkbox,
  Box,
  Button,
  PrimaryButton,
  QuietButton,
  Card,
  CardSet,
  Heading2,
  Heading3,
  Breadcrumbs,
  Link,
  Icon,
  Text,
  Switcher,
  Switch,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Divider,
  VerticalDivider,
  ToastContainer,
  toast,
  Modal,
  Select,
  DropdownMenu,
  DropdownButton,
  ButtonGroup,
  DangerButton,
  StatusIndicator,
} from "../../../index";

export default {
  title: "Templates/directed-putaway/v1.1",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

interface Move {
  id: string;
  moveId: string;
  jobId?: string;
  shipmentId?: string;
}

interface PalletItem {
  itemCode: string;
  itemDescription: string;
  lotCode: string;
  expiryDate: string;
  status: string;
  quantity: string;
}

interface Pallet {
  palletId: string;
  itemCode?: string;
  itemDescription?: string;
  lotCode?: string;
  expiryDate?: string;
  status?: string;
  quantity?: string;
  items?: PalletItem[]; // For mixed pallets
}

interface MovedPallet extends Pallet {
  dropOffLocation: string;
}

export const Default = () => {
  // Preferred location data structure - all locations at top level
  const locationData = {
    "rack-1-1": { name: "A1-B2-C3", palletSpots: 1 },
    "rack-1-2": { name: "A1-B2-C4", palletSpots: 1 },
    "rack-2-1": { name: "A2-B1-C2", palletSpots: 1 },
    "rack-2-2": { name: "A2-B1-C3", palletSpots: 1 },
    "rack-3-1": { name: "A3-B3-C1", palletSpots: 1 },
    "rack-3-2": { name: "A3-B3-C2", palletSpots: 1 },
    "floor-1": { name: "Floor location 1", palletSpots: 3 },
    "floor-2": { name: "Floor location 2", palletSpots: 2 },
    "floor-3": { name: "Floor location 3", palletSpots: 3 },
  };

  // Overflow location data structure (same structure, different pallet spot quantities)
  const overflowLocationData = {
    "rack-1-1": { name: "A1-B2-C3", palletSpots: 1 },
    "rack-1-2": { name: "A1-B2-C4", palletSpots: 1 },
    "rack-1-3": { name: "A1-B2-C5", palletSpots: 1 },
    "rack-2-1": { name: "A2-B1-C2", palletSpots: 1 },
    "rack-2-2": { name: "A2-B1-C3", palletSpots: 1 },
    "rack-2-3": { name: "A2-B1-C4", palletSpots: 1 },
    "rack-3-1": { name: "A3-B3-C1", palletSpots: 1 },
    "rack-3-2": { name: "A3-B3-C2", palletSpots: 1 },
    "rack-3-3": { name: "A3-B3-C3", palletSpots: 1 },
    "rack-3-4": { name: "A3-B3-C4", palletSpots: 1 },
    "floor-1": { name: "Floor location 1", palletSpots: 2 },
    "floor-2": { name: "Floor location 2", palletSpots: 2 },
    "floor-3": { name: "Floor location 3", palletSpots: 2 },
  };

  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const [moveId, setMoveId] = useState("");
  const [jobId, setJobId] = useState("");
  const [shipmentId, setShipmentId] = useState("");
  const [assignedToMe, setAssignedToMe] = useState(false);
  const [searchResults, setSearchResults] = useState<Move[]>([]);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [inputType, setInputType] = useState<"pallets" | "units">("pallets");
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [palletInput, setPalletInput] = useState("");
  const [toPalletInput, setToPalletInput] = useState("");
  const [palletData, setPalletData] = useState<Pallet | null>(null);
  const [isPalletPickedUp, setIsPalletPickedUp] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [pickedUpPallets, setPickedUpPallets] = useState<Pallet[]>([]);
  const [mode, setMode] = useState<"pick up" | "drop off">("pick up");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [validatedDropOffLocation, setValidatedDropOffLocation] = useState<string | null>(null);
  const [palletToCancel, setPalletToCancel] = useState<Pallet | null>(null);
  const [palletValidationError, setPalletValidationError] = useState<string | null>(null);
  const [isLocationsSidebarOpen, setIsLocationsSidebarOpen] = useState(false);
  const [locationNavPath, setLocationNavPath] = useState<string[]>([]);
  const [dropOffLocationError, setDropOffLocationError] = useState<string | null>(null);
  const [isReportProblemModalOpen, setIsReportProblemModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [reportedProblems, setReportedProblems] = useState<Record<string, string>>({});
  const [currentLocationForProblem, setCurrentLocationForProblem] = useState<string | null>(null);
  const [locationScenario, setLocationScenario] = useState<"preferred" | "overflow" | "empty">("preferred");
  const [isControllerModalOpen, setIsControllerModalOpen] = useState(false);
  const [isMovedInventorySidebarOpen, setIsMovedInventorySidebarOpen] = useState(false);
  const [movedInventory, setMovedInventory] = useState<MovedPallet[]>([]);
  const [isPalletDetailsSidebarOpen, setIsPalletDetailsSidebarOpen] = useState(false);
  const [selectedPalletForDetails, setSelectedPalletForDetails] = useState<Pallet | null>(null);

  // Initialize available pallet spots from locationData
  const [availablePalletSpots, setAvailablePalletSpots] = useState<Record<string, number>>(() => {
    const spots: Record<string, number> = {};
    for (const key in locationData) {
      spots[locationData[key as keyof typeof locationData].name] =
        locationData[key as keyof typeof locationData].palletSpots;
    }
    return spots;
  });

  // Generate a new Move ID when creating a move
  const generateMoveId = () => {
    // Generate a random 6-digit move ID
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Generate random items for mixed pallets
  const generateMixedPalletItems = (): PalletItem[] => {
    const itemCount = Math.floor(Math.random() * 9) + 2; // 2-10 items
    const items: PalletItem[] = [];
    
    // Sample item codes and descriptions
    const sampleItems = [
      { code: "PIE4124", desc: "Apple Pie" },
      { code: "CHC5678", desc: "Chocolate Chip Cookie" },
      { code: "BRN9012", desc: "Brownie" },
      { code: "CUP3456", desc: "Cupcake" },
      { code: "DON7890", desc: "Donut" },
      { code: "MUF1234", desc: "Muffin" },
      { code: "COO5678", desc: "Cookie" },
      { code: "CAK9012", desc: "Cake" },
    ];
    
    // Sample lot codes
    const lotCodes = ["LOT001", "LOT002", "LOT003", "LOT004", "LOT005", "LOT006", "LOT007", "LOT008"];
    
    // Generate expiry dates (random dates in the next 30-90 days)
    const getRandomExpiryDate = () => {
      const days = Math.floor(Math.random() * 60) + 30;
      const date = new Date();
      date.setDate(date.getDate() + days);
      return date.toISOString().split('T')[0];
    };
    
    // Sample statuses
    const statuses = ["Available", "Reserved", "In Transit"];
    
    // Sample quantities
    const quantities = ["10", "20", "30", "40", "50", "100", "150", "200"];
    
    for (let i = 0; i < itemCount; i++) {
      // Sometimes use the same item code with different lot/expiry, sometimes different item
      const useSameItem = Math.random() > 0.5 && items.length > 0;
      const itemIndex = useSameItem 
        ? Math.floor(Math.random() * items.length)
        : Math.floor(Math.random() * sampleItems.length);
      
      const baseItem = useSameItem 
        ? { code: items[itemIndex].itemCode, desc: items[itemIndex].itemDescription }
        : sampleItems[itemIndex];
      
      items.push({
        itemCode: baseItem.code,
        itemDescription: baseItem.desc,
        lotCode: lotCodes[Math.floor(Math.random() * lotCodes.length)],
        expiryDate: getRandomExpiryDate(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        quantity: quantities[Math.floor(Math.random() * quantities.length)],
      });
    }
    
    return items;
  };

  const handleLocationCardClick = (key: string) => {
    setLocationNavPath([...locationNavPath, key]);
  };

  const handleLocationBackClick = () => {
    setLocationNavPath(locationNavPath.slice(0, -1));
  };

  // Function to recursively search for a location name in the locationData structure
  const findLocationInData = (data: any, locationName: string): boolean => {
    if (!data) return false;

    // Check if current level matches
    if (data.name === locationName) {
      return true;
    }

    // Recursively check children
    if (data.children) {
      for (const key in data.children) {
        if (findLocationInData(data.children[key], locationName)) {
          return true;
        }
      }
    }

    return false;
  };

  // Function to search through all location types in locationData (both preferred and overflow)
  const findLocationInAllData = (locationName: string): boolean => {
    // Search in preferred locations
    for (const key in locationData) {
      if (locationData[key as keyof typeof locationData].name === locationName) {
        return true;
      }
    }
    // Search in overflow locations
    for (const key in overflowLocationData) {
      if (overflowLocationData[key as keyof typeof overflowLocationData].name === locationName) {
        return true;
      }
    }
    return false;
  };

  // Function to get the first location alphabetically that has available spots and no reported problems
  const getFirstFinalLocation = (): string | null => {
    const locations = Object.values(locationData)
      .map((location) => location.name)
      .filter((name) => availablePalletSpots[name] > 0 && !reportedProblems[name])
      .sort();
    return locations.length > 0 ? locations[0] : null;
  };

  const handleDropOffLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedLocation = dropOffLocation.trim();

    if (!trimmedLocation) {
      return;
    }

    // Check if location exists in locationData
    const locationExists = findLocationInAllData(trimmedLocation);
    const currentSpots = availablePalletSpots[trimmedLocation];
    const hasProblem = reportedProblems[trimmedLocation];

    if (hasProblem) {
      // Error - location has a reported problem
      setDropOffLocationError("Location has a reported problem");
      setValidatedDropOffLocation(null);
    } else if (locationExists && currentSpots !== undefined && currentSpots > 0) {
      // Location is valid - store it and enable pallet field
      setValidatedDropOffLocation(trimmedLocation);
      setDropOffLocationError(null);
    } else if (locationExists && currentSpots !== undefined && currentSpots === 0) {
      // Error - location is full
      setDropOffLocationError("Location is full");
      setValidatedDropOffLocation(null);
    } else {
      // Error - location not found
      setDropOffLocationError("Pallet cannot be dropped off in that location");
      setValidatedDropOffLocation(null);
    }
  };

  const handleFinalDropOff = (pallet: Pallet) => {
    if (!validatedDropOffLocation || !pallet) {
      return;
    }

    // Calculate remaining spots before state update
    const currentSpots = availablePalletSpots[validatedDropOffLocation] || 0;
    const remainingSpots = currentSpots - 1;

    // Success - remove pallet from pickedUpPallets and add to moved inventory
    const updatedPallets = pickedUpPallets.filter((p) => p.palletId !== pallet.palletId);
    setPickedUpPallets(updatedPallets);

    // Decrement available pallet spots for this location
    setAvailablePalletSpots((prev) => ({
      ...prev,
      [validatedDropOffLocation]: remainingSpots,
    }));

    // Add to moved inventory with drop-off location
    const movedPallet: MovedPallet = {
      ...pallet,
      dropOffLocation: validatedDropOffLocation,
    };
    setMovedInventory([movedPallet, ...movedInventory]);

    setPalletData(null);
    setPalletInput("");

    // Only reset drop-off location if:
    // - No more pallet spots available, OR
    // - No more pallets in transit
    const hasRemainingSpots = remainingSpots > 0;
    const hasRemainingPallets = updatedPallets.length > 0;

    if (!hasRemainingSpots || !hasRemainingPallets) {
      setDropOffLocation("");
      setValidatedDropOffLocation(null);
      setDropOffLocationError(null);
    }

    toast.success("Pallet dropped off successfully");

    // If no more pallets in transit, switch back to pick up mode
    if (updatedPallets.length === 0) {
      setMode("pick up");
    }
  };

  const getCurrentLocationData = () => {
    if (locationNavPath.length === 0) {
      return null; // At root level, return null to use special handling
    }

    // Determine which data source to use based on scenario
    const dataSource = locationScenario === "overflow" ? overflowLocationData : locationData;

    let current: any = dataSource;
    for (let i = 0; i < locationNavPath.length; i++) {
      const key = locationNavPath[i];
      // First level: access directly from dataSource
      if (i === 0 && dataSource[key as keyof typeof dataSource]) {
        current = dataSource[key as keyof typeof dataSource];
      }
      // Subsequent levels: access from children
      else if (current?.children?.[key]) {
        current = current.children[key];
      } else {
        return null;
      }
    }
    return current;
  };

  const renderLocationCards = () => {
    // If locations are empty, show empty state
    if (locationScenario === "empty") {
      return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" gap="x3">
          <Text color="midGrey" textAlign="center">
            There are no available locations at this time. Try again later; bring the pallet back to the pick up
            location; or, contact your supervisor.
          </Text>
        </Flex>
      );
    }

    let items: any[] = [];
    let overflowItems: any[] = [];

    // Show all locations sorted alphabetically
    if (locationScenario === "preferred") {
      items = Object.keys(locationData)
        .map((key) => {
          const location = locationData[key as keyof typeof locationData];
          return {
            key,
            ...location,
            palletSpots: availablePalletSpots[location.name] ?? location.palletSpots,
          };
        })
        .filter((item) => item.palletSpots > 0)
        .sort((a, b) => a.name.localeCompare(b.name));
    } else if (locationScenario === "overflow") {
      // In overflow scenario, preferred locations have 0 spots, so they're filtered out
      items = [];
      overflowItems = Object.keys(overflowLocationData)
        .map((key) => {
          const location = overflowLocationData[key as keyof typeof overflowLocationData];
          return {
            key,
            ...location,
            palletSpots: availablePalletSpots[location.name] ?? location.palletSpots,
          };
        })
        .filter((item) => item.palletSpots > 0)
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    if (items.length === 0 && overflowItems.length === 0) return null;

    const renderCardSet = (cardItems: any[]) => (
      <CardSet>
        {cardItems.map((item) => {
          const hasProblem = reportedProblems[item.name];
          return (
            <Card key={item.key}>
              <Flex justifyContent="space-between" alignItems="center" style={{ opacity: hasProblem ? 0.5 : 1 }}>
                <Heading3 mb="0">{item.name}</Heading3>
                {hasProblem ? (
                  <StatusIndicator type="neutral">
                    Problem reported
                  </StatusIndicator>
                ) : (
                  <StatusIndicator type="quiet">
                    {item.palletSpots} {item.palletSpots === 1 ? "spot" : "spots"} available
                  </StatusIndicator>
                )}
              </Flex>
            </Card>
          );
        })}
      </CardSet>
    );

    return (
      <>
        <Heading2 mb="x2">Preferred locations</Heading2>
        {locationScenario === "overflow" ? (
          <>
            {items.length > 0 && (
              <>
                <CardSet>
                  {items.map((item) => {
                    return (
                      <Card key={item.key} style={{ opacity: 0.5 }}>
                        <Flex justifyContent="space-between" alignItems="center">
                          <Heading3 mb="0">{item.name}</Heading3>
                          <StatusIndicator type="neutral">
                            Problem reported
                          </StatusIndicator>
                        </Flex>
                      </Card>
                    );
                  })}
                </CardSet>
                <Divider my="x3" />
              </>
            )}
            <Heading2 mb="x2">Overflow locations</Heading2>
            {renderCardSet(overflowItems)}
          </>
        ) : (
          <>
            {renderCardSet(items)}
            <Divider my="x3" />
            <Heading2 mb="x2">Overflow locations</Heading2>
            <Text color="midGrey" mb="x2">
              Available overflow locations will be displayed if there are no more preferred locations available.
            </Text>
          </>
        )}
      </>
    );
  };

  const handleSearchMovesClick = () => {
    setIsSearchSidebarOpen(true);
  };

  const handleSearch = () => {
    // Mock search results - in a real app, this would be an API call
    const mockResults: Move[] = [
      { id: "1", moveId: "553485", jobId: "JOB-001", shipmentId: "SHIP-123" },
      { id: "2", moveId: "553486", jobId: "JOB-002", shipmentId: "SHIP-124" },
      { id: "3", moveId: "553487", jobId: "JOB-003", shipmentId: "SHIP-125" },
    ];

    // Filter based on search criteria
    let filteredResults = mockResults;
    if (moveId) {
      filteredResults = filteredResults.filter((move) => move.moveId.includes(moveId));
    }
    if (jobId) {
      filteredResults = filteredResults.filter((move) => move.jobId?.includes(jobId));
    }
    if (shipmentId) {
      filteredResults = filteredResults.filter((move) => move.shipmentId?.includes(shipmentId));
    }

    setSearchResults(filteredResults);
    setIsSearchSidebarOpen(false);
  };

  const handleClear = () => {
    setMoveId("");
    setJobId("");
    setShipmentId("");
    setAssignedToMe(false);
    setSearchResults([]);
  };

  const handleMoveClick = (move: Move) => {
    setSelectedMove(move);
  };

  const handleCreateMoveClick = () => {
    const newMoveId = generateMoveId();
    setSelectedMove({ id: "new", moveId: newMoveId });
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedMove(null);
  };

  const handleNavBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedMove(null);
    setPalletData(null);
    setPalletInput("");
  };

  const handlePalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Don't submit if the Select menu is open
    if (isSelectMenuOpen) {
      return;
    }

    const trimmedInput = palletInput.trim();
    if (!trimmedInput) {
      return;
    }

    if (mode === "drop off") {
      // Validate that pallet exists in pickedUpPallets
      const foundPallet = pickedUpPallets.find((p) => p.palletId === trimmedInput);
      if (!foundPallet) {
        setPalletValidationError("Pallet not found in-transit");
        setPalletData(null);
        return;
      }
      // Pallet is valid - set it and trigger final drop off
      setPalletValidationError(null);
      setPalletData(foundPallet);
      // Automatically complete the drop off
      handleFinalDropOff(foundPallet);
    } else {
      // Pick up mode - check if pallet is already in transit
      const existingPallet = pickedUpPallets.find((p) => p.palletId === trimmedInput);
      if (existingPallet) {
        setPalletValidationError("This pallet is already in-transit");
        setPalletData(null);
        return;
      }
      // Pallet is valid
      setPalletValidationError(null);
      // Mock pallet data - in a real app, this would be an API call
      const isMixedPallet = trimmedInput.toUpperCase().startsWith("MP");
      
      const mockPallet: Pallet = isMixedPallet
        ? {
            palletId: trimmedInput,
            items: generateMixedPalletItems(),
          }
        : {
            palletId: trimmedInput,
            itemCode: "PIE4124",
            itemDescription: "Apple Pie Filling",
            lotCode: "DC12441",
            expiryDate: "2024-Dec-15",
            status: "Good",
            quantity: "10,000.0 ea",
          };
      setPalletData(mockPallet);
      setPalletInput("");
    }
  };

  const handlePickUp = () => {
    // Pick up logic would go here
    console.log("Picking up pallet:", palletData);
    if (palletData) {
      // Add new pallet to the beginning of the array so newest appears on top
      setPickedUpPallets([palletData, ...pickedUpPallets]);
      setPalletData(null);
      setPalletInput("");
      setIsPalletPickedUp(false);
    }
  };

  const handleCancelClick = () => {
    setPalletToCancel(palletData);
    setIsCancelModalOpen(true);
  };

  const handleCancelPickedUpPallet = (palletId: string) => {
    const pallet = pickedUpPallets.find((p) => p.palletId === palletId);
    if (pallet) {
      setPalletToCancel(pallet);
      setIsCancelModalOpen(true);
    }
  };

  const handleCancelConfirm = () => {
    if (palletToCancel) {
      if (palletData && palletData.palletId === palletToCancel.palletId) {
        // If canceling a pallet that's currently displayed (not yet picked up)
        setPalletData(null);
        setPalletInput("");
        setIsPalletPickedUp(false);
      } else {
        // If canceling a picked up pallet
        setPickedUpPallets(pickedUpPallets.filter((p) => p.palletId !== palletToCancel.palletId));
      }
    }
    setIsCancelModalOpen(false);
    setPalletToCancel(null);
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
    setPalletToCancel(null);
  };

  const backButton = (
    <Link
      href="#"
      onClick={handleNavBackClick}
      underline={false}
      style={{ display: "flex", alignItems: "center", paddingLeft: "16px" }}
    >
      <Icon icon="arrowBack" size="x3" color="darkGrey" />
    </Link>
  );

  const pageTitle = selectedMove ? `Move ${selectedMove.moveId}` : "Moves";

  return (
    <>
      <ApplicationFrame
        navBar={
          <Box position="relative" width="100%">
            <Navigation
              primaryLogo={backButton}
              secondaryNavigation={[
                {
                  key: "controller",
                  type: "button",
                  icon: "settings",
                  tooltip: "Controller",
                  props: {
                    onClick: () => {
                      setIsControllerModalOpen(true);
                    },
                  },
                },
                {
                  key: "app-switcher",
                  type: "button",
                  icon: "apps",
                  tooltip: "App switcher",
                  props: {
                    onClick: () => {
                      // App switcher functionality would go here
                    },
                  },
                },
              ]}
            />
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              style={{ pointerEvents: "none" }}
            >
              <Text fontSize="medium" fontWeight="medium">
                {pageTitle}
              </Text>
            </Box>
          </Box>
        }
      >
        <ToastContainer />
        <Page fullHeight>
          {selectedMove ? (
            <>
              <Box px="x1" maxWidth="1360px" mx="auto">
                <Flex justifyContent="space-between" alignItems="center" gap="x2" mb="x2">
                  <Switcher
                    aria-label="Mode switcher"
                    selected={mode}
                    onChange={(value) => {
                      setMode(value as "pick up" | "drop off");
                      // Reset validated drop-off location when switching modes
                      setValidatedDropOffLocation(null);
                      setDropOffLocation("");
                      setDropOffLocationError(null);
                    }}
                  >
                    <Switch value="pick up">Pick up</Switch>
                    <Switch value="drop off">Drop off</Switch>
                  </Switcher>
                  <IconicButton
                    icon="update"
                    tooltip="View moved inventory"
                    onClick={() => setIsMovedInventorySidebarOpen(true)}
                    color="darkBlue"
                  >
                    <Text color="darkBlue">
                      View moved inventory ({movedInventory.length})
                    </Text>
                  </IconicButton>
                </Flex>
                {(mode === "pick up" || (mode === "drop off" && pickedUpPallets.length > 0)) && (
                  <Form onSubmit={handlePalletSubmit}>
                    <FormSection>
                      {mode === "drop off" && (
                        <Box>
                          <FieldLabel labelText="Drop-off location">
                            <Box position="relative" width="100%">
                              <Input
                                value={dropOffLocation}
                                onChange={(e) => {
                                  setDropOffLocation(e.target.value);
                                  setDropOffLocationError(null);
                                  // Clear validated location when user changes the input
                                  if (validatedDropOffLocation) {
                                    setValidatedDropOffLocation(null);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleDropOffLocationSubmit(e as any);
                                  }
                                }}
                                errorMessage={dropOffLocationError || undefined}
                                style={{ paddingRight: "140px" }}
                              />
                              <Box
                                position="absolute"
                                right="x1"
                                display="flex"
                                alignItems="center"
                                gap="x1"
                                style={{
                                  pointerEvents: "none",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  marginTop: "0px",
                                  zIndex: 1,
                                }}
                              >
                                <VerticalDivider />
                                <Box style={{ pointerEvents: "auto" }}>
                                  <QuietButton
                                    size="small"
                                    disabled={!validatedDropOffLocation}
                                    onClick={() => {
                                      setCurrentLocationForProblem(dropOffLocation || null);
                                      setSelectedProblem(reportedProblems[dropOffLocation] || null);
                                      setIsReportProblemModalOpen(true);
                                    }}
                                  >
                                    Report a problem
                                  </QuietButton>
                                </Box>
                              </Box>
                            </Box>
                          </FieldLabel>
                          {validatedDropOffLocation && availablePalletSpots[validatedDropOffLocation] !== undefined && (
                            <Text fontSize="small" color="midGrey" style={{ marginTop: "-24px", marginBottom: "24px" }}>
                              {availablePalletSpots[validatedDropOffLocation]}{" "}
                              {availablePalletSpots[validatedDropOffLocation] === 1 ? "pallet spot" : "pallet spots"} available
                            </Text>
                          )}
                        </Box>
                      )}
                      <Box pb="x1">
                        <Flex gap="x1" alignItems="flex-end">
                          <Box flex="1">
                            <FieldLabel labelText="Pallet">
                              <Input
                                value={palletInput}
                                onChange={(e) => {
                                  setPalletInput(e.target.value);
                                  setPalletValidationError(null);
                                  if (mode === "drop off") {
                                    setPalletData(null);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handlePalletSubmit(e as any);
                                  }
                                }}
                                disabled={mode === "drop off" && !validatedDropOffLocation}
                                errorMessage={palletValidationError || undefined}
                              />
                            </FieldLabel>
                          </Box>
                          {mode === "pick up" && (
                            <Box style={{ minWidth: "160px" }}>
                              <Select
                                options={[
                                  { value: "pallets", label: "Pallet pick" },
                                  { value: "units", label: "Unit pick" },
                                ]}
                                value={inputType}
                                onChange={(value) => setInputType(value as "pallets" | "units")}
                                onMenuOpen={() => setIsSelectMenuOpen(true)}
                                onMenuClose={() => setIsSelectMenuOpen(false)}
                              />
                            </Box>
                          )}
                        </Flex>
                      </Box>
                      {mode === "pick up" && inputType === "units" && (
                        <Box pb="x1" mt="x1">
                          <FieldLabel labelText="To pallet">
                            <Input
                              value={toPalletInput}
                              onChange={(e) => setToPalletInput(e.target.value)}
                              disabled={!palletData}
                            />
                          </FieldLabel>
                        </Box>
                      )}
                    </FormSection>
                  </Form>
                )}
                {palletData && mode === "pick up" && (
                  <Card mt="x1">
                    <Heading3 mb="x2">{palletData.palletId}</Heading3>
                    {palletData.items ? (
                      // Mixed pallet - show carousel
                      <Box style={{ overflowX: "auto", width: "100%" }}>
                        <Flex style={{ gap: "16px", flexWrap: "nowrap" }}>
                          {palletData.items.map((item, index) => (
                            <Card key={index} style={{ minWidth: "300px", maxWidth: "300px", flexShrink: 0 }}>
                              <Heading3 mb="x2">{item.itemCode} • {item.itemDescription}</Heading3>
                              <DescriptionList 
                                columns={1} 
                                layout="inline" 
                                density="compact"
                              >
                                <DescriptionGroup>
                                  <DescriptionTerm>Lot</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.lotCode}</DescriptionDetails>
                                </DescriptionGroup>
                                <DescriptionGroup>
                                  <DescriptionTerm>Expiry</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.expiryDate}</DescriptionDetails>
                                </DescriptionGroup>
                                <DescriptionGroup>
                                  <DescriptionTerm>Status</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.status}</DescriptionDetails>
                                </DescriptionGroup>
                                <DescriptionGroup>
                                  <DescriptionTerm>Quantity</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.quantity}</DescriptionDetails>
                                </DescriptionGroup>
                              </DescriptionList>
                            </Card>
                          ))}
                        </Flex>
                      </Box>
                    ) : (
                      // Single item pallet
                      <Card style={{ maxWidth: "fit-content", width: "auto" }}>
                        <Heading3 mb="x2">{palletData.itemCode} • {palletData.itemDescription}</Heading3>
                        <DescriptionList 
                          columns={1} 
                          layout="inline" 
                          density="compact"
                        >
                          <DescriptionGroup>
                            <DescriptionTerm>Lot</DescriptionTerm>
                            <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{palletData.lotCode}</DescriptionDetails>
                          </DescriptionGroup>
                          <DescriptionGroup>
                            <DescriptionTerm>Expiry</DescriptionTerm>
                            <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{palletData.expiryDate}</DescriptionDetails>
                          </DescriptionGroup>
                          <DescriptionGroup>
                            <DescriptionTerm>Status</DescriptionTerm>
                            <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{palletData.status}</DescriptionDetails>
                          </DescriptionGroup>
                          <DescriptionGroup>
                            <DescriptionTerm>Quantity</DescriptionTerm>
                            <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{palletData.quantity}</DescriptionDetails>
                          </DescriptionGroup>
                        </DescriptionList>
                      </Card>
                    )}
                    <Divider my="x2" />
                    <Flex justifyContent="flex-start">
                      {isPalletPickedUp ? (
                        <QuietButton size="small" onClick={handleCancelClick}>
                          Cancel
                        </QuietButton>
                      ) : (
                        <>
                          <PrimaryButton onClick={handlePickUp}>Pick up</PrimaryButton>
                          <QuietButton
                            onClick={() => {
                              setPalletData(null);
                              setPalletInput("");
                              setIsPalletPickedUp(false);
                            }}
                          >
                            Clear
                          </QuietButton>
                        </>
                      )}
                    </Flex>
                  </Card>
                )}
                <Divider my="x3" />
                <Heading3 mb="x1">Pallets in-transit</Heading3>
                {pickedUpPallets.length > 0 ? (
                  <>
                    <Flex justifyContent="flex-end" mb="x2">
                      <Text fontSize="small" color="midGrey">
                        Sorted by: Recently picked up
                      </Text>
                    </Flex>
                    <CardSet>
                      {pickedUpPallets.map((pallet) => (
                        <Card key={pallet.palletId}>
                          <Flex justifyContent="space-between" alignItems="flex-start" mb="x2">
                            <Box flex="1">
                              <Heading3 mb="x1">{pallet.palletId}</Heading3>
                              <Text color="midGrey">
                                {pallet.items 
                                  ? `Mixed pallet (${pallet.items.length} items)`
                                  : `${pallet.itemCode} • ${pallet.itemDescription}`
                                }
                              </Text>
                            </Box>
                            <Box textAlign="right">
                              <Text mb="x1">{getFirstFinalLocation() || "—"}</Text>
                              <Text fontSize="small" color="midGrey">
                                Drop off location
                              </Text>
                            </Box>
                          </Flex>
                          <Flex justifyContent="space-between" alignItems="center" mt="x2">
                            <Flex gap="x2">
                              <QuietButton
                                size="small"
                                onClick={() => {
                                  setSelectedPalletForDetails(pallet);
                                  setIsPalletDetailsSidebarOpen(true);
                                }}
                              >
                                View pallet details
                              </QuietButton>
                              <QuietButton size="small" onClick={() => setIsLocationsSidebarOpen(true)}>
                                View other locations
                              </QuietButton>
                            </Flex>
                            {mode === "pick up" && (
                              <Box onClick={(e) => e.stopPropagation()}>
                                <DropdownMenu trigger={() => <IconicButton icon="more" iconSize="x3" />}>
                                  <DropdownButton onClick={() => handleCancelPickedUpPallet(pallet.palletId)}>
                                    Cancel pickup
                                  </DropdownButton>
                                </DropdownMenu>
                              </Box>
                            )}
                          </Flex>
                        </Card>
                      ))}
                    </CardSet>
                  </>
                ) : (
                  <Flex flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" gap="x3">
                    <Text color="midGrey" textAlign="center">
                      There are no pallets in-transit yet. Scan a pallet to begin.
                    </Text>
                    <Text color="midGrey">or</Text>
                    <QuietButton size="small" onClick={() => setSelectedMove(null)}>
                      Close move
                    </QuietButton>
                  </Flex>
                )}
                <Modal
                  isOpen={isCancelModalOpen}
                  onRequestClose={handleCancelModalClose}
                  title="Cancel pickup?"
                  footerContent={
                    <ButtonGroup>
                      <PrimaryButton onClick={handleCancelConfirm}>Yes, cancel</PrimaryButton>
                      <QuietButton onClick={handleCancelModalClose}>No, go back</QuietButton>
                    </ButtonGroup>
                  }
                >
                  <Text>
                    Cancelling the pickup of Pallet {palletToCancel?.palletId || "XXX"} will remove it from the move
                    list. Please bring the pallet back to where you picked it up.
                  </Text>
                </Modal>
                <Sidebar
                  isOpen={isLocationsSidebarOpen}
                  onClose={() => setIsLocationsSidebarOpen(false)}
                  title="Available locations"
                  width="m"
                >
                  {renderLocationCards()}
                </Sidebar>
                <Sidebar
                  isOpen={isMovedInventorySidebarOpen}
                  onClose={() => setIsMovedInventorySidebarOpen(false)}
                  title="Moved inventory"
                  width="m"
                >
                  {movedInventory.length > 0 ? (
                    <>
                      <Flex justifyContent="flex-end" mb="x2">
                        <Text fontSize="small" color="midGrey">
                          Sorted by: Recently dropped off
                        </Text>
                      </Flex>
                      <CardSet>
                        {movedInventory.map((pallet) => (
                          <Card key={pallet.palletId}>
                            <Heading3 mb="0">{pallet.palletId}</Heading3>
                            <DescriptionList columns={1} layout="inline" density="compact">
                              <DescriptionGroup>
                                <DescriptionTerm>Drop-off location</DescriptionTerm>
                                <DescriptionDetails>{pallet.dropOffLocation}</DescriptionDetails>
                              </DescriptionGroup>
                            </DescriptionList>
                            <Divider my="x2" />
                            {pallet.items ? (
                              // Mixed pallet - show carousel
                              <Box style={{ overflowX: "auto", width: "100%" }}>
                                <Flex style={{ gap: "16px", flexWrap: "nowrap" }}>
                                  {pallet.items.map((item, index) => (
                                    <Card key={index} style={{ minWidth: "300px", maxWidth: "300px", flexShrink: 0 }}>
                                      <Heading3 mb="x2">{item.itemCode} • {item.itemDescription}</Heading3>
                                      <DescriptionList 
                                        columns={1} 
                                        layout="inline" 
                                        density="compact"
                                      >
                                        <DescriptionGroup>
                                          <DescriptionTerm>Lot</DescriptionTerm>
                                          <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.lotCode}</DescriptionDetails>
                                        </DescriptionGroup>
                                        <DescriptionGroup>
                                          <DescriptionTerm>Expiry</DescriptionTerm>
                                          <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.expiryDate}</DescriptionDetails>
                                        </DescriptionGroup>
                                        <DescriptionGroup>
                                          <DescriptionTerm>Status</DescriptionTerm>
                                          <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.status}</DescriptionDetails>
                                        </DescriptionGroup>
                                        <DescriptionGroup>
                                          <DescriptionTerm>Quantity</DescriptionTerm>
                                          <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.quantity}</DescriptionDetails>
                                        </DescriptionGroup>
                                      </DescriptionList>
                                    </Card>
                                  ))}
                                </Flex>
                              </Box>
                            ) : (
                              // Single item pallet
                              <Card style={{ maxWidth: "fit-content", width: "auto" }}>
                                <Heading3 mb="x2">{pallet.itemCode} • {pallet.itemDescription}</Heading3>
                                <DescriptionList 
                                  columns={1} 
                                  layout="inline" 
                                  density="compact"
                                >
                                  <DescriptionGroup>
                                    <DescriptionTerm>Lot</DescriptionTerm>
                                    <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{pallet.lotCode}</DescriptionDetails>
                                  </DescriptionGroup>
                                  <DescriptionGroup>
                                    <DescriptionTerm>Expiry</DescriptionTerm>
                                    <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{pallet.expiryDate}</DescriptionDetails>
                                  </DescriptionGroup>
                                  <DescriptionGroup>
                                    <DescriptionTerm>Status</DescriptionTerm>
                                    <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{pallet.status}</DescriptionDetails>
                                  </DescriptionGroup>
                                  <DescriptionGroup>
                                    <DescriptionTerm>Quantity</DescriptionTerm>
                                    <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{pallet.quantity}</DescriptionDetails>
                                  </DescriptionGroup>
                                </DescriptionList>
                              </Card>
                            )}
                          </Card>
                        ))}
                      </CardSet>
                    </>
                  ) : (
                    <Flex flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" gap="x3">
                      <Text color="midGrey" textAlign="center">
                        No pallets have been moved yet.
                      </Text>
                    </Flex>
                  )}
                </Sidebar>
                <Sidebar
                  isOpen={isPalletDetailsSidebarOpen}
                  onClose={() => {
                    setIsPalletDetailsSidebarOpen(false);
                    setSelectedPalletForDetails(null);
                  }}
                  title={selectedPalletForDetails ? `Pallet ${selectedPalletForDetails.palletId}` : "Pallet details"}
                  width="m"
                >
                  {selectedPalletForDetails && (
                    <CardSet>
                      {selectedPalletForDetails.items ? (
                        // Mixed pallet - show vertical list
                        <>
                          {selectedPalletForDetails.items.map((item, index) => (
                            <Card key={index}>
                              <Heading3 mb="x2">{item.itemCode} • {item.itemDescription}</Heading3>
                              <DescriptionList columns={1} layout="inline" density="compact">
                                <DescriptionGroup>
                                  <DescriptionTerm>Lot</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.lotCode}</DescriptionDetails>
                                </DescriptionGroup>
                                <DescriptionGroup>
                                  <DescriptionTerm>Expiry</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.expiryDate}</DescriptionDetails>
                                </DescriptionGroup>
                                <DescriptionGroup>
                                  <DescriptionTerm>Status</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.status}</DescriptionDetails>
                                </DescriptionGroup>
                                <DescriptionGroup>
                                  <DescriptionTerm>Quantity</DescriptionTerm>
                                  <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{item.quantity}</DescriptionDetails>
                                </DescriptionGroup>
                              </DescriptionList>
                            </Card>
                          ))}
                        </>
                      ) : (
                        // Single item pallet
                        <Card>
                          <Heading3 mb="x2">{selectedPalletForDetails.itemCode} • {selectedPalletForDetails.itemDescription}</Heading3>
                          <DescriptionList columns={1} layout="inline" density="compact">
                            <DescriptionGroup>
                              <DescriptionTerm>Lot</DescriptionTerm>
                              <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{selectedPalletForDetails.lotCode}</DescriptionDetails>
                            </DescriptionGroup>
                            <DescriptionGroup>
                              <DescriptionTerm>Expiry</DescriptionTerm>
                              <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{selectedPalletForDetails.expiryDate}</DescriptionDetails>
                            </DescriptionGroup>
                            <DescriptionGroup>
                              <DescriptionTerm>Status</DescriptionTerm>
                              <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{selectedPalletForDetails.status}</DescriptionDetails>
                            </DescriptionGroup>
                            <DescriptionGroup>
                              <DescriptionTerm>Quantity</DescriptionTerm>
                              <DescriptionDetails style={{ whiteSpace: "nowrap", textAlign: "left" }}>{selectedPalletForDetails.quantity}</DescriptionDetails>
                            </DescriptionGroup>
                          </DescriptionList>
                        </Card>
                      )}
                    </CardSet>
                  )}
                </Sidebar>
              </Box>
            </>
          ) : (
            <>
              <Flex gap="x2" px="x1" pb="x2" justifyContent="space-between" alignItems="center">
                <IconicButton icon="add" tooltip="Create move" onClick={handleCreateMoveClick}>
                  Create move
                </IconicButton>
                <IconicButton icon="search" tooltip="Search moves" onClick={handleSearchMovesClick}>
                  Search moves
                </IconicButton>
              </Flex>
              <Box px="x1" pb="x1">
                {searchResults.length === 0 ? (
                  <Flex flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" gap="x3">
                    <Text color="midGrey" textAlign="center">
                      Create a move.
                    </Text>
                    <Text color="midGrey">or</Text>
                    <Text color="midGrey">Search for moves by specifying at least one search option.</Text>
                  </Flex>
                ) : (
                  <CardSet>
                    {searchResults.map((move) => (
                      <Card key={move.id} style={{ cursor: "pointer" }} onClick={() => handleMoveClick(move)}>
                        <Heading3>Move {move.moveId}</Heading3>
                      </Card>
                    ))}
                  </CardSet>
                )}
              </Box>
            </>
          )}
        </Page>
        <Sidebar
          isOpen={isSearchSidebarOpen}
          onClose={() => setIsSearchSidebarOpen(false)}
          title="Search moves"
          width="m"
          footer={
            <Flex justifyContent="flex-start">
              <PrimaryButton onClick={handleSearch} mr="x2">
                Search
              </PrimaryButton>
              <QuietButton onClick={handleClear}>Clear</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <FieldLabel labelText="Move ID">
                  <Input value={moveId} onChange={(e) => setMoveId(e.target.value)} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Job ID">
                  <Input value={jobId} onChange={(e) => setJobId(e.target.value)} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Shipment ID">
                  <Input value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <Checkbox
                  labelText="Assigned to me"
                  checked={assignedToMe}
                  onChange={(e) => setAssignedToMe(e.target.checked)}
                />
              </Box>
            </FormSection>
          </Form>
        </Sidebar>
        <Modal
          isOpen={isReportProblemModalOpen}
          onRequestClose={() => {
            setIsReportProblemModalOpen(false);
            setSelectedProblem(null);
            setCurrentLocationForProblem(null);
          }}
          title={reportedProblems[currentLocationForProblem || ""] ? "Edit problem" : "Report a problem"}
          footerContent={
            <Flex justifyContent="flex-start">
              <PrimaryButton
                onClick={() => {
                  if (selectedProblem && currentLocationForProblem) {
                    // Save the reported problem for this location
                    setReportedProblems({
                      ...reportedProblems,
                      [currentLocationForProblem]: selectedProblem,
                    });
                    
                    // If this location is the current validated drop-off location, clear it
                    if (validatedDropOffLocation === currentLocationForProblem) {
                      setValidatedDropOffLocation(null);
                      setDropOffLocation("");
                      setDropOffLocationError(null);
                    }
                    
                    toast.success("Problem reported successfully");
                    setIsReportProblemModalOpen(false);
                    setSelectedProblem(null);
                    setCurrentLocationForProblem(null);
                  }
                }}
                mr="x2"
                disabled={!selectedProblem}
              >
                Submit
              </PrimaryButton>
              <QuietButton
                onClick={() => {
                  setIsReportProblemModalOpen(false);
                  setSelectedProblem(null);
                  setCurrentLocationForProblem(null);
                }}
              >
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <FieldLabel labelText="Problem">
                  <Select
                    options={[
                      { value: "location-full", label: "Location is full" },
                      { value: "location-damaged", label: "Location is damaged" },
                    ]}
                    value={selectedProblem}
                    onChange={(value) => setSelectedProblem(value as string)}
                    placeholder="Select a problem"
                  />
                </FieldLabel>
              </Box>
            </FormSection>
          </Form>
        </Modal>
        <Modal
          isOpen={isControllerModalOpen}
          onRequestClose={() => setIsControllerModalOpen(false)}
          title="Controller"
          maxWidth="400px"
        >
          <Box pb="x3">
            <Flex flexDirection="column" gap="x3">
              <Flex alignItems="center" gap="x2">
                <Text fontSize="small">Available locations sidebar:</Text>
                <Switcher
                  selected={locationScenario}
                  onChange={(value) => setLocationScenario(value as "preferred" | "overflow" | "empty")}
                >
                  <Switch value="preferred">Preferred</Switch>
                  <Switch value="overflow">Overflow</Switch>
                  <Switch value="empty">Empty</Switch>
                </Switcher>
              </Flex>
            </Flex>
          </Box>
        </Modal>
      </ApplicationFrame>
    </>
  );
};
