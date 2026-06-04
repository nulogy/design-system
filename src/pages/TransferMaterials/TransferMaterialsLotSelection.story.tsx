import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  ButtonGroup,
  Card,
  Checkbox,
  Divider,
  Flex,
  Icon,
  IconicButton,
  List,
  Modal,
  ListItem as NDSListItem,
  Table as NDSTable,
  PrimaryButton,
  QuietButton,
  type TableCellInfoType,
  type TableColumnType,
  Text,
  ToastContainer,
  Tooltip,
  toast,
} from "../../index";

export default {
  title: "Pages/TransferMaterials - Lot Selection",
};

// --- Types ---

interface LotItem {
  lotId: string;
  lotCode: string;
  expiryDate: string | null;
  skuCode: string;
  skuDescription: string;
  quantity: string;
}

interface SourceJobWithLots {
  id: string;
  naturalKey: number;
  actualStart: string;
  actualEnd: string | null;
  workOrderCode?: string;
  workOrderId?: number;
  lots: LotItem[];
}

// --- Mock Data ---

// Current work order jobs — all three track-by policy types represented.
const MOCK_JOBS: SourceJobWithLots[] = [
  {
    id: "job-1",
    naturalKey: 1042,
    actualStart: "Mar 10, 2025, 8:00 AM",
    actualEnd: "Mar 10, 2025, 4:00 PM",
    lots: [
      {
        lotId: "lot-1a",
        lotCode: "LOT-2025-001",
        expiryDate: "Dec 31, 2025",
        skuCode: "SUB-PALLET",
        skuDescription: "Widget Base",
        quantity: "6.00 ea",
      },
      {
        lotId: "lot-1b",
        lotCode: "LOT-2025-002",
        expiryDate: "Dec 31, 2025",
        skuCode: "SUB-PALLET",
        skuDescription: "Widget Base",
        quantity: "6.00 ea",
      },
      {
        lotId: "lot-1c",
        lotCode: "LOT-2025-003",
        expiryDate: "Jan 15, 2026",
        skuCode: "SUB-PALLET-FIFO",
        skuDescription: "Widget Cap",
        quantity: "12.00 ea",
      },
      {
        lotId: "lot-1d",
        lotCode: "LOT-JOB-001",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
      },
    ],
  },
  {
    id: "job-2",
    naturalKey: 1043,
    actualStart: "Mar 11, 2025, 8:00 AM",
    actualEnd: null,
    lots: [
      {
        lotId: "lot-2a",
        lotCode: "LOT-2025-004",
        expiryDate: "Jun 30, 2025",
        skuCode: "SUB-PALLET",
        skuDescription: "Widget Base",
        quantity: "6.00 ea",
      },
      {
        lotId: "lot-2b",
        lotCode: "LOT-JOB-002",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "2.00 ea",
      },
    ],
  },
];

// Different work order jobs — Track by Job excluded server-side for cross-WO transfers,
// so only Pallet and Pallet-FIFO lots appear here.
const _DIFFERENT_WO_JOBS: SourceJobWithLots[] = [
  {
    id: "job-3",
    naturalKey: 998,
    actualStart: "Feb 20, 2025, 7:00 AM",
    actualEnd: "Feb 20, 2025, 3:00 PM",
    workOrderCode: "WO-2025-0088",
    workOrderId: 88,
    lots: [
      {
        lotId: "lot-3a",
        lotCode: "LOT-2025-010",
        expiryDate: "Mar 31, 2026",
        skuCode: "SUB-PALLET",
        skuDescription: "Connector Pin",
        quantity: "12.00 ea",
      },
      {
        lotId: "lot-3b",
        lotCode: "LOT-2025-011",
        expiryDate: "Mar 31, 2026",
        skuCode: "SUB-PALLET",
        skuDescription: "Connector Pin",
        quantity: "12.00 ea",
      },
      {
        lotId: "lot-3c",
        lotCode: "LOT-2025-012",
        expiryDate: "Jun 30, 2026",
        skuCode: "SUB-PALLET-FIFO",
        skuDescription: "Connector Sleeve",
        quantity: "8.00 ea",
      },
    ],
  },
  {
    id: "job-4",
    naturalKey: 1001,
    actualStart: "Mar 01, 2025, 9:00 AM",
    actualEnd: "Mar 01, 2025, 5:00 PM",
    workOrderCode: "WO-2025-0091",
    workOrderId: 91,
    lots: [
      {
        lotId: "lot-4a",
        lotCode: "LOT-2025-013",
        expiryDate: "Jun 30, 2026",
        skuCode: "SUB-PALLET-FIFO",
        skuDescription: "Connector Sleeve",
        quantity: "16.00 ea",
      },
    ],
  },
];

// --- Custom Hook: useLotSelection ---

function useLotSelection(jobs: SourceJobWithLots[], initiallySelected = true) {
  const initialSelected: Record<string, Set<string>> = {};
  for (const job of jobs) {
    initialSelected[job.id] = initiallySelected ? new Set(job.lots.map((l) => l.lotId)) : new Set<string>();
  }

  const [selectedLots, setSelectedLots] = useState<Record<string, Set<string>>>(initialSelected);

  const toggleJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    const allLotIds = job.lots.map((l) => l.lotId);
    const current = selectedLots[jobId] ?? new Set<string>();
    const allSelected = allLotIds.every((id) => current.has(id));
    setSelectedLots((prev) => ({
      ...prev,
      [jobId]: allSelected ? new Set<string>() : new Set(allLotIds),
    }));
  };

  const toggleLot = (jobId: string, lotId: string) => {
    setSelectedLots((prev) => {
      const current = new Set(prev[jobId] ?? []);
      if (current.has(lotId)) {
        current.delete(lotId);
      } else {
        current.add(lotId);
      }
      return { ...prev, [jobId]: current };
    });
  };

  const isJobChecked = (jobId: string): boolean => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;
    const current = selectedLots[jobId] ?? new Set<string>();
    return job.lots.length > 0 && job.lots.every((l) => current.has(l.lotId));
  };

  const isJobIndeterminate = (jobId: string): boolean => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;
    const current = selectedLots[jobId] ?? new Set<string>();
    const count = job.lots.filter((l) => current.has(l.lotId)).length;
    return count > 0 && count < job.lots.length;
  };

  const isLotSelected = (jobId: string, lotId: string): boolean => {
    return (selectedLots[jobId] ?? new Set<string>()).has(lotId);
  };

  const hasAnySelected = Object.values(selectedLots).some((s) => s.size > 0);

  return {
    selectedLots,
    toggleJob,
    toggleLot,
    isJobChecked,
    isJobIndeterminate,
    isLotSelected,
    hasAnySelected,
  };
}

// --- Shared table helpers ---

const headerFormatter = ({ label }: TableColumnType) => <Text fontWeight="bold">{label}</Text>;

const cellRenderer = ({ cellData }: TableCellInfoType) => <Text>{cellData || "--"}</Text>;

const boldCellRenderer = ({ cellData }: TableCellInfoType) => <Text fontWeight="bold">{cellData || "--"}</Text>;

// Parses "6.00 ea" → { value: 6, uom: "ea" } and sums quantities for a group of lots.
function sumQuantities(lots: LotItem[]): string {
  const parts = lots[0].quantity.split(" ");
  const uom = parts.slice(1).join(" ");
  const total = lots.reduce((sum, lot) => sum + parseFloat(lot.quantity), 0);
  return `${total.toFixed(2)} ${uom}`;
}

// --- Styled Tables ---

const StyledSourceTable = styled(NDSTable)(({ theme }) => ({
  "> tbody > tr > td": {
    paddingBottom: theme.space.x1,
    paddingTop: theme.space.x1,
  },
  "> thead > tr > th": {
    padding: `${theme.space.x2} 0 ${theme.space.x1} 0`,
  },
  "> thead > tr > th > div": {
    display: "none",
  },
}));

const StyledLotTable = styled(NDSTable)(({ theme }) => ({
  "> tbody > tr > td": {
    paddingBottom: 0,
    paddingTop: 0,
  },
  "> thead > tr": {
    borderBottom: "none",
  },
  "> thead > tr > th": {
    padding: `0 0 ${theme.space.x1} 0`,
  },
  "> thead > tr > th > div": {
    display: "none",
  },
}));

// --- InfoAccordion (identical to existing story) ---

function InfoAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box bg="whiteGrey" mb="x2" px="x2" py="x1">
      <Flex onClick={() => setIsOpen(!isOpen)} width={1} style={{ cursor: "pointer" }}>
        <IconicButton icon={isOpen ? "upArrow" : "downArrow"} />
        <Flex alignItems="center" ml="x1">
          <Text color="darkBlue" fontWeight="medium">
            What makes a Job eligible to transfer?
          </Text>
        </Flex>
      </Flex>
      {isOpen && (
        <Box pb="x1">
          <Text mb="x2" mt="x1">
            Job 1 is eligible to have its materials transferred to Job 2 within the same Work Order if it meets the
            following criteria:
          </Text>
          <List compact leftAlign>
            <ListItem>Job 1 is on the same Line as Job 2</ListItem>
            <ListItem>Job 1 is stopped</ListItem>
            <ListItem>Job 1 has not yet been Reconciled</ListItem>
            <ListItem>Job 1 has subcomponents in WIP</ListItem>
            <ListItem>Job 1 was created in the last six months</ListItem>
          </List>
          <Text mb="x2" mt="x2">
            In order to transfer materials to a Job on a different Work Order, it must meet all the same criteria listed
            above and, in addition:
          </Text>
          <List compact leftAlign>
            <ListItem>
              Job 1 must have at least one subcomponent in WIP that is also on Job 2&apos;s BOM version
            </ListItem>
            <ListItem>
              Items to be transferred must be set to Track Lots and Expiries by <i>Pallet</i> or{" "}
              <i>Pallet-FIFO Consumption</i>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}

// === OPTION 1: Job rows → expandable subcomponent groups → lots ===

function Option1LotRows({
  job,
  isLotSelected,
  toggleLot,
}: {
  job: SourceJobWithLots;
  isLotSelected: (jobId: string, lotId: string) => boolean;
  toggleLot: (jobId: string, lotId: string) => void;
}) {
  // Group lots by SKU code
  const skuOrder: string[] = [];
  const bySkuCode: Record<string, LotItem[]> = {};
  for (const lot of job.lots) {
    if (!bySkuCode[lot.skuCode]) {
      bySkuCode[lot.skuCode] = [];
      skuOrder.push(lot.skuCode);
    }
    bySkuCode[lot.skuCode].push(lot);
  }

  return (
    <Box ml="88px" pb="x2">
      {skuOrder.map((skuCode) => {
        const lots = bySkuCode[skuCode];
        const skuDescription = lots[0].skuDescription;
        const uom = lots[0].quantity.split(" ").slice(1).join(" ");
        const selectedLots = lots.filter((lot) => isLotSelected(job.id, lot.lotId));
        const total = selectedLots.length > 0 ? sumQuantities(selectedLots) : `0.00 ${uom}`;
        const totalColor = selectedLots.length > 0 ? "darkGrey" : "grey";
        return (
          <Box key={skuCode} mb="x1">
            <Flex alignItems="center" bg="lightGrey" px="x2" py="x1">
              <Text flex="1" fontWeight="medium">
                {skuCode} — {skuDescription}
              </Text>
              <Text color={totalColor} fontWeight="medium">
                {total}
              </Text>
            </Flex>
            {lots.map((lot) => (
              <Flex key={lot.lotId} alignItems="center" py="x1" ml="x2">
                <Checkbox checked={isLotSelected(job.id, lot.lotId)} onChange={() => toggleLot(job.id, lot.lotId)} />
                <Text ml="x2" width="160px">
                  {lot.lotCode}
                </Text>
                <Text ml="x2" width="120px">
                  {lot.expiryDate ?? "--"}
                </Text>
                <Text ml="auto">{lot.quantity}</Text>
              </Flex>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}

function Option1Modal() {
  const { toggleJob, toggleLot, isJobChecked, isJobIndeterminate, isLotSelected, hasAnySelected } =
    useLotSelection(MOCK_JOBS);

  const columns: TableColumnType[] = [
    {
      // dataKey "selected" makes addExpandableControl place the expand icon SECOND,
      // keeping this checkbox in the first column position.
      dataKey: "selected",
      label: "",
      width: "48px",
      headerFormatter: () => null,
      cellRenderer: ({ row }: TableCellInfoType) => {
        const r = row as {
          id: string;
          jobChecked: boolean;
          jobIndeterminate: boolean;
        };
        return (
          <Checkbox
            // NDS Checkbox: indeterminate only changes the marker shape (dash vs checkmark).
            // The marker is only visible when the input is :checked, so we must pass
            // checked={true} for both fully-checked and indeterminate states.
            checked={r.jobChecked || r.jobIndeterminate}
            indeterminate={r.jobIndeterminate}
            onChange={() => toggleJob(r.id)}
          />
        );
      },
    },
    {
      cellRenderer: boldCellRenderer,
      dataKey: "naturalKey",
      headerFormatter,
      label: "Job",
      width: "15%",
    },
    {
      cellRenderer,
      dataKey: "actualStart",
      headerFormatter,
      label: "Actual Start",
      width: "32%",
    },
    {
      cellRenderer,
      dataKey: "actualEnd",
      headerFormatter,
      label: "Actual End",
      width: "32%",
    },
  ];

  const rows = MOCK_JOBS.map((job) => ({
    id: job.id,
    naturalKey: job.naturalKey,
    actualStart: job.actualStart,
    actualEnd: job.actualEnd ?? "In Progress",
    jobChecked: isJobChecked(job.id),
    jobIndeterminate: isJobIndeterminate(job.id),
    expandedContent: () => <Option1LotRows job={job} isLotSelected={isLotSelected} toggleLot={toggleLot} />,
  }));

  return (
    <Modal
      footerContent={
        <ButtonGroup>
          <PrimaryButton disabled={!hasAnySelected}>
            <Text py="3px">Transfer Materials</Text>
          </PrimaryButton>
          <QuietButton>
            <Text py="3px">Cancel</Text>
          </QuietButton>
        </ButtonGroup>
      }
      isOpen
      maxWidth="780px"
      onRequestClose={() => {}}
      title="Transfer Materials"
    >
      <InfoAccordion />
      <Text mb="x2">Select the Jobs and lots from which you would like to transfer eligible Subcomponents.</Text>
      <Box mb="x2">
        <StyledSourceTable
          columns={columns}
          hasExpandableRows
          compact
          keyField="id"
          onRowExpansionChange={() => {}}
          rowHovers={false}
          rows={rows}
        />
      </Box>
    </Modal>
  );
}

export const Option1JobsSubcomponentsLots = () => <Option1Modal />;
Option1JobsSubcomponentsLots.storyName = "Option 1 – Jobs → Subcomponents → Lots";

// === OPTION 2: Job as section header, flat lot table per job ===

function Option2JobSection({
  job,
  isJobChecked,
  isJobIndeterminate,
  toggleJob,
  selectedLotIds,
  onRowSelectionChange,
}: {
  job: SourceJobWithLots;
  isJobChecked: (jobId: string) => boolean;
  isJobIndeterminate: (jobId: string) => boolean;
  toggleJob: (jobId: string) => void;
  selectedLotIds: string[];
  onRowSelectionChange: (selected: string[]) => void;
}) {
  const lotColumns: TableColumnType[] = [
    {
      cellRenderer: ({ cellData }: TableCellInfoType) => <Text fontWeight="bold">{cellData || "--"}</Text>,
      dataKey: "skuLabel",
      headerFormatter,
      label: "Subcomponent",
      width: "35%",
    },
    {
      cellRenderer,
      dataKey: "lotCode",
      headerFormatter,
      label: "Lot Code",
      width: "25%",
    },
    {
      cellRenderer,
      dataKey: "expiryDate",
      headerFormatter,
      label: "Expiry Date",
      width: "20%",
    },
    {
      cellRenderer,
      dataKey: "quantity",
      headerFormatter,
      label: "Quantity",
      width: "20%",
    },
  ];

  const lotRows = job.lots.map((lot) => ({
    id: lot.lotId,
    skuLabel: `${lot.skuCode} — ${lot.skuDescription}`,
    lotCode: lot.lotCode,
    expiryDate: lot.expiryDate ?? "--",
    quantity: lot.quantity,
  }));

  const actualEnd = job.actualEnd ?? "In Progress";

  return (
    <Box mb="x3">
      <Flex alignItems="center" bg="whiteGrey" p="x2">
        <Checkbox
          checked={isJobChecked(job.id)}
          indeterminate={isJobIndeterminate(job.id)}
          onChange={() => toggleJob(job.id)}
        />
        <Text ml="x2">
          <Text as="span" fontWeight="bold">
            Job {job.naturalKey}
          </Text>
          {" · "}
          {job.actualStart}
          {" → "}
          {actualEnd}
        </Text>
      </Flex>
      <NDSTable
        columns={lotColumns}
        hasSelectableRows
        compact
        keyField="id"
        onRowSelectionChange={onRowSelectionChange}
        rowHovers={false}
        rows={lotRows}
        selectedRows={selectedLotIds}
      />
    </Box>
  );
}

function Option2Modal() {
  const { selectedLots, toggleJob, toggleLot, isJobChecked, isJobIndeterminate, hasAnySelected } =
    useLotSelection(MOCK_JOBS);

  return (
    <Modal
      footerContent={
        <ButtonGroup>
          <PrimaryButton disabled={!hasAnySelected}>
            <Text py="3px">Transfer Materials</Text>
          </PrimaryButton>
          <QuietButton>
            <Text py="3px">Cancel</Text>
          </QuietButton>
        </ButtonGroup>
      }
      isOpen
      maxWidth="780px"
      onRequestClose={() => {}}
      title="Transfer Materials"
    >
      <InfoAccordion />
      <Text mb="x2">Select the Jobs and lots from which you would like to transfer eligible Subcomponents.</Text>
      <Box mb="x2">
        {MOCK_JOBS.map((job) => (
          <Option2JobSection
            key={job.id}
            job={job}
            isJobChecked={isJobChecked}
            isJobIndeterminate={isJobIndeterminate}
            toggleJob={toggleJob}
            selectedLotIds={Array.from(selectedLots[job.id] ?? [])}
            onRowSelectionChange={(newSelected) => {
              const job_ = MOCK_JOBS.find((j) => j.id === job.id);
              if (!job_) return;
              // Determine which lots were added/removed by diffing
              const prevSelected = Array.from(selectedLots[job.id] ?? []);
              const added = newSelected.filter((id) => !prevSelected.includes(id));
              const removed = prevSelected.filter((id) => !newSelected.includes(id));
              for (const lotId of added) toggleLot(job.id, lotId);
              for (const lotId of removed) toggleLot(job.id, lotId);
            }}
          />
        ))}
      </Box>
    </Modal>
  );
}

export const Option2JobSectionHeadersLotTable = () => <Option2Modal />;
Option2JobSectionHeadersLotTable.storyName = "Option 2 – Job Section Headers + Lot Table";

// === OPTION 3: Job rows expand to flat lot table ===

function Option3ExpandedLots({
  job,
  selectedLotIds,
  onRowSelectionChange,
}: {
  job: SourceJobWithLots;
  selectedLotIds: string[];
  onRowSelectionChange: (selected: string[]) => void;
}) {
  const lotColumns: TableColumnType[] = [
    {
      cellRenderer: boldCellRenderer,
      dataKey: "skuLabel",
      headerFormatter,
      label: "Subcomponent",
      width: "35%",
    },
    {
      cellRenderer,
      dataKey: "lotCode",
      headerFormatter,
      label: "Lot Code",
      width: "25%",
    },
    {
      cellRenderer,
      dataKey: "expiryDate",
      headerFormatter,
      label: "Expiry Date",
      width: "20%",
    },
    {
      cellRenderer,
      dataKey: "quantity",
      headerFormatter,
      label: "Quantity",
      width: "20%",
    },
  ];

  const lotRows = job.lots.map((lot) => ({
    id: lot.lotId,
    skuLabel: `${lot.skuCode} — ${lot.skuDescription}`,
    lotCode: lot.lotCode,
    expiryDate: lot.expiryDate ?? "--",
    quantity: lot.quantity,
  }));

  return (
    <Box ml="88px" pb="x2">
      <StyledLotTable
        columns={lotColumns}
        hasSelectableRows
        compact
        keyField="id"
        onRowSelectionChange={onRowSelectionChange}
        rowHovers={false}
        rows={lotRows}
        selectedRows={selectedLotIds}
      />
    </Box>
  );
}

function Option3Modal() {
  const { selectedLots, toggleJob, toggleLot, isJobChecked, isJobIndeterminate, hasAnySelected } =
    useLotSelection(MOCK_JOBS);

  const columns: TableColumnType[] = [
    {
      // dataKey "selected" makes addExpandableControl place the expand icon SECOND,
      // keeping this checkbox in the first column position.
      dataKey: "selected",
      label: "",
      width: "48px",
      headerFormatter: () => null,
      cellRenderer: ({ row }: TableCellInfoType) => {
        const r = row as {
          id: string;
          jobChecked: boolean;
          jobIndeterminate: boolean;
        };
        return (
          <Checkbox
            // NDS Checkbox: indeterminate only changes the marker shape (dash vs checkmark).
            // The marker is only visible when the input is :checked, so we must pass
            // checked={true} for both fully-checked and indeterminate states.
            checked={r.jobChecked || r.jobIndeterminate}
            indeterminate={r.jobIndeterminate}
            onChange={() => toggleJob(r.id)}
          />
        );
      },
    },
    {
      cellRenderer: boldCellRenderer,
      dataKey: "naturalKey",
      headerFormatter,
      label: "Job",
      width: "15%",
    },
    {
      cellRenderer,
      dataKey: "actualStart",
      headerFormatter,
      label: "Actual Start",
      width: "32%",
    },
    {
      cellRenderer,
      dataKey: "actualEnd",
      headerFormatter,
      label: "Actual End",
      width: "32%",
    },
  ];

  const rows = MOCK_JOBS.map((job) => ({
    id: job.id,
    naturalKey: job.naturalKey,
    actualStart: job.actualStart,
    actualEnd: job.actualEnd ?? "In Progress",
    jobChecked: isJobChecked(job.id),
    jobIndeterminate: isJobIndeterminate(job.id),
    expandedContent: () => (
      <Option3ExpandedLots
        job={job}
        selectedLotIds={Array.from(selectedLots[job.id] ?? [])}
        onRowSelectionChange={(newSelected) => {
          const prevSelected = Array.from(selectedLots[job.id] ?? []);
          const added = newSelected.filter((id) => !prevSelected.includes(id));
          const removed = prevSelected.filter((id) => !newSelected.includes(id));
          for (const lotId of added) toggleLot(job.id, lotId);
          for (const lotId of removed) toggleLot(job.id, lotId);
        }}
      />
    ),
  }));

  return (
    <Modal
      footerContent={
        <ButtonGroup>
          <PrimaryButton disabled={!hasAnySelected}>
            <Text py="3px">Transfer Materials</Text>
          </PrimaryButton>
          <QuietButton>
            <Text py="3px">Cancel</Text>
          </QuietButton>
        </ButtonGroup>
      }
      isOpen
      maxWidth="780px"
      onRequestClose={() => {}}
      title="Transfer Materials"
    >
      <InfoAccordion />
      <Text mb="x2">Select the Jobs and lots from which you would like to transfer eligible Subcomponents.</Text>
      <Box mb="x2">
        <StyledSourceTable
          columns={columns}
          hasExpandableRows
          compact
          keyField="id"
          onRowExpansionChange={() => {}}
          rowHovers={false}
          rows={rows}
        />
      </Box>
    </Modal>
  );
}

export const Option3JobsFlatLotTable = () => <Option3Modal />;
Option3JobsFlatLotTable.storyName = "Option 3 – Jobs → Flat Lot Table";

// === OPTION 4: Job section headers + single NDS Table per job with heading rows ===

// NDS Table: any row with a `heading` property renders as a full-width <td colSpan={columns.length}>,
// bypassing the normal cell rendering. We use this for subcomponent group dividers so the
// column headers (Lot Code / Expiry Date / Quantity) appear once per table, not per group.
//
// Correct API (from Table.story.tsx WithFullWidthSection):
//   row.heading = <data value>  — passed as `cellData` to the row's cellRenderer
//   row.cellRenderer = fn       — receives { cellData } and returns the full-width content

// Renderer for SKU group heading rows. cellData is the heading data object.
const skuGroupSectionRow = ({ cellData }: TableCellInfoType) => {
  const { skuCode, skuDescription, total, totalColor } = cellData as {
    skuCode: string;
    skuDescription: string;
    total: string;
    totalColor: string;
  };
  return (
    <Flex alignItems="center" bg="lightGrey" pl="x1" py="x1">
      <Text flex="1" fontWeight="medium">
        {skuCode} — {skuDescription}
      </Text>
      {/* width matches the quantity column (25%) so the total aligns with the column values below */}
      <Text color={totalColor} fontWeight="medium" textAlign="right" width="25%" pr="x2">
        {total}
      </Text>
    </Flex>
  );
};

const StyledOption4Table = styled(NDSTable)(({ theme }) => ({
  // Hide the select-all checkbox in the thead — the job-level checkbox already covers this.
  "> thead > tr > th > div": {
    display: "none",
  },
  "> thead > tr > th": {
    padding: `${theme.space.x1} 0`,
  },
  "> tbody > tr > td": {
    paddingBottom: theme.space.x1,
    paddingTop: theme.space.x1,
  },
}));

// Variant used when a job has no selectable lots — all rows are full-width heading rows
// so the column headers ("Lot Code", "Expiry Date", "Quantity") have nothing to describe.
const StyledOption4TableNoHeader = styled(StyledOption4Table)(() => ({
  "> thead": {
    display: "none",
  },
}));

function Option4JobSection({
  job,
  isJobChecked,
  isJobIndeterminate,
  toggleJob,
  selectedLots,
  toggleLot,
}: {
  job: SourceJobWithLots;
  isJobChecked: (jobId: string) => boolean;
  isJobIndeterminate: (jobId: string) => boolean;
  toggleJob: (jobId: string) => void;
  selectedLots: Set<string>;
  toggleLot: (jobId: string, lotId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  // Group lots by SKU, preserving insertion order
  const skuOrder: string[] = [];
  const bySkuCode: Record<string, LotItem[]> = {};
  for (const lot of job.lots) {
    if (!bySkuCode[lot.skuCode]) {
      bySkuCode[lot.skuCode] = [];
      skuOrder.push(lot.skuCode);
    }
    bySkuCode[lot.skuCode].push(lot);
  }

  // Build flat row list: a heading row per SKU group followed by its lot rows.
  // Heading rows use `row.heading` which NDS Table renders as a full-width cell.
  const tableRows = skuOrder.flatMap((skuCode) => {
    const lots = bySkuCode[skuCode];
    const uom = lots[0].quantity.split(" ").slice(1).join(" ");
    const selectedSkuLots = lots.filter((lot) => selectedLots.has(lot.lotId));
    const total = selectedSkuLots.length > 0 ? sumQuantities(selectedSkuLots) : `0.00 ${uom}`;
    const totalColor = selectedSkuLots.length > 0 ? "darkGrey" : "grey";

    return [
      {
        id: `heading-${job.id}-${skuCode}`,
        // `heading` is the data value passed as `cellData` to this row's `cellRenderer`.
        // NDS Table renders it in a full-width <td colSpan={n}> via skuGroupSectionRow.
        heading: {
          skuCode,
          skuDescription: lots[0].skuDescription,
          total,
          totalColor,
        },
        cellRenderer: skuGroupSectionRow,
      },
      ...lots.map((lot) => ({
        id: lot.lotId,
        lotCode: lot.lotCode,
        expiryDate: lot.expiryDate ?? "--",
        quantity: lot.quantity,
      })),
    ];
  });

  const selectedLotIds = Array.from(selectedLots);
  const jobChecked = isJobChecked(job.id);
  const jobIndeterminate = isJobIndeterminate(job.id);
  const actualEnd = job.actualEnd ?? "In Progress";

  const columns: TableColumnType[] = [
    {
      dataKey: "lotCode",
      headerFormatter,
      label: "Lot Code",
      width: "40%",
      cellRenderer,
    },
    {
      dataKey: "expiryDate",
      headerFormatter,
      label: "Expiry Date",
      width: "35%",
      cellRenderer,
    },
    {
      dataKey: "quantity",
      headerFormatter: ({ label }: TableColumnType) => (
        <Text fontWeight="bold" textAlign="right" pr="x2">
          {label}
        </Text>
      ),
      label: "Quantity",
      width: "25%",
      cellRenderer: ({ cellData }: TableCellInfoType) => (
        <Text textAlign="right" pr="x2">
          {cellData || "--"}
        </Text>
      ),
    },
  ];

  return (
    <Box mb="none">
      {/* Job section header with indeterminate-aware checkbox and collapse toggle */}
      <Flex alignItems="center" px="x2">
        <Checkbox
          checked={jobChecked || jobIndeterminate}
          indeterminate={jobIndeterminate}
          onChange={() => toggleJob(job.id)}
        />
        <IconicButton icon={isExpanded ? "upArrow" : "downArrow"} ml="x1" onClick={() => setIsExpanded(!isExpanded)} />
        <Text ml="x1">
          <Text as="span" fontWeight="bold">
            Job {job.naturalKey}
          </Text>
          {"  •  "}
          <Text as="span" color="darkGrey">
            Actual start: {job.actualStart}
          </Text>
          {"  •  "}
          <Text as="span" color="darkGrey">
            Actual end: {actualEnd}
          </Text>
        </Text>
      </Flex>
      {/* Single table for all lots in this job. Heading rows divide by subcomponent. */}
      {isExpanded && (
        <StyledOption4Table
          columns={columns}
          hasSelectableRows
          compact
          keyField="id"
          rowHovers={false}
          rows={tableRows}
          selectedRows={selectedLotIds}
          onRowSelectionChange={(newSelected) => {
            // Filter out heading row IDs — they can't be clicked but may appear via select-all
            const lotIds = (newSelected as string[]).filter((id) => !id.startsWith("heading-"));
            const prevLotIds = job.lots.map((l) => l.lotId).filter((id) => selectedLots.has(id));
            const added = lotIds.filter((id) => !prevLotIds.includes(id));
            const removed = prevLotIds.filter((id) => !lotIds.includes(id));
            for (const lotId of added) toggleLot(job.id, lotId);
            for (const lotId of removed) toggleLot(job.id, lotId);
          }}
        />
      )}
    </Box>
  );
}

function Option4Modal() {
  const { selectedLots, toggleJob, toggleLot, isJobChecked, isJobIndeterminate, hasAnySelected } =
    useLotSelection(MOCK_JOBS);

  return (
    <Modal
      footerContent={
        <ButtonGroup>
          <PrimaryButton disabled={!hasAnySelected}>
            <Text py="3px">Transfer Materials</Text>
          </PrimaryButton>
          <QuietButton>
            <Text py="3px">Cancel</Text>
          </QuietButton>
        </ButtonGroup>
      }
      isOpen
      maxWidth="780px"
      onRequestClose={() => {}}
      title="Transfer Materials"
    >
      <InfoAccordion />
      <Text mb="x2">Select the Jobs and lots from which you would like to transfer eligible Subcomponents.</Text>
      <Box mb="x2">
        {MOCK_JOBS.map((job, index) => (
          <React.Fragment key={job.id}>
            {index > 0 && <Divider />}
            <Option4JobSection
              job={job}
              isJobChecked={isJobChecked}
              isJobIndeterminate={isJobIndeterminate}
              toggleJob={toggleJob}
              selectedLots={selectedLots[job.id] ?? new Set()}
              toggleLot={toggleLot}
            />
          </React.Fragment>
        ))}
      </Box>
    </Modal>
  );
}

export const Option4JobSectionsWithSubcomponentGroups = () => <Option4Modal />;
Option4JobSectionsWithSubcomponentGroups.storyName = "Option 4 – Job Sections + Subcomponent Groups";

// === OPTION 5: Job sections as collapsible Cards ===
//
// Track-by policy rules:
//   Pallet / Pallet-FIFO  — no individual lot selection; show subcomponent row with total quantity.
//   Track by Job, 1 lot   — no individual lot selection; show subcomponent row with total quantity.
//   Track by Job, 3+ lots — selectable lots; no per-lot quantity (quantity lives on the subcomponent).

// Animates open/close with an S-curve (symmetric ease-in-out).
// max-height is used because `height: auto` cannot be CSS-transitioned.
const AnimatedCardContent = styled(Box)<{ isExpanded: boolean }>(({ isExpanded }) => ({
  overflow: "hidden",
  maxHeight: isExpanded ? "1000px" : "0",
  transition: "max-height 0.35s cubic-bezier(0.37, 0, 0.63, 1)",
}));

// Extended lot type for Option 5, carrying track-by policy and selectability.
interface Option5LotItem {
  lotId: string;
  lotCode: string;
  expiryDate: string | null;
  skuCode: string;
  skuDescription: string;
  // For pallet/FIFO: per-lot quantity (summed for the heading total).
  // For job-tracked: subcomponent total (same across all lots of the SKU; no per-lot math).
  quantity: string;
  trackByPolicy: "pallet" | "palletFifo" | "job";
  // True only for job-tracked lots that belong to a multi-lot SKU — the only case
  // where users can deselect individual lots.
  isSelectable: boolean;
}

interface Option5Job {
  id: string;
  naturalKey: number;
  actualStart: string;
  actualEnd: string | null;
  workOrderCode?: string;
  lots: Option5LotItem[];
}

// Current WO jobs: pallet (2 lots), pallet-FIFO (1 lot),
// job-tracked multi-lot (3 lots), job-tracked single-lot (1 lot).
const OPTION5_CURRENT_WO_JOBS: Option5Job[] = [
  {
    id: "o5-job-1",
    naturalKey: 1042,
    actualStart: "Mar 10, 2025, 8:00 AM",
    actualEnd: "Mar 10, 2025, 4:00 PM",
    lots: [
      {
        lotId: "o5-1a",
        lotCode: "LOT-2025-001",
        expiryDate: "Dec 31, 2025",
        skuCode: "SUB-PALLET",
        skuDescription: "Widget Base",
        quantity: "6.00 ea",
        trackByPolicy: "pallet",
        isSelectable: false,
      },
      {
        lotId: "o5-1b",
        lotCode: "LOT-2025-002",
        expiryDate: "Dec 31, 2025",
        skuCode: "SUB-PALLET",
        skuDescription: "Widget Base",
        quantity: "6.00 ea",
        trackByPolicy: "pallet",
        isSelectable: false,
      },
      {
        lotId: "o5-1c",
        lotCode: "LOT-2025-003",
        expiryDate: "Jan 15, 2026",
        skuCode: "SUB-PALLET-FIFO",
        skuDescription: "Widget Cap",
        quantity: "12.00 ea",
        trackByPolicy: "palletFifo",
        isSelectable: false,
      },
      // Multi-lot job-tracked: 3 selectable lots. quantity = subcomponent total (no per-lot math).
      {
        lotId: "o5-1d",
        lotCode: "LOT-JOB-001",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
        trackByPolicy: "job",
        isSelectable: true,
      },
      {
        lotId: "o5-1e",
        lotCode: "LOT-JOB-002",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
        trackByPolicy: "job",
        isSelectable: true,
      },
      {
        lotId: "o5-1f",
        lotCode: "LOT-JOB-003",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
        trackByPolicy: "job",
        isSelectable: true,
      },
      // Single-lot job-tracked: not selectable (only one lot, nothing to choose from).
      {
        lotId: "o5-1g",
        lotCode: "LOT-JOB-004",
        expiryDate: "Jun 30, 2025",
        skuCode: "SUB-JOB-SINGLE",
        skuDescription: "Widget Frame",
        quantity: "2.00 ea",
        trackByPolicy: "job",
        isSelectable: false,
      },
    ],
  },
  {
    id: "o5-job-2",
    naturalKey: 1043,
    actualStart: "Mar 11, 2025, 8:00 AM",
    actualEnd: null,
    lots: [
      {
        lotId: "o5-2a",
        lotCode: "LOT-2025-004",
        expiryDate: "Jun 30, 2025",
        skuCode: "SUB-PALLET",
        skuDescription: "Widget Base",
        quantity: "6.00 ea",
        trackByPolicy: "pallet",
        isSelectable: false,
      },
      {
        lotId: "o5-2b",
        lotCode: "LOT-JOB-005",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
        trackByPolicy: "job",
        isSelectable: true,
      },
      {
        lotId: "o5-2c",
        lotCode: "LOT-JOB-006",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
        trackByPolicy: "job",
        isSelectable: true,
      },
      {
        lotId: "o5-2d",
        lotCode: "LOT-JOB-007",
        expiryDate: null,
        skuCode: "SUB-JOB",
        skuDescription: "Widget Core",
        quantity: "4.00 ea",
        trackByPolicy: "job",
        isSelectable: true,
      },
    ],
  },
];

// Different WO jobs: pallet and pallet-FIFO only (job-tracked excluded server-side).
const OPTION5_DIFFERENT_WO_JOBS: Option5Job[] = [
  {
    id: "o5-job-3",
    naturalKey: 998,
    actualStart: "Feb 20, 2025, 7:00 AM",
    actualEnd: "Feb 20, 2025, 3:00 PM",
    workOrderCode: "WO-2025-0088",
    lots: [
      {
        lotId: "o5-3a",
        lotCode: "LOT-2025-010",
        expiryDate: "Mar 31, 2026",
        skuCode: "SUB-PALLET",
        skuDescription: "Connector Pin",
        quantity: "12.00 ea",
        trackByPolicy: "pallet",
        isSelectable: false,
      },
      {
        lotId: "o5-3b",
        lotCode: "LOT-2025-011",
        expiryDate: "Mar 31, 2026",
        skuCode: "SUB-PALLET",
        skuDescription: "Connector Pin",
        quantity: "12.00 ea",
        trackByPolicy: "pallet",
        isSelectable: false,
      },
      {
        lotId: "o5-3c",
        lotCode: "LOT-2025-012",
        expiryDate: "Jun 30, 2026",
        skuCode: "SUB-PALLET-FIFO",
        skuDescription: "Connector Sleeve",
        quantity: "8.00 ea",
        trackByPolicy: "palletFifo",
        isSelectable: false,
      },
    ],
  },
  {
    id: "o5-job-4",
    naturalKey: 1001,
    actualStart: "Mar 01, 2025, 9:00 AM",
    actualEnd: "Mar 01, 2025, 5:00 PM",
    workOrderCode: "WO-2025-0091",
    lots: [
      {
        lotId: "o5-4a",
        lotCode: "LOT-2025-013",
        expiryDate: "Jun 30, 2026",
        skuCode: "SUB-PALLET-FIFO",
        skuDescription: "Connector Sleeve",
        quantity: "16.00 ea",
        trackByPolicy: "palletFifo",
        isSelectable: false,
      },
    ],
  },
];

// Per-job activation + per-selectable-lot selection state for Option 5.
function useOption5Selection(jobs: Option5Job[]) {
  const selectableLots = (job: Option5Job) => job.lots.filter((l) => l.isSelectable);

  const [activatedJobs, setActivatedJobs] = useState<Set<string>>(new Set());
  const [selectedLots, setSelectedLots] = useState<Record<string, Set<string>>>({});

  const toggleJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    if (activatedJobs.has(jobId)) {
      setActivatedJobs((prev) => {
        const s = new Set(prev);
        s.delete(jobId);
        return s;
      });
      setSelectedLots((prev) => ({ ...prev, [jobId]: new Set<string>() }));
    } else {
      setActivatedJobs((prev) => new Set([...prev, jobId]));
      setSelectedLots((prev) => ({
        ...prev,
        [jobId]: new Set(selectableLots(job).map((l) => l.lotId)),
      }));
    }
  };

  const toggleLot = (jobId: string, lotId: string) => {
    setSelectedLots((prev) => {
      const s = new Set(prev[jobId] ?? []);
      if (s.has(lotId)) {
        s.delete(lotId);
      } else {
        s.add(lotId);
      }
      return { ...prev, [jobId]: s };
    });
  };

  const isJobChecked = (jobId: string): boolean => {
    if (!activatedJobs.has(jobId)) return false;
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;
    const sl = selectableLots(job);
    if (sl.length === 0) return true;
    const current = selectedLots[jobId] ?? new Set<string>();
    return sl.every((l) => current.has(l.lotId));
  };

  const isJobIndeterminate = (jobId: string): boolean => {
    if (!activatedJobs.has(jobId)) return false;
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;
    const sl = selectableLots(job);
    if (sl.length === 0) return false;
    const current = selectedLots[jobId] ?? new Set<string>();
    const count = sl.filter((l) => current.has(l.lotId)).length;
    return count > 0 && count < sl.length;
  };

  const isLotSelected = (jobId: string, lotId: string) => (selectedLots[jobId] ?? new Set<string>()).has(lotId);

  const hasAnySelected = activatedJobs.size > 0;

  return {
    activatedJobs,
    selectedLots,
    toggleJob,
    toggleLot,
    isJobChecked,
    isJobIndeterminate,
    isLotSelected,
    hasAnySelected,
  };
}

// Option 6 selection hook.
//   - All lots start unchecked. Checking a job enables the lot checkboxes in whatever
//     state they are currently in (empty on first activation, preserved on re-activation).
//   - toggleJob only toggles activation — it never mutates selectedLots.
function useOption6Selection(jobs: Option5Job[]) {
  const [activatedJobs, setActivatedJobs] = useState<Set<string>>(new Set());
  // All lots start unchecked. Selection state accumulates as the user makes changes
  // and is preserved when the job is toggled off and on again.
  const [selectedLots, setSelectedLots] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {};
    for (const job of jobs) {
      init[job.id] = new Set<string>();
    }
    return init;
  });

  const toggleJob = (jobId: string) => {
    // Just toggle activation — lot selection state is preserved either way.
    setActivatedJobs((prev) => {
      const s = new Set(prev);
      if (s.has(jobId)) {
        s.delete(jobId);
      } else {
        s.add(jobId);
      }
      return s;
    });
  };

  const toggleLot = (jobId: string, lotId: string) => {
    setSelectedLots((prev) => {
      const s = new Set(prev[jobId] ?? []);
      if (s.has(lotId)) {
        s.delete(lotId);
      } else {
        s.add(lotId);
      }
      return { ...prev, [jobId]: s };
    });
  };

  // isJobChecked: true when the job is activated (binary — no indeterminate at job level).
  const isJobChecked = (jobId: string) => activatedJobs.has(jobId);

  const isLotSelected = (jobId: string, lotId: string) => (selectedLots[jobId] ?? new Set<string>()).has(lotId);

  const hasAnySelected = activatedJobs.size > 0;

  return {
    activatedJobs,
    selectedLots,
    toggleJob,
    toggleLot,
    isJobChecked,
    isLotSelected,
    hasAnySelected,
  };
}

function Option5JobSection({
  job,
  isJobChecked,
  isJobIndeterminate,
  toggleJob,
  selectedLots,
  toggleLot,
}: {
  job: Option5Job;
  isJobChecked: (jobId: string) => boolean;
  isJobIndeterminate: (jobId: string) => boolean;
  toggleJob: (jobId: string) => void;
  selectedLots: Set<string>;
  toggleLot: (jobId: string, lotId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const jobChecked = isJobChecked(job.id);
  const jobIndeterminate = isJobIndeterminate(job.id);
  const isJobActive = jobChecked || jobIndeterminate;
  const actualEnd = job.actualEnd ?? "In Progress";

  // Group lots by SKU, preserving insertion order.
  const skuOrder: string[] = [];
  const bySkuCode: Record<string, Option5LotItem[]> = {};
  for (const lot of job.lots) {
    if (!bySkuCode[lot.skuCode]) {
      bySkuCode[lot.skuCode] = [];
      skuOrder.push(lot.skuCode);
    }
    bySkuCode[lot.skuCode].push(lot);
  }

  // True if any SKU group in this job has individually selectable lots.
  // Determines whether the table header (Lot Code / Expiry Date / Quantity) is shown.
  const jobHasSelectableLots = job.lots.some((l) => l.isSelectable);

  const tableRows = skuOrder.flatMap((skuCode) => {
    const lots = bySkuCode[skuCode];
    const first = lots[0];
    const hasSelectableLots = lots.some((l) => l.isSelectable);

    // Heading total:
    //   Pallet / Pallet-FIFO → sum per-lot quantities.
    //   Job-tracked → subcomponent total stored on the lot (no per-lot math).
    const total = first.trackByPolicy === "job" ? first.quantity : sumQuantities(lots);

    const headingRow = {
      id: `heading-${job.id}-${skuCode}`,
      heading: {
        skuCode,
        skuDescription: first.skuDescription,
        total,
        totalColor: "darkGrey",
      },
      cellRenderer: skuGroupSectionRow,
    };

    if (!hasSelectableLots) {
      // Non-selectable: heading row only — no individual lot rows.
      return [headingRow];
    }

    // Selectable (multi-lot job-tracked): heading + lot rows. No per-lot quantity shown.
    return [
      headingRow,
      ...lots.map((lot) => ({
        id: lot.lotId,
        lotCode: lot.lotCode,
        expiryDate: lot.expiryDate ?? "--",
        quantity: null, // quantity lives on the subcomponent, not individual lots
      })),
    ];
  });

  const columns: TableColumnType[] = [
    {
      // dataKey "selected": NDS convention to place expand icon second.
      dataKey: "selected",
      label: "",
      width: "40px",
      headerFormatter: () => null,
      cellRenderer: ({ row }: TableCellInfoType) => {
        const lotId = row.id as string;
        // When the job is inactive, show lots pre-checked but disabled (preview of what will transfer).
        const isChecked = isJobActive ? selectedLots.has(lotId) : true;
        return <Checkbox checked={isChecked} disabled={!isJobActive} onChange={() => toggleLot(job.id, lotId)} />;
      },
    },
    {
      dataKey: "lotCode",
      headerFormatter,
      label: "Lot Code",
      width: "38%",
      cellRenderer,
    },
    {
      dataKey: "expiryDate",
      headerFormatter,
      label: "Expiry Date",
      width: "33%",
      cellRenderer,
    },
    {
      dataKey: "quantity",
      headerFormatter: ({ label }: TableColumnType) => (
        <Text fontWeight="bold" textAlign="right" pr="x2">
          {label}
        </Text>
      ),
      label: "Quantity",
      width: "21%",
      // Null quantity (selectable job-tracked lot rows) renders as empty — quantity is on the heading.
      cellRenderer: ({ cellData }: TableCellInfoType) =>
        cellData ? (
          <Text textAlign="right" pr="x2">
            {cellData as string}
          </Text>
        ) : null,
    },
  ];

  return (
    <Card mb="x2" px="x2" py="x1">
      <Flex alignItems="center">
        <Checkbox
          checked={jobChecked || jobIndeterminate}
          indeterminate={jobIndeterminate}
          onChange={() => {
            toggleJob(job.id);
            if (!jobChecked && !jobIndeterminate) setIsExpanded(true);
          }}
        />
        <IconicButton icon={isExpanded ? "upArrow" : "downArrow"} ml="x1" onClick={() => setIsExpanded(!isExpanded)} />
        <Text ml="x1">
          <Text as="span" fontWeight="bold">
            Job {job.naturalKey}
          </Text>
          {"  •  "}
          <Text as="span" color="darkGrey">
            Actual start: {job.actualStart}
          </Text>
          {"  •  "}
          <Text as="span" color="darkGrey">
            Actual end: {actualEnd}
          </Text>
          {job.workOrderCode && (
            <>
              {"  •  "}
              <Text as="span" color="darkGrey">
                Work Order {job.workOrderCode}
              </Text>
            </>
          )}
        </Text>
      </Flex>
      <AnimatedCardContent isExpanded={isExpanded}>
        <Text color="darkGrey" fontWeight="medium" mt="x2" mb="x1">
          Eligible subcomponents
        </Text>
        {jobHasSelectableLots ? (
          <StyledOption4Table columns={columns} compact keyField="id" rowHovers={false} rows={tableRows} />
        ) : (
          <StyledOption4TableNoHeader columns={columns} compact keyField="id" rowHovers={false} rows={tableRows} />
        )}
      </AnimatedCardContent>
    </Card>
  );
}

function Option5Modal() {
  const currentWO = useOption5Selection(OPTION5_CURRENT_WO_JOBS);
  const differentWO = useOption5Selection(OPTION5_DIFFERENT_WO_JOBS);
  const hasAnySelected = currentWO.hasAnySelected || differentWO.hasAnySelected;

  function renderJobSections(jobs: Option5Job[], ctx: ReturnType<typeof useOption5Selection>) {
    return jobs.map((job) => (
      <Option5JobSection
        key={job.id}
        job={job}
        isJobChecked={ctx.isJobChecked}
        isJobIndeterminate={ctx.isJobIndeterminate}
        toggleJob={ctx.toggleJob}
        selectedLots={ctx.selectedLots[job.id] ?? new Set()}
        toggleLot={ctx.toggleLot}
      />
    ));
  }

  return (
    <Modal
      footerContent={
        <ButtonGroup>
          <PrimaryButton disabled={!hasAnySelected}>
            <Text py="3px">Transfer Materials</Text>
          </PrimaryButton>
          <QuietButton>
            <Text py="3px">Cancel</Text>
          </QuietButton>
        </ButtonGroup>
      }
      isOpen
      maxWidth="780px"
      onRequestClose={() => {}}
      title="Transfer Materials"
    >
      <InfoAccordion />
      <Text mb="x2">Select the Jobs and lots from which you would like to transfer eligible Subcomponents.</Text>
      <Box mb="x2">
        <Text fontWeight="bold" mb="x2">
          Current Work Order:
        </Text>
        {renderJobSections(OPTION5_CURRENT_WO_JOBS, currentWO)}
        <Text fontWeight="bold" mb="x2" mt="x4">
          Different Work Order:
        </Text>
        {renderJobSections(OPTION5_DIFFERENT_WO_JOBS, differentWO)}
      </Box>
    </Modal>
  );
}

export const Option5JobSectionsAsCards = () => <Option5Modal />;
Option5JobSectionsAsCards.storyName = "Option 5 – Job Sections as Cards";

// Option 6 gets its own styled table without the `> th > div { display:none }` rule.
// That rule hides any div-rooted element in a th — which would swallow the Checkbox header.
// (StyledOption4Table needs it to suppress the built-in select-all from hasSelectableRows;
// Option 6 doesn't use hasSelectableRows so the rule is unnecessary and harmful here.)
//
// All columns use cellRenderer, which renders plain <td> with no built-in padding.
// Left/right padding is applied only to data cells via :not([colspan]) — this excludes
// full-width divider rows (which NDS renders as <td colSpan={n}>) so they span edge-to-edge.
const StyledOption6Table = styled(NDSTable)(({ theme }) => ({
  "> thead > tr > th": {
    padding: `${theme.space.x1} ${theme.space.x2} ${theme.space.x1} 0`,
  },
  "> thead > tr > th:first-child": {
    paddingLeft: theme.space.x2,
  },
  "> tbody > tr > td:not([colspan])": {
    paddingTop: theme.space.x1,
    paddingBottom: theme.space.x1,
    paddingRight: theme.space.x2,
  },
  "> tbody > tr > td:not([colspan]):first-child": {
    paddingLeft: theme.space.x2,
  },
}));

// === OPTION 6: Cards + flat table with Item column, per-lot rows, and dividers ===
//
// Same card/selection behaviour as Option 5. The subcomponent table changes:
//   - Checkbox is the first column; its header shows a select-all for selectable lots.
//   - "Item" is the second column.
//   - Multi-lot subcomponents get a dedicated subcomponent summary row (Item + Quantity),
//     followed by individual lot rows (Lot Code + Expiry Date; quantity only for pallet/FIFO).
//   - Single-lot subcomponents collapse into one row with all fields.
//   - Light divider between rows of the same SKU; dark divider between different SKUs.
//   - Table header always shown regardless of whether the job has selectable lots.

// Full-width divider rows inserted between lots/SKUs. `heading` must be a non-undefined
// value so NDS Table renders the row as a colSpan cell via the cellRenderer.
// style={{ marginLeft/Right: "-16px" }} cancels the x2 (16px) cell padding so the
// divider line spans the full td width. NDS Box doesn't support negative space tokens.
const lightDividerRow = (id: string) => ({
  id: `divider-light-${id}`,
  heading: "divider",
  cellRenderer: () => <Box height="1px" bg="lightGrey" />,
});

const darkDividerRow = (id: string) => ({
  id: `divider-dark-${id}`,
  heading: "divider",
  cellRenderer: () => <Box height="1px" bg="grey" />,
});

function Option6JobSection({
  job,
  isJobChecked,
  toggleJob,
  selectedLots,
  toggleLot,
  errorSkuCodes,
  onLotChange,
}: {
  job: Option5Job;
  isJobChecked: (jobId: string) => boolean;
  toggleJob: (jobId: string) => void;
  selectedLots: Set<string>;
  toggleLot: (jobId: string, lotId: string) => void;
  errorSkuCodes: Set<string>;
  onLotChange: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const jobChecked = isJobChecked(job.id);
  const isJobActive = jobChecked;
  const actualEnd = job.actualEnd ?? "In Progress";

  // Group lots by SKU, preserving insertion order.
  const skuOrder: string[] = [];
  const bySkuCode: Record<string, Option5LotItem[]> = {};
  for (const lot of job.lots) {
    if (!bySkuCode[lot.skuCode]) {
      bySkuCode[lot.skuCode] = [];
      skuOrder.push(lot.skuCode);
    }
    bySkuCode[lot.skuCode].push(lot);
  }

  const jobHasSelectableLots = job.lots.some((l) => l.isSelectable);

  // Build flat row list with interleaved divider rows.
  //
  // Collapsed (single row): any subcomponent where lots are NOT individually selectable —
  //   this includes single-lot SKUs of any track-by type, and multi-lot pallet/FIFO SKUs
  //   (pallet lots are always transferred as a unit; individual selection doesn't apply).
  //
  // Expanded (subcomponent row + lot rows): only multi-lot job-tracked SKUs where
  //   users can deselect individual lots.
  const tableRows: Record<string, unknown>[] = [];
  skuOrder.forEach((skuCode, skuIndex) => {
    const lots = bySkuCode[skuCode];
    const first = lots[0];
    const hasSelectableLots = lots.some((l) => l.isSelectable);

    if (skuIndex > 0) {
      tableRows.push(darkDividerRow(`${job.id}-${skuCode}`));
    }

    if (!hasSelectableLots) {
      // Collapsed: show one row summarising the subcomponent.
      // For pallet multi-lot, sum quantities; for single-lot, use the lot's quantity directly.
      const quantity =
        lots.length === 1
          ? lots[0].quantity
          : (() => {
              const uom = first.quantity.split(" ").slice(1).join(" ");
              const sum = lots.reduce((acc, l) => acc + parseFloat(l.quantity), 0);
              return `${sum.toFixed(2)} ${uom}`;
            })();
      // Only job-tracked subcomponents show lot code and expiry date.
      // Pallet/FIFO lots are transferred as a unit — their lot details aren't user-actionable.
      const showLotDetail = first.trackByPolicy === "job";
      tableRows.push({
        id: `subcomponent-${job.id}-${skuCode}`,
        skuCode,
        item: `${skuCode} — ${first.skuDescription}`,
        lotCode: showLotDetail && lots.length === 1 ? lots[0].lotCode : null,
        expiryDate: showLotDetail && lots.length === 1 ? (lots[0].expiryDate ?? "--") : null,
        quantity,
        isLotRow: false,
      });
    } else {
      // Expanded: subcomponent summary row + individual selectable lot rows.
      // Quantity lives on the subcomponent row; lot rows show no quantity.
      tableRows.push({
        id: `subcomponent-${job.id}-${skuCode}`,
        skuCode,
        item: `${skuCode} — ${first.skuDescription}`,
        lotCode: null,
        expiryDate: null,
        quantity: first.quantity, // subcomponent total (same value on all job-tracked lots)
        isLotRow: false,
      });

      lots.forEach((lot) => {
        tableRows.push(lightDividerRow(lot.lotId));
        tableRows.push({
          id: lot.lotId,
          skuCode,
          item: null,
          lotCode: lot.lotCode,
          expiryDate: lot.expiryDate ?? "--",
          quantity: null,
          isLotRow: true,
        });
      });
    }
  });

  const columns: TableColumnType[] = [
    // Checkbox column only shown when the job has subcomponents with multiple selectable lots.
    // For pallet-only jobs (no selectable lots) the column is hidden entirely.
    // No header checkbox — the job-level checkbox covers select-all.
    ...(jobHasSelectableLots
      ? [
          {
            dataKey: "checkbox",
            label: "",
            width: "40px",
            headerFormatter: () => null,
            cellRenderer: ({ row }: TableCellInfoType) => {
              if (!row.isLotRow) return null;
              const lotId = row.id as string;
              const isChecked = selectedLots.has(lotId);
              return (
                <Checkbox
                  checked={isChecked}
                  disabled={!isJobActive}
                  onChange={() => {
                    toggleLot(job.id, lotId);
                    onLotChange();
                  }}
                />
              );
            },
          } as TableColumnType,
        ]
      : []),
    {
      dataKey: "item",
      headerFormatter,
      label: "Eligible subcomponents",
      width: "35%",
      cellRenderer: ({ cellData, row }: TableCellInfoType) => {
        if (!cellData) return null;
        const hasError = errorSkuCodes.has(row.skuCode as string);
        return (
          <Flex alignItems="center">
            <Text fontWeight="medium">{cellData as string}</Text>
            {hasError && (
              <Tooltip placement="top" tooltip="At least one lot must be selected to transfer this subcomponent.">
                <Icon icon="error" size="x3" color="red" ml="x1" />
              </Tooltip>
            )}
          </Flex>
        );
      },
    },
    {
      dataKey: "lotCode",
      label: "Lot code",
      width: "22%",
      headerFormatter: ({ label }: TableColumnType) => (
        <Flex alignItems="center">
          <Text fontWeight="bold">{label}</Text>
          <Tooltip
            placement="top"
            tooltip="Uncheck any lot codes which have been fully consumed to prevent them from being transferred to the job."
          >
            <Icon icon="info" size="x3" color="darkGrey" ml="x1" />
          </Tooltip>
        </Flex>
      ),
      cellRenderer,
    },
    {
      dataKey: "expiryDate",
      headerFormatter,
      label: "Expiry date",
      width: "20%",
      cellRenderer,
    },
    {
      dataKey: "quantity",
      headerFormatter: ({ label }: TableColumnType) => (
        <Text fontWeight="bold" textAlign="right" pr="x2">
          {label}
        </Text>
      ),
      label: "Quantity",
      width: "15%",
      cellRenderer: ({ cellData }: TableCellInfoType) =>
        cellData ? (
          <Text textAlign="right" pr="x2">
            {cellData as string}
          </Text>
        ) : null,
    },
  ];

  return (
    <Card mb="x2" px="x2" py="x1">
      <Flex alignItems="center">
        <Checkbox
          checked={jobChecked}
          onChange={() => {
            toggleJob(job.id);
            if (!jobChecked) setIsExpanded(true);
          }}
        />
        <IconicButton icon={isExpanded ? "upArrow" : "downArrow"} ml="x1" onClick={() => setIsExpanded(!isExpanded)} />
        <Text ml="x1">
          <Text as="span" fontWeight="bold">
            Job {job.naturalKey}
          </Text>
          {"  •  "}
          <Text as="span" color="darkGrey">
            Actual start: {job.actualStart}
          </Text>
          {"  •  "}
          <Text as="span" color="darkGrey">
            Actual end: {actualEnd}
          </Text>
          {job.workOrderCode && (
            <>
              {"  •  "}
              <Text as="span" color="darkGrey">
                Work order {job.workOrderCode}
              </Text>
            </>
          )}
        </Text>
      </Flex>
      <AnimatedCardContent isExpanded={isExpanded}>
        <Divider />
        <StyledOption6Table compact columns={columns} keyField="id" rowHovers={false} rows={tableRows} />
      </AnimatedCardContent>
    </Card>
  );
}

function Option6Modal() {
  const currentWO = useOption6Selection(OPTION5_CURRENT_WO_JOBS);
  const differentWO = useOption6Selection(OPTION5_DIFFERENT_WO_JOBS);
  const hasAnySelected = currentWO.hasAnySelected || differentWO.hasAnySelected;

  // submitErrors: per-job set of SKU codes whose lot selection is empty at submit time.
  const [submitErrors, setSubmitErrors] = useState<Record<string, Set<string>>>({});

  const clearErrors = () => setSubmitErrors({});

  const handleSubmit = () => {
    const errors: Record<string, Set<string>> = {};

    const check = (jobs: Option5Job[], ctx: ReturnType<typeof useOption6Selection>) => {
      for (const job of jobs) {
        if (!ctx.activatedJobs.has(job.id)) continue;
        const bySkuCode: Record<string, string[]> = {};
        for (const lot of job.lots) {
          if (!lot.isSelectable) continue;
          if (!bySkuCode[lot.skuCode]) bySkuCode[lot.skuCode] = [];
          bySkuCode[lot.skuCode].push(lot.lotId);
        }
        for (const [skuCode, lotIds] of Object.entries(bySkuCode)) {
          const selected = ctx.selectedLots[job.id] ?? new Set<string>();
          if (!lotIds.some((id) => selected.has(id))) {
            if (!errors[job.id]) errors[job.id] = new Set<string>();
            errors[job.id].add(skuCode);
          }
        }
      }
    };

    check(OPTION5_CURRENT_WO_JOBS, currentWO);
    check(OPTION5_DIFFERENT_WO_JOBS, differentWO);

    if (Object.keys(errors).length > 0) {
      setSubmitErrors(errors);
      toast.danger(
        "One or more subcomponents have no lots selected. Please select at least one lot per subcomponent before transferring.",
      );
      return;
    }

    // All valid — proceed with transfer.
  };

  function renderJobSections(jobs: Option5Job[], ctx: ReturnType<typeof useOption6Selection>) {
    return jobs.map((job) => (
      <Option6JobSection
        key={job.id}
        job={job}
        isJobChecked={ctx.isJobChecked}
        toggleJob={ctx.toggleJob}
        selectedLots={ctx.selectedLots[job.id] ?? new Set()}
        toggleLot={ctx.toggleLot}
        errorSkuCodes={submitErrors[job.id] ?? new Set()}
        onLotChange={clearErrors}
      />
    ));
  }

  return (
    <Modal
      footerContent={
        <ButtonGroup>
          <PrimaryButton disabled={!hasAnySelected} onClick={handleSubmit}>
            <Text py="3px">Transfer Materials</Text>
          </PrimaryButton>
          <QuietButton>
            <Text py="3px">Cancel</Text>
          </QuietButton>
        </ButtonGroup>
      }
      isOpen
      maxWidth="780px"
      onRequestClose={() => {}}
      title="Transfer Materials"
    >
      <InfoAccordion />
      <Text mb="x2">Select the jobs and lot codes from which you would like to transfer eligible subcomponents.</Text>
      <Box mb="x2">
        <Text fontWeight="bold" mb="x2">
          Current work order:
        </Text>
        {renderJobSections(OPTION5_CURRENT_WO_JOBS, currentWO)}
        <Text fontWeight="bold" mb="x2" mt="x4">
          Different work order:
        </Text>
        {renderJobSections(OPTION5_DIFFERENT_WO_JOBS, differentWO)}
      </Box>
      <ToastContainer />
    </Modal>
  );
}

export const Option6FlatTableWithItemColumn = () => <Option6Modal />;
Option6FlatTableWithItemColumn.storyName = "Option 6 – Flat Table with Item Column";

const ListItem = styled(NDSListItem)(() => ({
  listStyle: "initial",
}));
