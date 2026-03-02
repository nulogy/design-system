import React, { useState } from "react";
import { useTheme } from "styled-components";
import { toast } from "../../..";
import ndsIcons from "@nulogy/icons";
import {
  ApplicationFrame,
  Box,
  Breadcrumbs,
  BrandedNavBar,
  Card,
  DescriptionDetails,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
  Divider,
  Flex,
  Heading4,
  Icon,
  Header,
  IconicButton,
  Link,
  Modal,
  Page,
  PrimaryButton,
  QuietButton,
  Radio,
  Select,
  StatusIndicator,
  Tab,
  Tabs,
  Switch,
  Switcher,
  Text,
  Textarea,
  ToastContainer,
  TruncatedText,
  Tooltip,
  DatePicker,
  Input,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Split proposals",
  parameters: {
    layout: "fullscreen",
  },
};

type SplitProposalRow = {
  quantity: string;
  unit: string;
  productionDueDate: string;
};

// Add `arrowSplit` icon to the NDS icon set (matches design-repo implementation).
// Material Symbols Outlined: arrow_split
// Source: https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/arrow_split/default/24px.svg
if (!(ndsIcons as any).arrowSplit) {
  (ndsIcons as any).arrowSplit = {
    viewBox: "0 -960 960 960",
    path: [
      "M160-440v-80h304l200-200H560v-80h240v240h-80v-104L496-440H160Zm400 280v-80h104L536-366l58-58 126 128v-104h80v240H560Z",
    ],
  };
}

const initialFormData = {
  request: {
    quantity: "15,000",
    unit: "eaches",
    productionDueDate: "2025-Feb-28",
    unitPrice: "12.50",
    currency: "USD",
    reason: "Quality requirements",
    note: "Standard production requirements. All items must meet the specified quality standards and pass quality control inspections before shipment.",
  },
  proposal: {
    quantity: "700",
    unit: "cases",
    productionDueDate: "2025-Feb-28",
    unitPrice: "12.50",
    currency: "USD",
    reason: "Quality requirements",
    note: "Agreed to standard requirements",
  },
};

type FormData = typeof initialFormData;

const cloneFormData = (data: FormData): FormData => ({
  request: { ...data.request },
  proposal: { ...data.proposal },
});

const parseDueDate = (value: string) => {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

const formatDueDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Unit conversion for aggregation (matches design-repo): 1 case = 20 eaches, 1 pallet = 40 cases = 800 eaches
const EACHES_PER_CASE = 20;
const CASES_PER_PALLET = 40;
const EACHES_PER_PALLET = EACHES_PER_CASE * CASES_PER_PALLET;

const quantityToEaches = (qty: string, unit: string) => {
  const n = parseFloat(String(qty).replace(/,/g, "")) || 0;
  if (unit === "cases") return n * EACHES_PER_CASE;
  if (unit === "pallets") return n * EACHES_PER_PALLET;
  return n; // eaches
};

const eachesToUnit = (eaches: number, unit: string) => {
  if (unit === "cases") return eaches / EACHES_PER_CASE;
  if (unit === "pallets") return eaches / EACHES_PER_PALLET;
  return eaches; // eaches
};

// Matches design-repo: request is stored in customer UOM (eaches); proposal in supplier UOM (e.g. cases)
const CUSTOMER_UOM = "eaches";
const DEFAULT_DISPLAY_SUPPLIER_UOM = "cases";

const UNIT_OPTIONS = [
  { value: "eaches", label: "eaches" },
  { value: "cases", label: "cases" },
  { value: "pallets", label: "pallets" },
] as const;

// Aggregated proposal values for acceptance: sum quantity in eaches, latest date (for split proposals)
const getAggregatedProposalRequestUpdate = (
  proposal: { quantity: string; unit: string; productionDueDate: string },
  splitRows: { quantity: string; unit: string; productionDueDate: string }[]
): { quantity: string; productionDueDate: string } => {
  const totalEaches =
    quantityToEaches(proposal.quantity, proposal.unit || "eaches") +
    splitRows.reduce((sum, r) => sum + quantityToEaches(r.quantity, r.unit || "eaches"), 0);
  const quantityStr = Math.round(totalEaches).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const allDates = [
    parseDueDate(proposal.productionDueDate),
    ...splitRows.map((r) => parseDueDate(r.productionDueDate)),
  ].filter((d): d is Date => d != null && !Number.isNaN(d.getTime()));
  const latestDate =
    allDates.length > 0
      ? formatDueDate(new Date(Math.max(...allDates.map((d) => d.getTime()))))
      : proposal.productionDueDate || "";
  return { quantity: quantityStr, productionDueDate: latestDate };
};

export const Default = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Default to view mode (no active edit)
  const [role, setRole] = useState<"supplier" | "customer">("supplier");
  const [showConfigBar, setShowConfigBar] = useState(true);
  const [uomView, setUomView] = useState<"customer" | "supplier">("supplier");
  const [editMode, setEditMode] = useState<"request" | "proposal" | null>(null);
  const [acceptedItems, setAcceptedItems] = useState<{ request: boolean; proposal: boolean }>({
    request: false,
    proposal: false,
  });

  const [formData, setFormData] = useState<FormData>(() => cloneFormData(initialFormData));
  const [originalFormValues, setOriginalFormValues] = useState<FormData | null>(null);
  const [originalProposalSplitRows, setOriginalProposalSplitRows] = useState<SplitProposalRow[] | null>(null);

  const [proposalSplitRows, setProposalSplitRows] = useState<SplitProposalRow[]>([]);
  const [committedProposalSplitRows, setCommittedProposalSplitRows] = useState<SplitProposalRow[]>([]);
  const [requestAggregatedFromSplits, setRequestAggregatedFromSplits] = useState(false);

  const visibleProposalSplitRows = editMode === "proposal" ? proposalSplitRows : committedProposalSplitRows;

  const [collaborationState, setCollaborationState] = useState<{ activeCardAuthorRole: "customer" | "supplier" }>({
    activeCardAuthorRole: "customer",
  });
  const [supplierProposalMade, setSupplierProposalMade] = useState(true);

  // Dual acceptance (matches design-repo)
  const [acceptanceType, setAcceptanceType] = useState<"dual" | "standard">("dual");
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [acceptanceOption, setAcceptanceOption] = useState<"without-flagging" | "with-flagging">("without-flagging");
  const [isReconciled, setIsReconciled] = useState<boolean | null>(null); // null = not accepted yet, true = request updated, false = request retained
  const [isFlagged, setIsFlagged] = useState(false);

  // ReconciledIcon: standard = both checkmarks green; flagged = second checkmark grey (matches design-repo)
  const ReconciledIcon = ({ variant = "standard", size = 20 }: { variant?: "standard" | "flagged"; size?: number }) => {
    const height = (size * 13) / 25;
    const firstPathColor = "#008059";
    const secondPathColor = variant === "flagged" ? theme.colors.grey : "#008059";
    return (
      <svg width={size} height={height} viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.7003 12.025L10.5 8.825L11.925 7.4L13.7003 9.175L22.8753 0L24.3003 1.425L13.7003 12.025Z"
          fill={firstPathColor}
        />
        <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill={secondPathColor} />
      </svg>
    );
  };

  // Highlight style matches design-repo: borderBottom, yellow when "needs my response", grey otherwise
  const getMismatchStyle = (opts: {
    highlight: boolean;
    needsMyResponse: boolean; // true = current user must act → yellow, false → grey
  }) => {
    if (!opts.highlight) return undefined;
    const color = opts.needsMyResponse ? theme.colors.yellow : theme.colors.grey;
    return {
      borderBottom: `2px solid ${color}`,
      paddingBottom: 0,
      display: "inline",
    } as React.CSSProperties;
  };

  // Compare in eaches (align with design-repo); use aggregated proposal when there are splits
  const proposalAggregatedForMismatch = getAggregatedProposalRequestUpdate(
    formData.proposal,
    committedProposalSplitRows
  );
  const requestQtyEaches = quantityToEaches(formData.request.quantity, formData.request.unit || CUSTOMER_UOM);
  const proposalQtyEaches = quantityToEaches(proposalAggregatedForMismatch.quantity, "eaches");
  const qtyMismatch = requestQtyEaches !== proposalQtyEaches;
  const dueDateMismatch = formData.request.productionDueDate !== proposalAggregatedForMismatch.productionDueDate;
  const unitPriceMismatch = formData.request.unitPrice !== formData.proposal.unitPrice;

  // When in proposal edit mode, request column keeps showing in the proposal unit from edit start (don't change/recalculate when user changes proposal UOM)
  const requestColumnDisplayUnit =
    editMode === "proposal"
      ? (originalFormValues?.proposal?.unit ?? DEFAULT_DISPLAY_SUPPLIER_UOM)
      : (formData.proposal.unit ?? DEFAULT_DISPLAY_SUPPLIER_UOM);

  const enterEditMode = (mode: "request" | "proposal") => {
    setEditMode(mode);
    setOriginalFormValues(cloneFormData(formData));

    if (mode === "proposal") {
      const baseRows = committedProposalSplitRows.map((r) => ({ ...r }));
      setProposalSplitRows(baseRows);
      setOriginalProposalSplitRows(baseRows.map((r) => ({ ...r })));
    } else {
      setOriginalProposalSplitRows(null);
    }
  };

  const cancelEdit = () => {
    if (originalFormValues) setFormData(cloneFormData(originalFormValues));
    if (editMode === "proposal") {
      const originalRows = originalProposalSplitRows ?? [];
      setProposalSplitRows(originalRows.map((r) => ({ ...r })));
    }
    setEditMode(null);
    setOriginalFormValues(null);
    setOriginalProposalSplitRows(null);
  };

  const submitEdit = (mode: "request" | "proposal") => {
    if (mode === "proposal") {
      setCommittedProposalSplitRows(proposalSplitRows.map((r) => ({ ...r })));
      setCollaborationState({ activeCardAuthorRole: "supplier" });
      setSupplierProposalMade(true);
      setRequestAggregatedFromSplits(false);
    } else {
      setCollaborationState({ activeCardAuthorRole: "customer" });
    }
    setEditMode(null);
    setOriginalFormValues(null);
    setOriginalProposalSplitRows(null);
    // Reset acceptance when either side updates (matches design-repo)
    setAcceptedItems({ request: false, proposal: false });
    setIsReconciled(null);
    setIsFlagged(false);
  };

  const acceptSupplierProposal = () => {
    if (acceptanceType === "standard" && role === "customer") {
      setAcceptedItems((prev) => ({ ...prev, proposal: true }));
      const hasSplits = committedProposalSplitRows.length > 0;
      const update = hasSplits
        ? getAggregatedProposalRequestUpdate(formData.proposal, committedProposalSplitRows)
        : {
            quantity: Math.round(
              quantityToEaches(formData.proposal.quantity, formData.proposal.unit || "eaches")
            ).toLocaleString("en-US", { maximumFractionDigits: 0 }),
            productionDueDate: formData.proposal.productionDueDate || "",
          };
      setFormData((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          quantity: update.quantity,
          productionDueDate: update.productionDueDate,
          unit: "eaches",
        },
      }));
      setRequestAggregatedFromSplits(hasSplits);
      setIsReconciled(true);
      toast.success("Proposal accepted");
      return;
    }
    setIsAcceptanceModalOpen(true);
  };

  const handleAcceptanceConfirm = () => {
    setAcceptedItems((prev) => ({ ...prev, proposal: true }));

    if (acceptanceOption === "without-flagging") {
      const hasSplits = committedProposalSplitRows.length > 0;
      const update = hasSplits
        ? getAggregatedProposalRequestUpdate(formData.proposal, committedProposalSplitRows)
        : {
            quantity: Math.round(
              quantityToEaches(formData.proposal.quantity, formData.proposal.unit || "eaches")
            ).toLocaleString("en-US", { maximumFractionDigits: 0 }),
            productionDueDate: formData.proposal.productionDueDate || "",
          };
      setFormData((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          quantity: update.quantity,
          productionDueDate: update.productionDueDate,
          unit: "eaches",
        },
      }));
      setRequestAggregatedFromSplits(hasSplits);
      setIsReconciled(true);
      toast.success("Proposal accepted");
    } else {
      setRequestAggregatedFromSplits(false);
      setIsFlagged(true);
      setIsReconciled(false);
      toast.success("Proposal accepted");
    }

    setIsAcceptanceModalOpen(false);
  };

  const handleAcceptanceCancel = () => {
    setIsAcceptanceModalOpen(false);
    setAcceptanceOption("without-flagging");
  };

  const addProposalSplitRow = () => {
    setProposalSplitRows((prev) => {
      if (prev.length >= 2) return prev; // max 3 total rows (1 base + 2 splits), matches design-repo
      return [
        ...prev,
        {
          quantity: "0",
          unit: formData.proposal.unit || "cases",
          productionDueDate: formData.proposal.productionDueDate || "",
        },
      ];
    });
  };

  const removeProposalSplitRow = (idx: number) => {
    setProposalSplitRows((prev) => prev.filter((_, i) => i !== idx));
  };

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

  // Unit options aligned with design-repo (eaches, cases, pallets only)
  const unitOptions = UNIT_OPTIONS;

  const QtyDueRow = ({
    quantity,
    unit,
    productionDueDate,
    quantityTextStyle,
    dueDateTextStyle,
    my = "x1",
  }: {
    quantity: string;
    unit: string;
    productionDueDate: string;
    quantityTextStyle?: React.CSSProperties;
    dueDateTextStyle?: React.CSSProperties;
    my?: string;
  }) => (
    <Flex my={my as any} alignItems="center" flexWrap="nowrap" gap="x0_5">
      <Text style={quantityTextStyle}>{`${quantity} ${unit}`}</Text>
      <Text as="span" color="midGrey">
        on
      </Text>
      <Text style={dueDateTextStyle}>{productionDueDate}</Text>
    </Flex>
  );

  const SplitRowPlaceholder = () => <Box height={editMode === "proposal" ? "40px" : "24px"} my="x0_25" />;

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
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
        {/* Details section above tabs (same pattern as other Supplier Collaboration stories) */}
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
                <Text color="darkGrey">Supplier</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Global Manufacturing Co.</Text>
              </DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>

        {/* Floating Configuration */}
        {showConfigBar && (
          <Box
            position="fixed"
            bottom="x4"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="white"
            border="1px solid"
            borderColor="lightGrey"
            borderRadius="x1"
            boxShadow="medium"
          >
            <Flex alignItems="center" gap="x1_5" px="x2" py="x1">
              <Flex alignItems="center" gap="x1" width="275px">
                <Text width="125px" fontSize="small" color="midGrey">
                  View as:
                </Text>
                <Switcher
                  selected={role}
                  onChange={(value) => {
                    const nextRole = value as "supplier" | "customer";
                    setRole(nextRole);
                    setEditMode(null);
                    setOriginalFormValues(null);
                    setOriginalProposalSplitRows(null);
                  }}
                >
                  <Switch value="supplier">Supplier</Switch>
                  <Switch value="customer">Customer</Switch>
                </Switcher>
              </Flex>
              <Flex alignItems="center" gap="x1">
                <Text width="90px" fontSize="small" color="midGrey">
                  Acceptance:
                </Text>
                <Select
                  options={[
                    { value: "dual", label: "Dual" },
                    { value: "standard", label: "Standard" },
                  ]}
                  value={acceptanceType}
                  onChange={(option) => setAcceptanceType(option as "dual" | "standard")}
                  width="120px"
                  menuPlacement="top"
                />
              </Flex>
              <IconicButton
                icon="close"
                aria-label="Close configuration"
                onClick={() => setShowConfigBar(false)}
                type="button"
              />
            </Flex>
          </Box>
        )}

        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Box px="x3" pb="x4">
              <Flex flexDirection="column" alignItems="flex-end" mt="x2">
                <Box mb="x2">
                  <Switcher selected={uomView} onChange={(value) => setUomView(value as "customer" | "supplier")}>
                    <Switch value="customer">Customer's UOM</Switch>
                    <Switch value="supplier">Supplier's UOM</Switch>
                  </Switcher>
                </Box>
              </Flex>

              <Card p="x1" mt="x0" mx="auto" minWidth="900px" maxWidth="1500px">
                <Flex flexDirection="column" gap="x2">
                  <Flex gap="x3" p="x2" pb="0">
                    {/* Labels column */}
                    <Flex
                      flexDirection="column"
                      gap="x0_5"
                      mt="x9"
                      pl="x2_5"
                      flex={1}
                      minWidth="160px"
                      maxWidth="240px"
                    >
                      <Flex my="x1" alignItems="center" flexWrap="nowrap" gap="x0_5">
                        <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                          Quantity
                        </Text>
                        <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" color="midGrey">
                          /
                        </Text>
                        <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                          Due date
                        </Text>
                      </Flex>

                      {visibleProposalSplitRows.map((_, i) => (
                        <Box key={`label-split-${i}`} height={editMode === "proposal" ? "40px" : "24px"} my="x0_25" />
                      ))}

                      <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                        Unit price
                      </Text>
                      <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                        Reason
                      </Text>
                      <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                        Note
                      </Text>
                    </Flex>

                    {/* Customer request column */}
                    <Box minWidth="400px" maxWidth="640px" flex={1}>
                      <Flex flexDirection="column" gap="x0_25" mb="x3">
                        <Flex alignItems="center" gap="x1">
                          <Heading4 mb="0">{role === "customer" ? "Your request" : "Customer's request"}</Heading4>
                          {acceptedItems.request || acceptedItems.proposal ? (
                            <Tooltip tooltip="Accepted">
                              <Box
                                backgroundColor="lightGreen"
                                borderRadius="medium"
                                p="x0_25"
                                width="x3"
                                height="x3"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Icon icon="check" size="x2_5" color="green" />
                              </Box>
                            </Tooltip>
                          ) : (
                            <>
                              {!acceptedItems.request &&
                                !acceptedItems.proposal &&
                                role === "supplier" &&
                                collaborationState.activeCardAuthorRole === "customer" && (
                                  <Tooltip tooltip="Requires your response">
                                    <Box
                                      backgroundColor="yellow"
                                      borderRadius="medium"
                                      p="x0_25"
                                      width="x3"
                                      height="x3"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                                    </Box>
                                  </Tooltip>
                                )}
                              {!acceptedItems.request &&
                                !acceptedItems.proposal &&
                                role === "customer" &&
                                collaborationState.activeCardAuthorRole === "customer" && (
                                  <Tooltip tooltip="Awaiting supplier's response">
                                    <Box
                                      backgroundColor="whiteGrey"
                                      borderRadius="medium"
                                      p="x0_25"
                                      width="x3"
                                      height="x3"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                                    </Box>
                                  </Tooltip>
                                )}
                            </>
                          )}
                        </Flex>
                        <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                          by{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                            John D.
                          </Text>{" "}
                          on{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                            February 1, 2025
                          </Text>
                        </Text>
                      </Flex>

                      <Flex flexDirection="column" gap="x0_5">
                        {editMode === "request" ? (
                          <>
                            <Flex gap="half" alignItems="center" width="100%" flexWrap="nowrap">
                              <Box minWidth="140px" flex="1" maxWidth="280px">
                                <Input
                                  value={formData.request.quantity}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      request: { ...prev.request, quantity: e.target.value },
                                    }))
                                  }
                                  placeholder="1"
                                  inputWidth="100%"
                                />
                              </Box>
                              <Select
                                options={unitOptions}
                                value={
                                  (formData.request.unit || CUSTOMER_UOM) as (typeof UNIT_OPTIONS)[number]["value"]
                                }
                                onChange={(option) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    request: { ...prev.request, unit: option as string },
                                  }))
                                }
                                width="100%"
                                minWidth="100px"
                                maxWidth="160px"
                              />
                              <Text color="midGrey" px="x0_5">
                                on
                              </Text>
                              <Box flex="1" minWidth="220px">
                                <DatePicker
                                  selected={parseDueDate(formData.request.productionDueDate)}
                                  onChange={(date: any) => {
                                    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return;
                                    setFormData((prev) => ({
                                      ...prev,
                                      request: { ...prev.request, productionDueDate: formatDueDate(date) },
                                    }));
                                  }}
                                  onInputChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      request: { ...prev.request, productionDueDate: value },
                                    }))
                                  }
                                  inputProps={{ placeholder: "Select due date", inputWidth: "100%" }}
                                />
                              </Box>
                            </Flex>

                            {/* Keep rows aligned with proposal split rows */}
                            {visibleProposalSplitRows.map((_, i) => (
                              <SplitRowPlaceholder key={`request-placeholder-${i}`} />
                            ))}

                            <Box width="100%">
                              <Flex alignItems="flex-start">
                                <Box width="50%" maxWidth="50%">
                                  <Input
                                    value={formData.request.unitPrice}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        request: { ...prev.request, unitPrice: e.target.value },
                                      }))
                                    }
                                    placeholder="1"
                                    inputWidth="100%"
                                  />
                                </Box>
                                <Box width="160px" pt="x1" pb="x1" pl="x1">
                                  <Text>
                                    {formData.request.currency}{" "}
                                    <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                                      (per each)
                                    </Text>
                                  </Text>
                                </Box>
                              </Flex>
                            </Box>

                            <Box width="100%">
                              <Select
                                options={[
                                  { value: "Quality requirements", label: "Quality requirements" },
                                  { value: "Production delay", label: "Production delay" },
                                  { value: "Material shortage", label: "Material shortage" },
                                  { value: "Equipment maintenance", label: "Equipment maintenance" },
                                  { value: "Other", label: "Other" },
                                ]}
                                value={formData.request.reason}
                                onChange={(option) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    request: { ...prev.request, reason: option as string },
                                  }))
                                }
                                width="100%"
                                placeholder="Select reason"
                              />
                            </Box>

                            <Box width="100%">
                              <Textarea
                                value={formData.request.note}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    request: { ...prev.request, note: e.target.value },
                                  }))
                                }
                                placeholder="Enter note"
                                style={{ height: "152px" }}
                              />
                            </Box>
                          </>
                        ) : (
                          <>
                            {acceptedItems.proposal && requestAggregatedFromSplits ? (
                              <Flex my="x1" alignItems="center" flexWrap="nowrap" gap="x0_5">
                                <Text>
                                  {uomView === "customer"
                                    ? formData.request.quantity
                                    : eachesToUnit(
                                        quantityToEaches(
                                          formData.request.quantity,
                                          formData.request.unit || CUSTOMER_UOM
                                        ),
                                        requestColumnDisplayUnit
                                      ).toLocaleString("en-US", {
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 0,
                                      })}{" "}
                                  {uomView === "customer"
                                    ? formData.request.unit || CUSTOMER_UOM
                                    : requestColumnDisplayUnit}
                                </Text>
                                <Text as="span" color="midGrey">
                                  on
                                </Text>
                                <Text>{formData.request.productionDueDate}</Text>
                                <Tooltip
                                  tooltip={
                                    <Box>
                                      <Text
                                        color="midGrey"
                                        mb="x1"
                                        fontSize="small"
                                        lineHeight="smallTextCompressed"
                                        display="block"
                                      >
                                        Split request
                                      </Text>
                                      <Flex flexDirection="column" gap="x0_5">
                                        <Text color="black" fontSize="small" lineHeight="smallTextCompressed">
                                          {formData.proposal.quantity} {formData.proposal.unit}{" "}
                                          <Text
                                            as="span"
                                            color="midGrey"
                                            fontSize="small"
                                            lineHeight="smallTextCompressed"
                                          >
                                            by
                                          </Text>{" "}
                                          {formData.proposal.productionDueDate}
                                        </Text>
                                        {committedProposalSplitRows.map((r, i) => (
                                          <Text fontSize="small" lineHeight="smallTextCompressed" key={i} color="black">
                                            {r.quantity} {r.unit}{" "}
                                            <Text
                                              as="span"
                                              color="midGrey"
                                              fontSize="small"
                                              lineHeight="smallTextCompressed"
                                            >
                                              by
                                            </Text>{" "}
                                            {r.productionDueDate}
                                          </Text>
                                        ))}
                                      </Flex>
                                    </Box>
                                  }
                                >
                                  <Box display="flex" alignItems="center">
                                    <Icon icon={"arrowSplit" as any} size="x2_5" color="darkGrey" />
                                  </Box>
                                </Tooltip>
                              </Flex>
                            ) : (
                              <QtyDueRow
                                quantity={
                                  uomView === "customer"
                                    ? formData.request.quantity
                                    : eachesToUnit(
                                        quantityToEaches(
                                          formData.request.quantity,
                                          formData.request.unit || CUSTOMER_UOM
                                        ),
                                        requestColumnDisplayUnit
                                      ).toLocaleString("en-US", {
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 0,
                                      })
                                }
                                unit={
                                  uomView === "customer"
                                    ? formData.request.unit || CUSTOMER_UOM
                                    : requestColumnDisplayUnit
                                }
                                productionDueDate={formData.request.productionDueDate}
                                quantityTextStyle={getMismatchStyle({
                                  highlight:
                                    !(acceptedItems.request || acceptedItems.proposal) &&
                                    collaborationState.activeCardAuthorRole === "customer" &&
                                    qtyMismatch,
                                  needsMyResponse: role === "supplier",
                                })}
                                dueDateTextStyle={getMismatchStyle({
                                  highlight:
                                    !(acceptedItems.request || acceptedItems.proposal) &&
                                    collaborationState.activeCardAuthorRole === "customer" &&
                                    dueDateMismatch,
                                  needsMyResponse: role === "supplier",
                                })}
                              />
                            )}
                            {/* Push request content down to stay aligned when proposal has split rows */}
                            {visibleProposalSplitRows.map((_, i) => (
                              <SplitRowPlaceholder key={`request-view-placeholder-${i}`} />
                            ))}
                            <Text my="x1">
                              {formData.request.unitPrice} {formData.request.currency}{" "}
                              <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                                (per each)
                              </Text>
                            </Text>
                            <Text my="x1" height="x3">
                              {formData.request.reason}
                            </Text>
                            <Box my="x1" minHeight="96px">
                              <TruncatedText maxCharacters={300} showTooltip={true}>
                                {formData.request.note}
                              </TruncatedText>
                            </Box>
                          </>
                        )}
                      </Flex>
                    </Box>

                    {/* Supplier proposal column */}
                    <Box minWidth="400px" maxWidth="640px" flex={1}>
                      <Flex flexDirection="column" gap="x0_25" mb="x3">
                        <Flex alignItems="center" gap="x1">
                          <Heading4 mb="0">{role === "supplier" ? "Your proposal" : "Supplier's proposal"}</Heading4>
                          {acceptedItems.request || acceptedItems.proposal ? (
                            <Tooltip
                              tooltip={
                                acceptanceType === "dual" && acceptedItems.proposal && isReconciled !== null
                                  ? acceptedItems.request
                                    ? "Accepted – Request updated"
                                    : role === "supplier"
                                      ? "Accepted – Request updated"
                                      : isReconciled
                                        ? "Accepted – Request updated"
                                        : "Accepted – Request retained"
                                  : "Accepted"
                              }
                            >
                              <Flex alignItems="center" gap="x0_5">
                                <Box
                                  backgroundColor="lightGreen"
                                  borderRadius="medium"
                                  p="x0_25"
                                  width="x3"
                                  height="x3"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Icon
                                    icon="check"
                                    size="x2_5"
                                    color={
                                      acceptedItems.proposal && isReconciled === false && role !== "supplier"
                                        ? "grey"
                                        : "green"
                                    }
                                  />
                                </Box>
                                {/* Second icon only when "Accept and retain request" (dual); "update request" shows single check like request column */}
                                {acceptanceType === "dual" && acceptedItems.proposal && isReconciled === false && (
                                  <ReconciledIcon variant="flagged" size={20} />
                                )}
                              </Flex>
                            </Tooltip>
                          ) : (
                            <>
                              {(!acceptedItems.request &&
                                !acceptedItems.proposal &&
                                role === "supplier" &&
                                collaborationState.activeCardAuthorRole === "supplier") ||
                              (role === "customer" && collaborationState.activeCardAuthorRole === "supplier") ? (
                                <Tooltip
                                  tooltip={
                                    role === "supplier" && collaborationState.activeCardAuthorRole === "supplier"
                                      ? "Awaiting customer's response"
                                      : "Requires your response"
                                  }
                                >
                                  <Box
                                    backgroundColor={
                                      role === "supplier" && collaborationState.activeCardAuthorRole === "supplier"
                                        ? "whiteGrey"
                                        : "yellow"
                                    }
                                    borderRadius="medium"
                                    p="x0_25"
                                    width="x3"
                                    height="x3"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                                  </Box>
                                </Tooltip>
                              ) : null}
                            </>
                          )}
                        </Flex>
                        <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                          by{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                            you
                          </Text>{" "}
                          on{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                            February 6, 2025
                          </Text>
                        </Text>
                      </Flex>

                      <Flex flexDirection="column" gap="x0_5">
                        {editMode === "proposal" ? (
                          <>
                            <Flex gap="half" alignItems="center" width="100%" flexWrap="nowrap">
                              <Box minWidth="140px" flex="1" maxWidth="280px">
                                <Input
                                  value={formData.proposal.quantity}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      proposal: { ...prev.proposal, quantity: e.target.value },
                                    }))
                                  }
                                  placeholder="1"
                                  inputWidth="100%"
                                />
                              </Box>

                              <Select
                                options={unitOptions}
                                value={
                                  (formData.proposal.unit ||
                                    DEFAULT_DISPLAY_SUPPLIER_UOM) as (typeof UNIT_OPTIONS)[number]["value"]
                                }
                                onChange={(option) => {
                                  const newUnit = option as string;
                                  setFormData((prev) => ({
                                    ...prev,
                                    proposal: { ...prev.proposal, unit: newUnit },
                                  }));
                                  setProposalSplitRows((prev) => prev.map((r) => ({ ...r, unit: newUnit })));
                                }}
                                width="100%"
                                minWidth="100px"
                                maxWidth="160px"
                                disabled={role !== "supplier"}
                              />

                              <Text color="midGrey" px="x0_5">
                                by
                              </Text>

                              <Box flex="1" minWidth="220px">
                                <Box
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box style={{ minWidth: 0 }}>
                                    <DatePicker
                                      selected={parseDueDate(formData.proposal.productionDueDate)}
                                      onChange={(date: any) => {
                                        if (!(date instanceof Date) || Number.isNaN(date.getTime())) return;
                                        setFormData((prev) => ({
                                          ...prev,
                                          proposal: { ...prev.proposal, productionDueDate: formatDueDate(date) },
                                        }));
                                      }}
                                      onInputChange={(value) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          proposal: { ...prev.proposal, productionDueDate: value },
                                        }))
                                      }
                                      inputProps={{ placeholder: "Select due date", inputWidth: "100%" }}
                                    />
                                  </Box>

                                  <Flex alignItems="center" pl="x0_5">
                                    {role === "supplier" &&
                                      editMode === "proposal" &&
                                      (proposalSplitRows.length < 2 ? (
                                        <IconicButton
                                          icon={"arrowSplit" as any}
                                          labelHidden
                                          aria-label="Split proposal"
                                          tooltip="Split proposal"
                                          onClick={addProposalSplitRow}
                                          type="button"
                                        />
                                      ) : (
                                        <Box width="32px" height="32px" flexShrink={0} aria-hidden />
                                      ))}
                                  </Flex>
                                </Box>
                              </Box>
                            </Flex>

                            {proposalSplitRows.map((row, idx) => (
                              <Flex
                                key={`proposal-split-row-${idx}`}
                                gap="half"
                                alignItems="center"
                                width="100%"
                                my="x0_25"
                                flexWrap="nowrap"
                              >
                                <Box minWidth="140px" flex="1" maxWidth="280px">
                                  <Input
                                    value={row.quantity}
                                    onChange={(e) =>
                                      setProposalSplitRows((prev) =>
                                        prev.map((r, i) => (i === idx ? { ...r, quantity: e.target.value } : r))
                                      )
                                    }
                                    placeholder="1"
                                    inputWidth="100%"
                                  />
                                </Box>

                                <Box width="100%" minWidth="100px" maxWidth="160px" display="flex" alignItems="center">
                                  <TruncatedText fullWidth ml="x1">
                                    {row.unit}
                                  </TruncatedText>
                                </Box>

                                <Text color="midGrey" px="x0_5">
                                  by
                                </Text>

                                <Box flex="1" minWidth="220px">
                                  <Box
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "1fr auto",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box style={{ minWidth: 0 }}>
                                      <DatePicker
                                        selected={parseDueDate(row.productionDueDate)}
                                        onChange={(date: any) => {
                                          if (!(date instanceof Date) || Number.isNaN(date.getTime())) return;
                                          setProposalSplitRows((prev) =>
                                            prev.map((r, i) =>
                                              i === idx ? { ...r, productionDueDate: formatDueDate(date) } : r
                                            )
                                          );
                                        }}
                                        onInputChange={(value) =>
                                          setProposalSplitRows((prev) =>
                                            prev.map((r, i) => (i === idx ? { ...r, productionDueDate: value } : r))
                                          )
                                        }
                                        inputProps={{ placeholder: "Select due date", inputWidth: "100%" }}
                                      />
                                    </Box>

                                    <Flex alignItems="center" pl="x0_5">
                                      {role === "supplier" && editMode === "proposal" && (
                                        <IconicButton
                                          icon="removeCircleOutline"
                                          labelHidden
                                          aria-label="Remove proposal row"
                                          tooltip="Remove"
                                          onClick={() => {
                                            removeProposalSplitRow(idx);
                                          }}
                                        />
                                      )}
                                    </Flex>
                                  </Box>
                                </Box>
                              </Flex>
                            ))}

                            <Box width="100%">
                              <Flex alignItems="flex-start">
                                <Box width="50%" maxWidth="50%">
                                  <Input
                                    value={formData.proposal.unitPrice}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        proposal: { ...prev.proposal, unitPrice: e.target.value },
                                      }))
                                    }
                                    placeholder="1"
                                    inputWidth="100%"
                                  />
                                </Box>
                                <Box width="160px" pt="x1" pb="x1" pl="x1">
                                  <Text>
                                    {formData.proposal.currency}{" "}
                                    <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                                      (per each)
                                    </Text>
                                  </Text>
                                </Box>
                              </Flex>
                            </Box>

                            <Box width="100%">
                              <Select
                                options={[
                                  { value: "Quality requirements", label: "Quality requirements" },
                                  { value: "Production delay", label: "Production delay" },
                                  { value: "Material shortage", label: "Material shortage" },
                                  { value: "Equipment maintenance", label: "Equipment maintenance" },
                                  { value: "Other", label: "Other" },
                                ]}
                                value={formData.proposal.reason}
                                onChange={(option) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    proposal: { ...prev.proposal, reason: option as string },
                                  }))
                                }
                                width="100%"
                                placeholder="Select reason"
                              />
                            </Box>

                            <Box width="100%">
                              <Textarea
                                value={formData.proposal.note}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    proposal: { ...prev.proposal, note: e.target.value },
                                  }))
                                }
                                placeholder="Enter note"
                                style={{ height: "152px" }}
                              />
                            </Box>
                          </>
                        ) : (
                          <>
                            <QtyDueRow
                              quantity={
                                uomView === "customer"
                                  ? quantityToEaches(
                                      formData.proposal.quantity,
                                      formData.proposal.unit || "eaches"
                                    ).toLocaleString("en-US", {
                                      maximumFractionDigits: 2,
                                      minimumFractionDigits: 0,
                                    })
                                  : formData.proposal.quantity
                              }
                              unit={
                                uomView === "customer"
                                  ? CUSTOMER_UOM
                                  : formData.proposal.unit || DEFAULT_DISPLAY_SUPPLIER_UOM
                              }
                              productionDueDate={formData.proposal.productionDueDate}
                              my="x0_25"
                              quantityTextStyle={getMismatchStyle({
                                highlight:
                                  !(acceptedItems.request || acceptedItems.proposal) &&
                                  collaborationState.activeCardAuthorRole === "supplier" &&
                                  qtyMismatch,
                                needsMyResponse: role === "customer",
                              })}
                              dueDateTextStyle={getMismatchStyle({
                                highlight:
                                  !(acceptedItems.request || acceptedItems.proposal) &&
                                  collaborationState.activeCardAuthorRole === "supplier" &&
                                  dueDateMismatch,
                                needsMyResponse: role === "customer",
                              })}
                            />
                            {committedProposalSplitRows.map((row, idx) => {
                              const rowQtyEaches = quantityToEaches(String(row.quantity), row.unit || "eaches");
                              const rowQtyMismatch = requestQtyEaches !== rowQtyEaches;
                              return (
                                <QtyDueRow
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={`proposal-view-split-${idx}`}
                                  quantity={
                                    uomView === "customer"
                                      ? rowQtyEaches.toLocaleString("en-US", {
                                          maximumFractionDigits: 2,
                                          minimumFractionDigits: 0,
                                        })
                                      : row.quantity
                                  }
                                  unit={
                                    uomView === "customer" ? CUSTOMER_UOM : row.unit || DEFAULT_DISPLAY_SUPPLIER_UOM
                                  }
                                  productionDueDate={row.productionDueDate}
                                  my="x0_25"
                                  quantityTextStyle={getMismatchStyle({
                                    highlight:
                                      !(acceptedItems.request || acceptedItems.proposal) &&
                                      collaborationState.activeCardAuthorRole === "supplier" &&
                                      rowQtyMismatch,
                                    needsMyResponse: role === "customer",
                                  })}
                                  dueDateTextStyle={getMismatchStyle({
                                    highlight:
                                      !(acceptedItems.request || acceptedItems.proposal) &&
                                      collaborationState.activeCardAuthorRole === "supplier" &&
                                      formData.request.productionDueDate !== row.productionDueDate,
                                    needsMyResponse: role === "customer",
                                  })}
                                />
                              );
                            })}
                            <Text mt="x2" mb="x1">
                              {formData.proposal.unitPrice} {formData.proposal.currency}{" "}
                              <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                                (per each)
                              </Text>
                            </Text>
                            <Text my="x1" height="x3">
                              {formData.proposal.reason}
                            </Text>
                            <Box my="x1" minHeight="96px">
                              <TruncatedText maxCharacters={300} showTooltip={true}>
                                {formData.proposal.note}
                              </TruncatedText>
                            </Box>
                          </>
                        )}
                      </Flex>
                    </Box>
                  </Flex>

                  <Divider m="0" p="0" />

                  <Flex gap="x2" px="x2" pb="x1">
                    {editMode ? (
                      <>
                        <PrimaryButton
                          onClick={() => {
                            submitEdit(editMode);
                          }}
                        >
                          {editMode === "request" ? "Submit request" : "Submit proposal"}
                        </PrimaryButton>
                        <QuietButton onClick={cancelEdit}>Cancel</QuietButton>
                      </>
                    ) : (
                      <>
                        {role === "supplier" ? (
                          <>
                            <QuietButton
                              onClick={() => {
                                enterEditMode("proposal");
                              }}
                            >
                              Update proposal
                            </QuietButton>
                            <QuietButton
                              onClick={() => {
                                setAcceptedItems((prev) => ({ ...prev, request: true }));
                                setIsReconciled(true);
                                toast.success("Customer's request accepted");
                              }}
                              disabled={acceptedItems.request}
                            >
                              Accept customer's request
                            </QuietButton>
                          </>
                        ) : (
                          <>
                            <QuietButton onClick={() => enterEditMode("request")}>Update request</QuietButton>
                            <QuietButton onClick={acceptSupplierProposal} disabled={acceptedItems.proposal}>
                              Accept supplier's proposal
                            </QuietButton>
                          </>
                        )}
                      </>
                    )}
                  </Flex>
                </Flex>
              </Card>
            </Box>
          </Tab>

          {/* Scaffold tabs */}
          <Tab label="Production records">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="Attachments">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="Milestone performance">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
        </Tabs>

        {/* Dual acceptance modal (matches design-repo) */}
        <Modal
          isOpen={isAcceptanceModalOpen}
          onRequestClose={handleAcceptanceCancel}
          title="Accept supplier's proposal"
          maxWidth="649px"
          footerContent={
            <Flex justifyContent="flex-start" gap="x2">
              <PrimaryButton onClick={handleAcceptanceConfirm}>Accept proposal</PrimaryButton>
              <QuietButton onClick={handleAcceptanceCancel}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Box px="half">
            <Flex flexDirection="column" gap="x1">
              <Box mb="x1">
                <Flex alignItems="center" gap="x1">
                  <Radio
                    name="acceptance-option"
                    value="without-flagging"
                    labelText="Accept and update request"
                    checked={acceptanceOption === "without-flagging"}
                    onChange={() => setAcceptanceOption("without-flagging")}
                  />
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ReconciledIcon variant="standard" size={20} />
                  </Box>
                </Flex>
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed" ml="x3">
                  This will update your requested quantity to match the supplier's proposal.
                </Text>
              </Box>
              <Divider m="0" />
              <Box mb="x1">
                <Flex alignItems="center" gap="x1">
                  <Radio
                    name="acceptance-option"
                    value="with-flagging"
                    labelText="Accept and retain request"
                    checked={acceptanceOption === "with-flagging"}
                    onChange={() => setAcceptanceOption("with-flagging")}
                  />
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ReconciledIcon variant="flagged" size={20} />
                  </Box>
                </Flex>
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed" ml="x3">
                  This will accept the proposal but keep your requested quantity.
                </Text>
              </Box>
            </Flex>
          </Box>
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};
