import React, { useMemo, useState } from "react";
import { toast } from "../../..";
import {
  ApplicationFrame,
  Box,
  Breadcrumbs,
  BrandedNavBar,
  DescriptionDetails,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
  Flex,
  Header,
  Icon,
  IconicButton,
  Link,
  Page,
  PrimaryButton,
  QuietButton,
  Sidebar,
  StatusIndicator,
  Tab,
  Table,
  Tabs,
  Text,
  ToastContainer,
  Tooltip,
  TruncatedText,
  DatePicker,
  FieldLabel,
  Toggle,
} from "../../..";
import { differenceInDays } from "date-fns";

export default {
  title: "Projects/Supplier Collaboration/Milestone editing",
  parameters: {
    layout: "fullscreen",
  },
};

type MilestoneType = "System" | "Custom";
type AdjustmentType = "system calculated" | "user adjusted";

interface Milestone {
  id: string;
  timelineOrder: number;
  milestone: string;
  type: MilestoneType;
  expectedCompletion: Date;
  actualCompletion: Date | null;
  actualCompletionSource: "system" | "user" | null;
  adjustmentType: AdjustmentType;
  originalExpectedCompletion: Date | null;
}

const CURRENT_MILESTONE_ID = "4";
const PROD_COMPLETE_MILESTONE_ID = "6";

const formatDateYYYYMonDD = (date: Date | null): string => {
  if (!date) return "-";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate().toString().padStart(2, "0");
  return `${date.getFullYear()}-${months[date.getMonth()]}-${day}`;
};

const initialMilestones: Milestone[] = [
  {
    id: "1",
    timelineOrder: 1,
    milestone: "PO created",
    type: "System",
    expectedCompletion: new Date("2024-12-16"),
    actualCompletion: new Date("2024-12-16"),
    actualCompletionSource: "system",
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "2",
    timelineOrder: 2,
    milestone: "PO accepted",
    type: "System",
    expectedCompletion: new Date("2024-12-19"),
    actualCompletion: new Date("2024-12-19"),
    actualCompletionSource: "system",
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "3",
    timelineOrder: 3,
    milestone: "Materials available",
    type: "Custom",
    expectedCompletion: new Date("2024-12-21"),
    actualCompletion: new Date("2024-12-19"),
    actualCompletionSource: null,
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "4",
    timelineOrder: 4,
    milestone: "Inventory picked",
    type: "Custom",
    expectedCompletion: new Date("2024-12-23"),
    actualCompletion: null,
    actualCompletionSource: null,
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "5",
    timelineOrder: 5,
    milestone: "Production started",
    type: "System",
    expectedCompletion: new Date("2024-12-24"),
    actualCompletion: null,
    actualCompletionSource: null,
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "6",
    timelineOrder: 6,
    milestone: "Production complete",
    type: "System",
    expectedCompletion: new Date("2024-12-27"),
    actualCompletion: null,
    actualCompletionSource: null,
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "7",
    timelineOrder: 7,
    milestone: "Quality release",
    type: "Custom",
    expectedCompletion: new Date("2024-12-30"),
    actualCompletion: null,
    actualCompletionSource: null,
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
  {
    id: "8",
    timelineOrder: 8,
    milestone: "Shipment started",
    type: "Custom",
    expectedCompletion: new Date("2024-12-31"),
    actualCompletion: null,
    actualCompletionSource: null,
    adjustmentType: "system calculated",
    originalExpectedCompletion: null,
  },
];

export const Default = () => {
  // Match original tab set, but default to Milestone performance for this story’s purpose.
  const [selectedIndex, setSelectedIndex] = useState(3);

  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [isMilestoneEditSidebarOpen, setIsMilestoneEditSidebarOpen] = useState(false);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [editingExpectedCompletion, setEditingExpectedCompletion] = useState<Date | null>(null);
  const [editingActualCompletion, setEditingActualCompletion] = useState<Date | null>(null);
  const [recalculateFollowing, setRecalculateFollowing] = useState(false);
  const [productionStatus, setProductionStatus] = useState<"Not started" | "In progress" | "Completed" | "Carry over">(
    "Not started"
  );

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Home
      </Link>
      <Link href="#" onClick={(e) => e.preventDefault()}>
        PO line items
      </Link>
    </Breadcrumbs>
  );

  const primaryMenu = [
    { name: "Order management", href: "#" },
    { name: "Production planning", href: "#" },
    { name: "Inventory management", href: "#" },
    { name: "Quality control", href: "#" },
  ];

  const secondaryMenu = [
    {
      name: "Lot traceability",
      items: [
        { name: "Overview", href: "#" },
        { name: "Production records", href: "#" },
        { name: "Quality reports", href: "#" },
      ],
    },
  ];

  const calculatePerformance = (milestone: Milestone) => {
    if (!milestone.actualCompletion) {
      return { type: "missing" as const, days: 0 };
    }
    const diffDays = differenceInDays(milestone.actualCompletion, milestone.expectedCompletion);
    if (diffDays > 0) return { type: "late" as const, days: diffDays };
    if (diffDays < 0) return { type: "early" as const, days: Math.abs(diffDays) };
    return { type: "ontime" as const, days: 0 };
  };

  const handleEditMilestone = (milestoneId: string) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (!milestone) return;

    setSelectedMilestoneId(milestoneId);
    setEditingExpectedCompletion(new Date(milestone.expectedCompletion));
    setEditingActualCompletion(milestone.actualCompletion ? new Date(milestone.actualCompletion) : null);
    setRecalculateFollowing(false);
    setIsMilestoneEditSidebarOpen(true);
  };

  const handleCancelMilestoneEdit = () => {
    setIsMilestoneEditSidebarOpen(false);
    setSelectedMilestoneId(null);
    setEditingExpectedCompletion(null);
    setEditingActualCompletion(null);
    setRecalculateFollowing(false);
  };

  const handleSaveMilestone = () => {
    if (!selectedMilestoneId || !editingExpectedCompletion) return;

    setMilestones((prev) => {
      const updated = [...prev];
      const updatedIndexById = new Map(updated.map((m, i) => [m.id, i]));
      const prevByTimeline = [...prev].sort((a, b) => a.timelineOrder - b.timelineOrder);

      const selectedTimelineIndex = prevByTimeline.findIndex((m) => m.id === selectedMilestoneId);
      if (selectedTimelineIndex === -1) return prev;

      const selectedUpdatedIndex = updatedIndexById.get(selectedMilestoneId);
      if (selectedUpdatedIndex == null) return prev;

      const currentMilestone = updated[selectedUpdatedIndex];
      const originalExpectedCompletion = currentMilestone.originalExpectedCompletion
        ? currentMilestone.originalExpectedCompletion
        : new Date(currentMilestone.expectedCompletion);

      const didActualCompletionChange =
        (currentMilestone.actualCompletion?.getTime() ?? null) !== (editingActualCompletion?.getTime() ?? null);

      const nextActualCompletionSource: "system" | "user" | null =
        editingActualCompletion == null
          ? null
          : !didActualCompletionChange && currentMilestone.actualCompletionSource === "system"
            ? "system"
            : "user";

      updated[selectedUpdatedIndex] = {
        ...updated[selectedUpdatedIndex],
        expectedCompletion: editingExpectedCompletion,
        actualCompletion: editingActualCompletion,
        actualCompletionSource: nextActualCompletionSource,
        adjustmentType: "user adjusted",
        originalExpectedCompletion,
      };

      if (recalculateFollowing) {
        for (let i = selectedTimelineIndex; i < prevByTimeline.length - 1; i++) {
          const currentId = prevByTimeline[i].id;
          const nextId = prevByTimeline[i + 1].id;

          const currentUpdatedIndex = updatedIndexById.get(currentId);
          const nextUpdatedIndex = updatedIndexById.get(nextId);
          if (currentUpdatedIndex == null || nextUpdatedIndex == null) continue;

          const prevCurrentExpected = prevByTimeline[i].expectedCompletion;
          const prevNextExpected = prevByTimeline[i + 1].expectedCompletion;
          const originalLeadTime = prevNextExpected.getTime() - prevCurrentExpected.getTime();

          const currentExpectedNow = updated[currentUpdatedIndex].expectedCompletion;
          const nextOriginalExpectedCompletion = updated[nextUpdatedIndex].originalExpectedCompletion
            ? updated[nextUpdatedIndex].originalExpectedCompletion
            : new Date(prevNextExpected);

          updated[nextUpdatedIndex] = {
            ...updated[nextUpdatedIndex],
            expectedCompletion: new Date(currentExpectedNow.getTime() + originalLeadTime),
            adjustmentType: "user adjusted",
            originalExpectedCompletion: nextOriginalExpectedCompletion,
          };
        }
      }

      return [...updated].sort((a, b) => {
        const diff = a.expectedCompletion.getTime() - b.expectedCompletion.getTime();
        return diff !== 0 ? diff : a.timelineOrder - b.timelineOrder;
      });
    });

    handleCancelMilestoneEdit();
    toast.success("Milestone completion updated");
  };

  const selectedMilestone = useMemo(() => {
    if (!selectedMilestoneId) return null;
    return milestones.find((m) => m.id === selectedMilestoneId) ?? null;
  }, [milestones, selectedMilestoneId]);

  const formattedMilestones = useMemo(() => {
    return milestones.map((milestone) => {
      const performance = calculatePerformance(milestone);

      let performanceDisplay: React.ReactNode;
      if (performance.type === "missing") {
        performanceDisplay = (
          <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
            Missing data
          </Text>
        );
      } else if (performance.type === "late") {
        performanceDisplay = (
          <Flex
            flexDirection={{ extraSmall: "column", large: "row" }}
            gap="x0_75"
            my="x0_5"
            alignItems={{ extraSmall: "flex-start", large: "center" }}
          >
            <StatusIndicator type="danger" alignSelf={{ extraSmall: "flex-start", large: "center" }}>
              Late
            </StatusIndicator>
            <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
              {performance.days} {performance.days === 1 ? "day" : "days"} late
            </Text>
          </Flex>
        );
      } else if (performance.type === "early") {
        performanceDisplay = (
          <Flex
            flexDirection={{ extraSmall: "column", large: "row" }}
            gap="x0_75"
            my="x0_5"
            alignItems={{ extraSmall: "flex-start", large: "center" }}
          >
            <StatusIndicator type="success" alignSelf={{ extraSmall: "flex-start", large: "center" }}>
              On time
            </StatusIndicator>
            <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
              {performance.days} {performance.days === 1 ? "day" : "days"} early
            </Text>
          </Flex>
        );
      } else {
        performanceDisplay = <StatusIndicator type="success">On time</StatusIndicator>;
      }

      const isCurrent = milestone.id === CURRENT_MILESTONE_ID;
      const isCompletion = milestone.id === PROD_COMPLETE_MILESTONE_ID;

      const milestoneText = (
        <Flex alignItems="center" gap="x1">
          <TruncatedText
            fontSize="small"
            lineHeight="smallRelaxed"
            maxWidth={isCurrent ? "312px" : isCompletion ? "288px" : "414px"}
          >
            {milestone.milestone}
          </TruncatedText>
          {isCurrent && (
            <Box maxWidth="64px">
              <StatusIndicator type="informative">Current</StatusIndicator>
            </Box>
          )}
          {isCompletion && (
            <Box maxWidth="88px">
              <StatusIndicator type="dark">Completion</StatusIndicator>
            </Box>
          )}
        </Flex>
      );

      const expectedCompletionDisplay = (
        <Flex alignItems="center" gap="x1">
          <Text fontSize="small" lineHeight="smallRelaxed">
            {formatDateYYYYMonDD(milestone.expectedCompletion)}
          </Text>
          {milestone.adjustmentType === "user adjusted" && (
            <StatusIndicator type="quiet">User adjusted</StatusIndicator>
          )}
        </Flex>
      );

      const expectedCompletionSecondaryRow =
        milestone.adjustmentType === "user adjusted" && milestone.originalExpectedCompletion
          ? formatDateYYYYMonDD(milestone.originalExpectedCompletion)
          : null;

      const actualCompletionDisplay = (
        <Flex alignItems="center" gap="x1">
          <Text fontSize="small" lineHeight="smallRelaxed">
            {formatDateYYYYMonDD(milestone.actualCompletion)}
          </Text>
          {milestone.type === "System" &&
            milestone.actualCompletion &&
            milestone.actualCompletionSource === "system" && (
              <StatusIndicator type="quiet">System completed</StatusIndicator>
            )}
        </Flex>
      );

      return {
        ...milestone,
        milestoneText,
        performanceDisplay,
        expectedCompletionDisplay,
        expectedCompletionSecondaryRow,
        actualCompletionDisplay,
      };
    });
  }, [milestones]);

  const milestonesColumns = useMemo(
    () => [
      {
        label: "Milestone",
        dataKey: "milestoneText",
        width: "20%",
        cellRenderer: ({ row }: { row: any }) => (
          <Flex flexDirection="column" gap="x0_25" pr="x2" my="x1_5">
            <Box minWidth="320px">{row.milestoneText}</Box>
          </Flex>
        ),
      },
      {
        label: "Performance",
        dataKey: "performanceDisplay",
        width: "20%",
        cellRenderer: ({ row }: { row: any }) => <Box>{row.performanceDisplay}</Box>,
      },
      {
        label: "Expected completion date",
        dataKey: "expectedCompletionDisplay",
        width: "20%",
        headerFormatter: () => (
          <Flex gap="x0_5" alignItems="center">
            <Text>Expected completion date</Text>
            <Tooltip tooltip="Expected completion dates are system-calculated based on the lead-times configured for each milestone in the trading partnership’s timeline, but can be adjusted by users.">
              <Icon icon="info" size="x2_5" color="darkGrey" />
            </Tooltip>
          </Flex>
        ),
        cellRenderer: ({ row }: { row: any }) => (
          <Flex flexDirection="column" gap="x0_5" my="x0_5">
            <Box>{row.expectedCompletionDisplay}</Box>
            {row.expectedCompletionSecondaryRow && (
              <Box>
                <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                  {row.expectedCompletionSecondaryRow}
                </Text>
              </Box>
            )}
          </Flex>
        ),
      },
      {
        label: "Actual completion date",
        dataKey: "actualCompletionDisplay",
        width: "auto",
        cellRenderer: ({ row }: { row: any }) => row.actualCompletionDisplay,
      },
      {
        label: "",
        dataKey: "actions",
        width: "48px",
        cellRenderer: ({ row }: { row: any }) => (
          <IconicButton
            mx="x1"
            icon="edit"
            labelHidden
            tooltip="Edit completion"
            onClick={() => handleEditMilestone(row.id)}
          />
        ),
      },
    ],
    [handleEditMilestone]
  );

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }

          /* Vertically center all table cells (including first column) */
          .milestone-editing-table td, .milestone-editing-table th {
            vertical-align: middle;
          }

          /* When using column.cellRenderer, NDS Table renders a raw <td> (no default padding).
             Match design-repo: left/right padding only; vertical spacing comes from inner content margins. */
          .milestone-editing-table td {
            padding-left: 8px !important;
            padding-right: 8px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        `}
      </style>

      <ToastContainer />

      <Header
        breakpoints={{ medium: 1200 }}
        renderBreadcrumbs={() => breadcrumbs}
        title="PO-2025-001"
        subtitle="ITEM-001 Premium Packaging"
      />

      <Page>
        {/* Action bar above details (matches original pattern) */}
        <Flex justifyContent="flex-end" alignItems="center" gap="x0_5" mb="x3">
          <IconicButton
            icon="edit"
            labelHidden
            tooltip="Edit details"
            onClick={() => toast.success("Edit details")}
            type="button"
          >
            Edit details
          </IconicButton>
        </Flex>

        {/* Details section above tabs */}
        <Box mb="x3" pl="x3" pb="x1">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">PO number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>PO-2025-001</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>POLI-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SPLI-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Created on</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>February 1, 2025</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Global Manufacturing Co.</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>ITEM-001 – Premium Packaging Solution</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's item code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>GMC-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>High</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>LOT-2025-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>GMC-LOT-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Item order type</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Standard</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Rev 1.2 – 2025-Jan-10</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Warehouse A - 123 Main St, City, State 12345</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            {(productionStatus === "Completed" || productionStatus === "Carry over") && (
              <>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Need by date</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>February 15, 2025</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Close production note</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>Production completed successfully</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
                {productionStatus === "Carry over" && (
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Text color="darkGrey">Carry over sent to</Text>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Link underline={false}>PO-2025-002</Link>
                    </DescriptionDetails>
                  </DescriptionGroup>
                )}
              </>
            )}
          </DescriptionList>
        </Box>

        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="Production records">
            <Box>
              <Flex justifyContent="flex-end" alignItems="center" gap="x3" mb="x3" px="x3" py="x2">
                <IconicButton icon="add" onClick={() => toast.success("Create production record")}>
                  Create production record
                </IconicButton>
                {(productionStatus === "In progress" ||
                  productionStatus === "Completed" ||
                  productionStatus === "Carry over") && (
                  <IconicButton
                    icon="cancel"
                    onClick={() => toast.success("Close production")}
                    disabled={productionStatus === "Completed" || productionStatus === "Carry over"}
                  >
                    Close production
                  </IconicButton>
                )}
                {(productionStatus === "Completed" || productionStatus === "Carry over") && (
                  <IconicButton
                    icon="arrowForward"
                    onClick={() => toast.success("Carry over")}
                    disabled={productionStatus === "Carry over"}
                  >
                    Carry over
                  </IconicButton>
                )}
              </Flex>

              {/* Small helper control to demo the button states */}
              <Box px="x3" pb="x4">
                <Flex alignItems="center" gap="x1">
                  <Text fontSize="small" color="midGrey">
                    Production status:
                  </Text>
                  <Box width="220px">
                    <select
                      value={productionStatus}
                      onChange={(e) =>
                        setProductionStatus(
                          e.target.value as "Not started" | "In progress" | "Completed" | "Carry over"
                        )
                      }
                    >
                      <option value="Not started">Not started</option>
                      <option value="In progress">In progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Carry over">Carry over</option>
                    </select>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Tab>
          <Tab label="Attachments">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="Milestone performance">
            {/* Match original wrapper/layout closely */}
            <Box className="milestone-editing-table" p="x1" minWidth="1092px" width="100%">
              <Table columns={milestonesColumns as any} rows={formattedMilestones as any} keyField="id" />
            </Box>
          </Tab>
          <Tab label="History log">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
        </Tabs>

        {/* Milestone Edit Sidebar */}
        <Sidebar
          isOpen={isMilestoneEditSidebarOpen}
          onClose={handleCancelMilestoneEdit}
          title="Edit completion"
          helpText={selectedMilestone ? `Milestone: ${selectedMilestone.milestone}` : undefined}
          footer={
            <Flex gap="x1_5" justifyContent="flex-start">
              <PrimaryButton type="button" onClick={handleSaveMilestone}>
                Save
              </PrimaryButton>
              <QuietButton type="button" onClick={handleCancelMilestoneEdit}>
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3" py="x1">
            <Flex flexDirection="column" gap="x1">
              <FieldLabel htmlFor="expectedCompletion" labelText="Expected completion date" />
              <Box width="328px">
                <DatePicker
                  id="expectedCompletion"
                  selected={editingExpectedCompletion}
                  onChange={(date) => setEditingExpectedCompletion(date)}
                />
              </Box>
            </Flex>

            <Box>
              <Toggle
                id="recalculateFollowing"
                labelText="Adjust expected completion for upcoming milestones"
                helpText="Controls whether expected completion dates are recalculated for milestones that follow the selected milestone, based on lead times defined in the associated timeline."
                toggled={recalculateFollowing}
                onText="Adjust all following milestones"
                offText="Do not adjust following milestones"
                onChange={(e) => setRecalculateFollowing(e.target.checked)}
              />
            </Box>

            <Flex flexDirection="column" gap="x1">
              <FieldLabel htmlFor="actualCompletion" labelText="Actual completion date" />
              <Box width="328px">
                <DatePicker
                  id="actualCompletion"
                  selected={editingActualCompletion}
                  onChange={(date) => setEditingActualCompletion(date)}
                />
              </Box>
            </Flex>
          </Flex>
        </Sidebar>
      </Page>
    </ApplicationFrame>
  );
};
