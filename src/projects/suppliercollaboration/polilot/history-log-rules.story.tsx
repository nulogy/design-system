import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Flex,
  Text,
  Divider,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Icon,
  RecordNumberPill,
  Tooltip,
  Switcher,
  Switch,
  ApplicationFrame,
  Page,
  BrandedNavBar,
  Breadcrumbs,
  Link,
} from "../../../..";

const meta: Meta = {
  title: "Projects/Supplier Collaboration/POLI lot/History Log Rules",
  component: () => null,
  parameters: {
    docs: {
      description: {
        component: `
# History Log Rules and Examples

This story documents the rules and structure for organizing history log entries in the POLI lot system.

## Structure

History log follows this hierarchy:
- **Entry**: Contains 1 or many groups, has one footer
- **Group**: Has a title and body, has a specific type
- **Footer**: Shows modification details (user, date, time)

## Group Types

### 1. PO Line Item Details
- **Title**: "PO line item details"
- **Content**: All PO line item related modifications
- **Characteristics**: Everything is correct as is

### 2. Production Record
- **Title**: "Production record"
- **Content**: Only "Expected quantity modified"
- **Characteristics**: The only thing that can be edited here is expected quantity

### 3. Actual Production Record
- **Title Format**: "Actual production record [Pill] – [Date]"
- **Content**: Does NOT include "Date modified" or "Expected quantity modified"
- **Characteristics**: Remove pills from the entries within the group

### 4. Subcomponent Consumption Record
- **Title Format**: "Subcomponent consumption record [Pill] – [Date] – Actual production record [Pill]"
- **Content**: All subcomponent consumption related modifications
- **Characteristics**: Remove pills from the entries within the group

### 5. Collaboration
- **Title**: "Collaboration"
- **Content**: All collaboration related modifications
- **Characteristics**: All good as is

## Entry Combinations

Production record, Actual production record, and Subcomponent consumption can be submitted in 1 entry.

## Examples

Below are examples of all possible combinations and structures.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Example 1: Single Group Entry (PO Line Item Details)
export const SingleGroupEntry: Story = {
  render: () => (
    <ApplicationFrame
      brand="nulogy"
      primaryMenu={[
        { label: "Order management", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Inventory management", href: "#" },
        { label: "Items", href: "#" },
        { label: "Import and exports", href: "#" },
      ]}
      secondaryMenu={[
        { icon: "search", href: "#", label: "Search" },
        { icon: "settings", href: "#", label: "Settings" },
        { icon: "guide", href: "#", label: "Guide" },
        { icon: "help", href: "#", label: "Help" },
      ]}
    >
      <Page>
        <Box p="x2">
          <Breadcrumbs>
            <Link href="#">POLI lot</Link>
            <Link href="#">History Log Rules</Link>
            <Link href="#">Single Group Entry</Link>
          </Breadcrumbs>
          
          <Box mt="x2">
            <Text fontSize="large" fontWeight="bold" mb="x2">
              Example 1: Single Group Entry (PO Line Item Details)
            </Text>
            
            {/* Entry 1: PO Line Item Details */}
            <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
              {/* Group 1: PO Line Item Details */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    PO line item details
                  </Box>
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      PO number modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        PO-2025-001-001
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        PO-2025-001-002
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Customer's PO line item number modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        CUST-LINE-001
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        CUST-LINE-001A
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Priority modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        Medium
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        High
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
              
              {/* Footer */}
              <Box mt="half">
                <Text fontSize="small" color="midGrey">
                  Modified by John Smith on January 29, 2025 at 2:30 PM
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  ),
};

// Example 2: Multi-Group Entry (Production Record + Actual Production Record)
export const MultiGroupEntry: Story = {
  render: () => (
    <ApplicationFrame
      brand="nulogy"
      primaryMenu={[
        { label: "Order management", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Inventory management", href: "#" },
        { label: "Items", href: "#" },
        { label: "Import and exports", href: "#" },
      ]}
      secondaryMenu={[
        { icon: "search", href: "#", label: "Search" },
        { icon: "settings", href: "#", label: "Settings" },
        { icon: "guide", href: "#", label: "Guide" },
        { icon: "help", href: "#", label: "Help" },
      ]}
    >
      <Page>
        <Box p="x2">
          <Breadcrumbs>
            <Link href="#">POLI lot</Link>
            <Link href="#">History Log Rules</Link>
            <Link href="#">Multi-Group Entry</Link>
          </Breadcrumbs>
          
          <Box mt="x2">
            <Text fontSize="large" fontWeight="bold" mb="x2">
              Example 2: Multi-Group Entry (Production Record + Actual Production Record)
            </Text>
            
            {/* Entry 2: Production Record + Actual Production Record */}
            <Flex flexDirection="column" gap="x2" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
              {/* Group 1: Production Record */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Production record
                  </Box>
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Expected quantity modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        1,000 cases
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        1,200 cases
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>

              {/* Group 2: Actual Production Record 001 */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Actual production record
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <RecordNumberPill 
                    number="001"
                    tooltip="Actual production record #001"
                    style={{ display: 'inline-block' }}
                  />
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    January 29, 2025
                  </Box>
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Actual quantity modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        950 cases
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        1,150 cases
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Pallet number modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        PAL-001
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        PAL-002
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Lot code modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        LOT-2025-001-001
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        LOT-2025-001-001A
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
              
              {/* Footer */}
              <Box mt="half">
                <Text fontSize="small" color="midGrey">
                  Modified by Sarah Johnson on January 30, 2025 at 3:45 PM
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  ),
};

// Example 3: Subcomponent Consumption Record Entry
export const SubcomponentConsumptionEntry: Story = {
  render: () => (
    <ApplicationFrame
      brand="nulogy"
      primaryMenu={[
        { label: "Order management", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Inventory management", href: "#" },
        { label: "Items", href: "#" },
        { label: "Import and exports", href: "#" },
      ]}
      secondaryMenu={[
        { icon: "search", href: "#", label: "Search" },
        { icon: "settings", href: "#", label: "Settings" },
        { icon: "guide", href: "#", label: "Guide" },
        { icon: "help", href: "#", label: "Help" },
      ]}
    >
      <Page>
        <Box p="x2">
          <Breadcrumbs>
            <Link href="#">POLI lot</Link>
            <Link href="#">History Log Rules</Link>
            <Link href="#">Subcomponent Consumption Entry</Link>
          </Breadcrumbs>
          
          <Box mt="x2">
            <Text fontSize="large" fontWeight="bold" mb="x2">
              Example 3: Subcomponent Consumption Record Entry
            </Text>
            
            {/* Entry 3: Subcomponent Consumption Record */}
            <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
              {/* Group 1: Subcomponent Consumption Record 001 */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Subcomponent consumption record
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <RecordNumberPill 
                    number="001"
                    tooltip="Subcomponent consumption record #001"
                    style={{ display: 'inline-block' }}
                  />
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    January 29, 2025
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    Actual production
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <RecordNumberPill 
                    number="001"
                    tooltip="Actual production record #001"
                    style={{ display: 'inline-block' }}
                  />
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Item modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        Raw Material A
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        Raw Material A (Grade 2)
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Quantity modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        500 kg
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        550 kg
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      UOM modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        kg
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        kg
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
              
              {/* Footer */}
              <Box mt="half">
                <Text fontSize="small" color="midGrey">
                  Modified by Production Manager on January 31, 2025 at 9:15 AM
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  ),
};

// Example 4: Collaboration Entry
export const CollaborationEntry: Story = {
  render: () => (
    <ApplicationFrame
      brand="nulogy"
      primaryMenu={[
        { label: "Order management", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Inventory management", href: "#" },
        { label: "Items", href: "#" },
        { label: "Import and exports", href: "#" },
      ]}
      secondaryMenu={[
        { icon: "search", href: "#", label: "Search" },
        { icon: "settings", href: "#", label: "Settings" },
        { icon: "guide", href: "#", label: "Guide" },
        { icon: "help", href: "#", label: "Help" },
      ]}
    >
      <Page>
        <Box p="x2">
          <Breadcrumbs>
            <Link href="#">POLI lot</Link>
            <Link href="#">History Log Rules</Link>
            <Link href="#">Collaboration Entry</Link>
          </Breadcrumbs>
          
          <Box mt="x2">
            <Text fontSize="large" fontWeight="bold" mb="x2">
              Example 4: Collaboration Entry
            </Text>
            
            {/* Entry 4: Collaboration */}
            <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
              {/* Group 1: Collaboration */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Collaboration
                  </Box>
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Quantity modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        1,000 cases
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        1,200 cases
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Unit price modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        US $45.50
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        US $48.75
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Note modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        Standard delivery terms
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        Expedited delivery requested
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
              
              {/* Footer */}
              <Box mt="half">
                <Text fontSize="small" color="midGrey">
                  Modified by Customer Representative on February 1, 2025 at 11:30 AM
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  ),
};

// Example 5: Complete Entry with All Group Types
export const CompleteEntryExample: Story = {
  render: () => (
    <ApplicationFrame
      brand="nulogy"
      primaryMenu={[
        { label: "Order management", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Inventory management", href: "#" },
        { label: "Items", href: "#" },
        { label: "Import and exports", href: "#" },
      ]}
      secondaryMenu={[
        { icon: "search", href: "#", label: "Search" },
        { icon: "settings", href: "#", label: "Settings" },
        { icon: "guide", href: "#", label: "Guide" },
        { icon: "help", href: "#", label: "Help" },
      ]}
    >
      <Page>
        <Box p="x2">
          <Breadcrumbs>
            <Link href="#">POLI lot</Link>
            <Link href="#">History Log Rules</Link>
            <Link href="#">Complete Entry Example</Link>
          </Breadcrumbs>
          
          <Box mt="x2">
            <Text fontSize="large" fontWeight="bold" mb="x2">
              Example 5: Complete Entry with All Group Types
            </Text>
            
            {/* Entry 5: Complete Entry with All Group Types */}
            <Flex flexDirection="column" gap="x2" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
              {/* Group 1: Production Record */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Production record
                  </Box>
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Expected quantity modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        1,000 cases
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        1,200 cases
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>

              {/* Group 2: Actual Production Record 001 */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Actual production record
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <RecordNumberPill 
                    number="001"
                    tooltip="Actual production record #001"
                    style={{ display: 'inline-block' }}
                  />
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    January 29, 2025
                  </Box>
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Actual quantity modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        950 cases
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        1,150 cases
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>

              {/* Group 3: Subcomponent Consumption Record 001 */}
              <Box mb="half">
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Subcomponent consumption record
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <RecordNumberPill 
                    number="001"
                    tooltip="Subcomponent consumption record #001"
                    style={{ display: 'inline-block' }}
                  />
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    January 29, 2025
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    Actual production
                  </Box>
                  <Box as="span" color="midGrey" mx="half">
                    {" "}
                    –{" "}
                  </Box>
                  <RecordNumberPill 
                    number="001"
                    tooltip="Actual production record #001"
                    style={{ display: 'inline-block' }}
                  />
                </Text>
              </Box>
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Box as="span" color="black">
                      Item modified
                    </Box>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Flex as="span" alignItems="center" gap="half">
                      <Box as="span" color="midGrey">
                        Raw Material A
                      </Box>
                      <Icon icon="arrowForward" color="grey" size="x2_5" />
                      <Box as="span" color="black">
                        Raw Material A (Grade 2)
                      </Box>
                    </Flex>
                  </DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
              
              {/* Footer */}
              <Box mt="half">
                <Text fontSize="small" color="midGrey">
                  Modified by System Administrator on February 2, 2025 at 4:20 PM
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Page>
    </ApplicationFrame>
  ),
};
