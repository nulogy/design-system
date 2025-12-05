import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Icon,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Tooltip,
  Divider,
  VerticalDivider,
  Toggle,
  Field,
  FieldLabel,
  Select,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/History log/V2",
};

export const V2 = () => {
  const [highlights, setHighlights] = useState({
    entry: false,
    group: false,
    footer: false,
    header: false,
    body: false,
  });
  const [selectedGroupType, setSelectedGroupType] = useState("");

  // Helper function to determine if a group should be highlighted
  const shouldHighlightGroup = (groupTitle: string) => {
    if (!selectedGroupType) return false;
    return groupTitle.toLowerCase() === selectedGroupType.toLowerCase();
  };

  const RecordNumberPill = ({
    number,
    tooltip,
    placement = "top",
    fontSize = "smaller",
    style,
    mr,
  }: {
    number: string;
    tooltip?: React.ReactNode;
    placement?: "left" | "right" | "top" | "bottom";
    fontSize?: "smaller" | "small";
    style?: React.CSSProperties;
    mr?: string;
  }) => {
    const pillContent = (
      <Box
        backgroundColor="lightGrey"
        px="half"
        borderRadius="small"
        width="fit-content"
        mr={mr}
        style={{ display: "inline-block" }}
      >
        <Text
          color="darkGrey"
          fontSize={fontSize}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing=".05em"
          lineHeight="small"
          style={style}
        >
          {number}
        </Text>
      </Box>
    );
    return tooltip ? (
      <Tooltip tooltip={tooltip} placement={placement}>
        {pillContent}
      </Tooltip>
    ) : (
      pillContent
    );
  };

  return (
    <Flex flexDirection="column">
      {/* Header */}
      <Box mt="x4">
        <Flex mx="x1" justifyContent="space-between" alignItems="flex-start" mb="x2">
          <Flex flexDirection="column">
            <Text>Event / Modification</Text>
            <Text color="midGrey" fontSize="small" lineHeight="smallTextCompressed">
              User, date, and time
            </Text>
          </Flex>
        </Flex>
        <Divider m="0" />
      </Box>

      {/* Log */}
      <Flex flexDirection="column">
        {/* Entry 1: PO Line Item Details */}
        <Flex
          flexDirection="column"
          gap="x1_5"
          maxWidth="1280px"
          mx="x1"
          pt="x1_5"
          pb="x2_5"
          border={highlights.entry ? "2px dashed" : "none"}
          borderColor={highlights.entry ? "blue" : "transparent"}
          p={highlights.entry ? "x1" : undefined}
          borderRadius={highlights.entry ? "small" : undefined}
        >
          {/* Group 1: PO Line Item Details */}
          {highlights.group || selectedGroupType ? (
            <Box
              border="2px dashed"
              borderColor={shouldHighlightGroup("PO line item details") ? "blue" : "green"}
              backgroundColor={shouldHighlightGroup("PO line item details") ? "lightBlue" : undefined}
              p="x1"
              borderRadius="small"
            >
              <Flex flexDirection="column" gap="x1_5">
                <Box
                  pt="x1"
                  border={highlights.header ? "2px dashed" : "none"}
                  borderColor={highlights.header ? "red" : "transparent"}
                  p={highlights.header ? "x1" : undefined}
                  borderRadius={highlights.header ? "small" : undefined}
                >
                  <Text fontSize="small" lineHeight="smallCompact">
                    <Box as="span" color="black" fontWeight="bold">
                      PO line item details
                    </Box>
                  </Text>
                </Box>
                <Box
                  border={highlights.body ? "2px dashed" : "none"}
                  borderColor={highlights.body ? "orange" : "transparent"}
                  p={highlights.body ? "x1" : "0"}
                  borderRadius={highlights.body ? "small" : undefined}
                >
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
                </Box>
              </Flex>
            </Box>
          ) : (
            <>
              <Box
                pt="x1"
                border={highlights.header ? "2px dashed" : "none"}
                borderColor={highlights.header ? "red" : "transparent"}
                p={highlights.header ? "x1" : undefined}
                borderRadius={highlights.header ? "small" : undefined}
              >
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    PO line item details
                  </Box>
                </Text>
              </Box>
              <Box
                border={highlights.body ? "2px dashed" : "none"}
                borderColor={highlights.body ? "orange" : "transparent"}
                p={highlights.body ? "x1" : "0"}
                borderRadius={highlights.body ? "small" : undefined}
              >
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
              </Box>
            </>
          )}

          <Box
            mt="half"
            border={highlights.footer ? "2px dashed" : "none"}
            borderColor={highlights.footer ? "purple" : "transparent"}
            p={highlights.footer ? "x1" : undefined}
            borderRadius={highlights.footer ? "small" : undefined}
          >
            <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
              by
              <Box as="span" color="black" fontWeight="normal" mx="half">
                jennifer.martinez@customer.com
              </Box>
              on
              <Box as="span" color="black" fontWeight="normal" mx="half">
                January 25th, 2025
              </Box>
              at
              <Box as="span" color="black" fontWeight="normal" mx="half">
                10:15:25AM
              </Box>
            </Text>
          </Box>
        </Flex>

        {/* Divider */}
        <Divider m="0" />

        {/* Entry 2: Collaboration */}
        <Flex
          flexDirection="column"
          gap="x1_5"
          maxWidth="1280px"
          mx="x1"
          pt="x1_5"
          pb="x2_5"
          border={highlights.entry ? "2px dashed" : "none"}
          borderColor={highlights.entry ? "blue" : "transparent"}
          p={highlights.entry ? "x1" : undefined}
          borderRadius={highlights.entry ? "small" : undefined}
        >
          {/* Group: Collaboration */}
          {highlights.group || selectedGroupType ? (
            <Box
              border="2px dashed"
              borderColor={shouldHighlightGroup("Collaboration") ? "blue" : "green"}
              backgroundColor={shouldHighlightGroup("Collaboration") ? "lightBlue" : undefined}
              p="x1"
              borderRadius="small"
            >
              <Flex flexDirection="column" gap="x1_5">
                <Box
                  pt="x1"
                  border={highlights.header ? "2px dashed" : "none"}
                  borderColor={highlights.header ? "red" : "transparent"}
                  p={highlights.header ? "x1" : undefined}
                  borderRadius={highlights.header ? "small" : undefined}
                >
                  <Text fontSize="small" lineHeight="smallCompact">
                    <Box as="span" color="black" fontWeight="bold">
                      Collaboration
                    </Box>
                  </Text>
                </Box>
                <Box
                  border={highlights.body ? "2px dashed" : "none"}
                  borderColor={highlights.body ? "orange" : "transparent"}
                  p={highlights.body ? "x1" : "0"}
                  borderRadius={highlights.body ? "small" : undefined}
                >
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
                            US $45.00
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            US $48.75
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>
              </Flex>
            </Box>
          ) : (
            <>
              <Box
                pt="x1"
                border={highlights.header ? "2px dashed" : "none"}
                borderColor={highlights.header ? "red" : "transparent"}
                p={highlights.header ? "x1" : undefined}
                borderRadius={highlights.header ? "small" : undefined}
              >
                <Text fontSize="small" lineHeight="smallCompact">
                  <Box as="span" color="black" fontWeight="bold">
                    Collaboration
                  </Box>
                </Text>
              </Box>
              <Box
                border={highlights.body ? "2px dashed" : "none"}
                borderColor={highlights.body ? "orange" : "transparent"}
                p={highlights.body ? "x1" : "0"}
                borderRadius={highlights.body ? "small" : undefined}
              >
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
                          US $45.00
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          US $48.75
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
              </Box>
            </>
          )}

          <Box
            mt="half"
            border={highlights.footer ? "2px dashed" : "none"}
            borderColor={highlights.footer ? "purple" : "transparent"}
            p={highlights.footer ? "x1" : undefined}
            borderRadius={highlights.footer ? "small" : undefined}
          >
            <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
              by
              <Box as="span" color="black" fontWeight="normal" mx="half">
                customer.rep@customer.com
              </Box>
              on
              <Box as="span" color="black" fontWeight="normal" mx="half">
                January 26th, 2025
              </Box>
              at
              <Box as="span" color="black" fontWeight="normal" mx="half">
                2:30:15PM
              </Box>
            </Text>
          </Box>
        </Flex>

        {/* Divider */}
        <Divider m="0" />

        {/* Entry 3: Combined Production Record + Actual Production Record + Subcomponent Consumption Record */}
        <Flex
          flexDirection="column"
          gap="x1_5"
          maxWidth="1280px"
          mx="x1"
          pt="x1_5"
          pb="x2_5"
          border={highlights.entry ? "2px dashed" : "none"}
          borderColor={highlights.entry ? "blue" : "transparent"}
          p={highlights.entry ? "x1" : undefined}
          borderRadius={highlights.entry ? "small" : undefined}
        >
          {/* Group 1: Production Record */}
          {highlights.group || selectedGroupType ? (
            <Box
              border="2px dashed"
              borderColor={shouldHighlightGroup("Production record") ? "blue" : "green"}
              backgroundColor={shouldHighlightGroup("Production record") ? "lightBlue" : undefined}
              p="x1"
              borderRadius="small"
            >
              <Flex flexDirection="column" gap="x1_5">
                <Box
                  pt="x1"
                  border={highlights.header ? "2px dashed" : "none"}
                  borderColor={highlights.header ? "red" : "transparent"}
                  p={highlights.header ? "x1" : undefined}
                  borderRadius={highlights.header ? "small" : undefined}
                >
                  <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                    <Box as="span" color="black" fontWeight="bold">
                      Production record
                    </Box>
                    <Box as="span" color="midGrey">
                      for
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      January 29, 2025
                    </Box>
                  </Flex>
                </Box>
                <Box
                  border={highlights.body ? "2px dashed" : "none"}
                  borderColor={highlights.body ? "orange" : "transparent"}
                  p={highlights.body ? "x1" : "0"}
                  borderRadius={highlights.body ? "small" : undefined}
                >
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
                </Box>
              </Flex>
            </Box>
          ) : (
            <>
              <Box
                pt="x1"
                border={highlights.header ? "2px dashed" : "none"}
                borderColor={highlights.header ? "red" : "transparent"}
                p={highlights.header ? "x1" : undefined}
                borderRadius={highlights.header ? "small" : undefined}
              >
                <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                  <Box as="span" color="black" fontWeight="bold">
                    Production record
                  </Box>
                  <Box as="span" color="midGrey">
                    for
                  </Box>
                  <Box as="span" color="black" fontWeight="bold">
                    January 29, 2025
                  </Box>
                </Flex>
              </Box>
              <Box
                border={highlights.body ? "2px dashed" : "none"}
                borderColor={highlights.body ? "orange" : "transparent"}
                p={highlights.body ? "x1" : "0"}
                borderRadius={highlights.body ? "small" : undefined}
              >
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
              </Box>
            </>
          )}

          {/* Group 2: Actual Production Record 001 */}
          {highlights.group || selectedGroupType ? (
            <Box
              border="2px dashed"
              borderColor={shouldHighlightGroup("Actual production record") ? "blue" : "green"}
              backgroundColor={shouldHighlightGroup("Actual production record") ? "lightBlue" : undefined}
              p="x1"
              borderRadius="small"
            >
              <Flex flexDirection="column" gap="x1_5">
                <Box
                  pt="x1"
                  border={highlights.header ? "2px dashed" : "none"}
                  borderColor={highlights.header ? "red" : "transparent"}
                  p={highlights.header ? "x1" : undefined}
                  borderRadius={highlights.header ? "small" : undefined}
                >
                  <Flex flexDirection="column" gap="x0_5" fontSize="small" lineHeight="smallCompact">
                    <Flex alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                    </Flex>
                    <Flex alignItems="center" gap="half" pl="24px">
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for Pallet number
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        PAL-002
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Supplier's lot code
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        SUP-LOT-001
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Expiry date
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        March 15, 2026
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
                <Box
                  border={highlights.body ? "2px dashed" : "none"}
                  borderColor={highlights.body ? "orange" : "transparent"}
                  p={highlights.body ? "x1" : "0"}
                  borderRadius={highlights.body ? "small" : undefined}
                  pl="24px"
                >
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
                  </DescriptionList>
                </Box>
              </Flex>
            </Box>
          ) : (
            <>
              <Box
                pt="x1"
                border={highlights.header ? "2px dashed" : "none"}
                borderColor={highlights.header ? "red" : "transparent"}
                p={highlights.header ? "x1" : undefined}
                borderRadius={highlights.header ? "small" : undefined}
              >
                <Flex flexDirection="column" gap="x0_5" fontSize="small" lineHeight="smallCompact">
                  <Flex alignItems="center" gap="half">
                    <Box as="span" color="black" fontWeight="bold">
                      Production record
                    </Box>
                    <Box as="span" color="midGrey">
                      for
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      January 29, 2025
                    </Box>
                  </Flex>
                  <Flex alignItems="center" gap="half" pl="24px">
                    <Box as="span" color="black" fontWeight="bold">
                      Actual production record
                    </Box>
                    <Box as="span" color="midGrey">
                      for Pallet number
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      PAL-001A
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Supplier's lot code
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      SUP-LOT-001
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Expiry date
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      March 15, 2026
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              <Box
                border={highlights.body ? "2px dashed" : "none"}
                borderColor={highlights.body ? "orange" : "transparent"}
                p={highlights.body ? "x1" : "0"}
                borderRadius={highlights.body ? "small" : undefined}
                pl="24px"
              >
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
                          1,000 cases
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
                          PAL-001A
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
                          LOT-001
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          LOT-001B
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
              </Box>
            </>
          )}

          {/* Group 3: Subcomponent Consumption Record 001 */}
          {highlights.group || selectedGroupType ? (
            <Box
              border="2px dashed"
              borderColor={shouldHighlightGroup("Subcomponent consumption record") ? "blue" : "green"}
              backgroundColor={shouldHighlightGroup("Subcomponent consumption record") ? "lightBlue" : undefined}
              p="x1"
              borderRadius="small"
            >
              <Flex flexDirection="column" gap="x1_5">
                <Box
                  pt="x1"
                  border={highlights.header ? "2px dashed" : "none"}
                  borderColor={highlights.header ? "red" : "transparent"}
                  p={highlights.header ? "x1" : undefined}
                  borderRadius={highlights.header ? "small" : undefined}
                >
                  <Flex flexDirection="column" gap="x0_5" fontSize="small" lineHeight="smallCompact">
                    <Flex alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                    </Flex>
                    <Flex alignItems="center" gap="half" pl="24px">
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for Pallet number
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        PAL-002
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Customer lot code
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        CUST-LOT-001
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Supplier lot code
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        SUP-LOT-001
                      </Box>
                    </Flex>
                    <Flex alignItems="center" gap="half" pl="48px">
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                      </Box>
                      <Box as="span" color="midGrey">
                        for Item code
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        RM-A-G2
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Supplier's lot code
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        SUP-SUB-LOT-001
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Expiry date
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        April 20, 2026
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="midGrey">
                        Pallet number
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        PAL-SUB-001
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
                <Box
                  border={highlights.body ? "2px dashed" : "none"}
                  borderColor={highlights.body ? "orange" : "transparent"}
                  p={highlights.body ? "x1" : "0"}
                  borderRadius={highlights.body ? "small" : undefined}
                  pl="48px"
                >
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
                          Lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            RM-2025-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            RM-2025-001A
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
                  </DescriptionList>
                </Box>
              </Flex>
            </Box>
          ) : (
            <>
              <Box
                pt="x1"
                border={highlights.header ? "2px dashed" : "none"}
                borderColor={highlights.header ? "red" : "transparent"}
                p={highlights.header ? "x1" : undefined}
                borderRadius={highlights.header ? "small" : undefined}
              >
                <Flex flexDirection="column" gap="x0_5" fontSize="small" lineHeight="smallCompact">
                  <Flex alignItems="center" gap="half">
                    <Box as="span" color="black" fontWeight="bold">
                      Production record
                    </Box>
                    <Box as="span" color="midGrey">
                      for
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      January 29, 2025
                    </Box>
                  </Flex>
                  <Flex alignItems="center" gap="half" pl="24px">
                    <Box as="span" color="black" fontWeight="bold">
                      Actual production record
                    </Box>
                    <Box as="span" color="midGrey">
                      for Pallet number
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      PAL-001A
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Customer lot code
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      CUST-LOT-001
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Supplier lot code
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      SUP-LOT-001
                    </Box>
                  </Flex>
                  <Flex alignItems="center" gap="half" pl="48px">
                    <Box as="span" color="black" fontWeight="bold">
                      Subcomponent consumption record
                    </Box>
                    <Box as="span" color="midGrey">
                      for Item code
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      RM-A-G2
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Supplier's lot code
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      SUP-SUB-LOT-001
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Expiry date
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      April 20, 2026
                    </Box>
                    <Box as="span" color="midGrey">
                      –
                    </Box>
                    <Box as="span" color="midGrey">
                      Pallet number
                    </Box>
                    <Box as="span" color="black" fontWeight="bold">
                      PAL-SUB-001
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              <Box
                border={highlights.body ? "2px dashed" : "none"}
                borderColor={highlights.body ? "orange" : "transparent"}
                p={highlights.body ? "x1" : "0"}
                borderRadius={highlights.body ? "small" : undefined}
                pl="48px"
              >
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
                        Lot code modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          RM-2025-001
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          RM-2025-001A
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
                </DescriptionList>
              </Box>
            </>
          )}

          <Box
            mt="half"
            border={highlights.footer ? "2px dashed" : "none"}
            borderColor={highlights.footer ? "purple" : "transparent"}
            p={highlights.footer ? "x1" : undefined}
            borderRadius={highlights.footer ? "small" : undefined}
          >
            <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
              by
              <Box as="span" color="black" fontWeight="normal" mx="half">
                production.manager@supplier.com
              </Box>
              on
              <Box as="span" color="black" fontWeight="normal" mx="half">
                January 29th, 2025
              </Box>
              at
              <Box as="span" color="black" fontWeight="normal" mx="half">
                8:45:30AM
              </Box>
            </Text>
          </Box>
        </Flex>

        {/* Divider after the combined entry */}
        <Divider m="0" />
      </Flex>

      {/* Configuration Bar */}
      <Box
        position="fixed"
        bottom="x2"
        left="x2"
        right="x2"
        p="x2"
        backgroundColor="white"
        borderRadius="medium"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        border="1px solid"
        borderColor="lightGrey"
        zIndex={1000}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Flex gap="x3" flexWrap="wrap">
            <Flex alignItems="center" gap="x1">
              <Box style={{ width: "20px", height: "20px" }} backgroundColor="#FF6B6B" borderRadius="medium" />
              <Text fontSize="small" width="auto" whiteSpace="nowrap">
                Log entry
              </Text>
              <Toggle
                toggled={highlights.entry}
                onChange={(e) => setHighlights((prev) => ({ ...prev, entry: e.target.checked }))}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Box style={{ width: "20px", height: "20px" }} backgroundColor="#9B59B6" borderRadius="medium" />
              <Text fontSize="small" width="auto" whiteSpace="nowrap">
                Entry footer
              </Text>
              <Tooltip tooltip="There is only one footer per entry" placement="top">
                <Icon icon="info" color="midGrey" size="x3" />
              </Tooltip>
              <Toggle
                toggled={highlights.footer}
                onChange={(e) => setHighlights((prev) => ({ ...prev, footer: e.target.checked }))}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Box style={{ width: "20px", height: "20px" }} backgroundColor="#4ECDC4" borderRadius="medium" />
              <Text fontSize="small" width="auto" whiteSpace="nowrap">
                Entry group
              </Text>
              <Tooltip
                tooltip="Each group has a header (title bar) and body (DescriptionList). Simple entries, such as PO line item details and Collaboration, have 1 group, but complex entries like 'Production record' can have multiple groups. These groups are Production record, Actual production record and Subcomponent consumption record. Production record contains only 'Expected quantity' information. Actual production record contains 'Actual quantity', 'Pallet number', 'Lot code', 'Customer's lot code', 'Supplier's lot code', 'Expiry date', 'Note'. Subcomponent consumption record contains 'Item', 'Customer's lot code', 'Supplier's lot code', 'Expiry date', 'Pallet number', 'Quantity', 'UOM'."
                placement="top"
              >
                <Icon icon="info" color="midGrey" size="x3" />
              </Tooltip>
              <Toggle
                toggled={highlights.group}
                onChange={(e) => {
                  setHighlights((prev) => ({ ...prev, group: e.target.checked }));
                  // Clear group type selection when turning off entry group
                  if (!e.target.checked) {
                    setSelectedGroupType("");
                  }
                }}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Box style={{ width: "20px", height: "20px" }} backgroundColor="#E74C3C" borderRadius="medium" />
              <Text fontSize="small" width="auto" whiteSpace="nowrap">
                Group header
              </Text>
              <Tooltip
                tooltip="Every group has a header. PO line item details and collaboration have generic titles. Production record, Actual production record, and Subcomponent consumption records have unique titles with unique identifiers (production date, Actual production record number, subcomponent consumption record number)"
                placement="top"
              >
                <Icon icon="info" color="midGrey" size="x3" />
              </Tooltip>
              <Toggle
                toggled={highlights.header}
                onChange={(e) => setHighlights((prev) => ({ ...prev, header: e.target.checked }))}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Box style={{ width: "20px", height: "20px" }} backgroundColor="#FFA500" borderRadius="medium" />
              <Text fontSize="small" width="auto" whiteSpace="nowrap">
                Group body
              </Text>
              <Toggle
                toggled={highlights.body}
                onChange={(e) => setHighlights((prev) => ({ ...prev, body: e.target.checked }))}
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" gap="x2">
            <VerticalDivider />
            <Flex alignItems="center" gap="x1">
              <Text fontSize="small" width="auto" whiteSpace="nowrap">
                Group type:
              </Text>
              <Select
                value={selectedGroupType}
                onChange={(value) => {
                  setSelectedGroupType(String(value));
                  // Clear all other highlights when selecting a group type, but turn on group highlight
                  setHighlights({
                    entry: false,
                    group: true, // Turn on group highlight so selected group gets wrapped
                    footer: false,
                    header: false,
                    body: false,
                  });
                }}
                options={[
                  { value: "PO line item details", label: "PO line item details" },
                  { value: "Collaboration", label: "Collaboration" },
                  { value: "Production record", label: "Production record" },
                  { value: "Actual production record", label: "Actual production record" },
                  { value: "Subcomponent consumption record", label: "Subcomponent consumption record" },
                ]}
                placeholder="Select group type"
                width="200px"
                menuPlacement="top"
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
