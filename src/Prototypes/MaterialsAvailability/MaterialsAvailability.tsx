import React, { useState, useRef, useLayoutEffect } from 'react';
import { Tabs, Tab } from '../../Tabs';
import { BrandedNavBar } from '../../BrandedNavBar';
import { Box } from '../../Box';
import { Breadcrumbs } from '../../Breadcrumbs';
import { Link } from '../../Link';
import { Header } from '../../Layout';
import { Table } from '../../Table';
import { CellInfoType } from '../../Table/Table.types';
import { Pagination } from '../../Pagination';
import { StatusIndicator } from '../../StatusIndicator';
import { IconicButton, PrimaryButton, QuietButton } from '../../Button';
import { Icon } from '../../Icon';
import { Sidebar } from '../../Layout';
import { Input } from '../../Input';
import { Select, NDSOptionValue } from '../../Select';
import { Heading3, Heading4, Text } from '../../Type';
import styled, { useTheme } from 'styled-components';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { DescriptionList, DescriptionGroup, DescriptionTerm, DescriptionDetails } from '../../DescriptionList/index';
import { DropdownMenu, DropdownButton } from '../../DropdownMenu';
import { Tooltip } from '../../Tooltip';
import { Switcher, Switch } from '../../Switcher';
import { Flex } from '../../Flex';

interface MaterialsAvailabilityProps {
  selectedIndex?: number;
  hideNavigation?: boolean;
  onTabChange?: (index: number) => void;
}

const menuData = {
  primaryMenu: [
    { name: 'Order management', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Inventory management', href: '#' },
    { name: 'Items', href: '#' },
    { name: 'Imports and exports', href: '#' },
  ],
  secondaryMenu: []
};

const StyledTable = styled(Table)`
  th, td {
    min-width: 120px;
    position: relative;
    padding: ${props => props.theme.space.x1};
    font-size: ${props => props.theme.fontSizes.small};
    max-height: 48px;
    overflow: visible;
  }
  th:first-child, td:first-child {
    min-width: auto;
  }
  th:nth-child(5), td:nth-child(5) {
    min-width: 100px;
    width: 100px;
  }
  th:nth-child(6), td:nth-child(6) {
    min-width: 40px !important;
    width: 40px !important;
    padding-left: 8px !important;
  }
  th[data-divider="true"]::before, td[data-divider="true"]::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: ${props => props.theme.colors.lightGrey};
  }
  th[data-divider="true"], td[data-divider="true"] {
    padding-left: 16px;
  }
  tr {
    position: relative;
  }
  
  /* Remove borders from expanded rows within a group */
  &&&& tbody tr.material-group-item {
    border-bottom: none !important;
  }
  
  /* Add border only after the last row of each material group */
  &&&& tbody tr.material-group-last {
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey} !important;
  }
  
  /* Collapsed rows keep their borders */
  &&&& tbody tr.material-collapsed {
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey} !important;
  }
`;

const TableContainer = styled(Box)`
  max-width: 100%;
`;

const ScrollableTable = styled(Box)`
  overflow-x: auto;
  margin-bottom: 16px;
`;

const FullWidthBox = styled(Box)`
  width: 100%;
`;

const TableHeader = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  min-height: 40px;
`;

const FilterSection = styled(Box)`
  margin-bottom: 24px;
`;

const FilterLabel = styled(Box)`
  margin-bottom: 8px;
  font-weight: 500;
`;

const FilterFooter = styled(Box)`
  padding-top: 4px;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
`;

const SelectContainer = styled(Box)`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: flex-end;
`;

const SelectWrapper = styled(Box)<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${props => props.width || 'auto'};
`;

const SelectLabel = styled(Box)`
  font-weight: 500;
`;

const QuantityCell = styled.button<{ color: string }>`
  color: ${props => props.theme.colors[props.color]};
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const LineItemLabel = styled.span`
  .item-details {
    color: ${props => props.theme.colors.midGrey};
  }
`;

const formatLineItemLabel = (poLineItem: string, itemCode: string, itemDescription: string) => (
  <LineItemLabel>
    {poLineItem} • <span className="item-details">{itemCode} • {itemDescription}</span>
  </LineItemLabel>
);

const getStatusType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'temporary shortage':
      return 'warning';
    case 'material shortage':
      return 'danger';
    case 'no shortage':
      return 'quiet';
    default:
      return 'quiet';
  }
};

const TooltipCell = styled.div`
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  &:hover {
    cursor: help;
  }
`;

const TruncatedCell = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 48px;
`;

const TooltipWrapper = ({ children, content }: { children: React.ReactNode; content: string }) => (
  <Tooltip tooltip={content}>
    {children}
  </Tooltip>
);

const columns = [
  { dataKey: 'poNumber', label: 'PO number',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'customer', label: 'Customer',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'itemCode', label: 'Item code and description',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'supplierPOLineItem', label: 'Supplier PO line item number',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { 
    dataKey: 'priority', 
    label: 'Priority',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { 
    dataKey: 'problemsAndRisks', 
    label: 'Problems and risks',
    metadata: { divider: true },
    cellRenderer: ({ cellData }) => {
      if (cellData === 'Temporary material shortage') {
        return <StatusIndicator type="warning" style={{ whiteSpace: 'nowrap' }}>Temporary material shortage</StatusIndicator>;
      } else if (cellData === 'Material shortage') {
        return <StatusIndicator type="danger" style={{ whiteSpace: 'nowrap' }}>Material shortage</StatusIndicator>;
      } else if (cellData === 'Late') {
        return <StatusIndicator type="danger" style={{ whiteSpace: 'nowrap' }}>Late</StatusIndicator>;
      } else if (cellData === 'None') {
        return '-';
      }
      return (
        <TooltipWrapper content={cellData}>
          <TruncatedCell>{cellData}</TruncatedCell>
        </TooltipWrapper>
      );
    }
  },
  { dataKey: 'validatedForAssembly', label: 'Tags',
    cellRenderer: ({ cellData }) => {
      if (!cellData || cellData.length === 0) return '-';
      return (
        <Box>
          {cellData.map((tag: string, index: number) => (
            <Box key={tag} mb={index < cellData.length - 1 ? "x1" : 0}>
              <StatusIndicator type="quiet" style={{ whiteSpace: 'nowrap' }}>{tag}</StatusIndicator>
            </Box>
          ))}
        </Box>
      );
    }
  },
  { 
    dataKey: 'canRunNow', 
    label: 'FG quantity produceable (now)',
    cellRenderer: ({ cellData }) => {
      const text = `${cellData} ${cellData > 0 ? 'PCS' : ''}`;
      return (
        <TooltipWrapper content={text}>
          <TruncatedCell>{text}</TruncatedCell>
        </TooltipWrapper>
      );
    }
  },
  { 
    dataKey: 'canRunByStartDate', 
    label: 'FG quantity produceable (by production start date)',
    cellRenderer: ({ cellData }) => {
      const text = `${cellData} ${cellData > 0 ? 'PCS' : ''}`;
      return (
        <TooltipWrapper content={text}>
          <TruncatedCell>{text}</TruncatedCell>
        </TooltipWrapper>
      );
    }
  },
  { dataKey: 'materialAvailabilityDate', label: 'Material availability date',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'productionProgress', label: 'Production progress',
    cellRenderer: ({ cellData }) => {
      if (typeof cellData === 'object' && cellData !== null) {
        const { completed, total, percentage } = cellData;
        const text = `${completed}/${total} • ${percentage}%`;
        return (
          <TooltipWrapper content={text}>
            <TruncatedCell>{text}</TruncatedCell>
          </TooltipWrapper>
        );
      }
      return (
        <TooltipWrapper content={cellData}>
          <TruncatedCell>{cellData}</TruncatedCell>
        </TooltipWrapper>
      );
    }
  },
  { 
    dataKey: 'collaborationStatus', 
    label: 'Collaboration status',
    metadata: { divider: true },
    cellRenderer: ({ cellData }) => {
      if (cellData === 'Requires your response') {
        return <StatusIndicator type="warning" style={{ whiteSpace: 'nowrap' }}>Requires your response</StatusIndicator>;
      } else if (cellData === 'Awaiting supplier response') {
        return <StatusIndicator type="quiet" style={{ whiteSpace: 'nowrap' }}>Awaiting supplier response</StatusIndicator>;
      } else if (cellData === 'Accepted') {
        return <StatusIndicator type="quiet" style={{ whiteSpace: 'nowrap' }}>Accepted</StatusIndicator>;
      } else {
        return (
          <TooltipWrapper content={cellData}>
            <TruncatedCell>{cellData}</TruncatedCell>
          </TooltipWrapper>
        );
      }
    }
  },
  { dataKey: 'quantity', label: 'Quantity',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData?.toString() || ''}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'uom', label: 'UOM',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'productionDueDate', label: 'Production due date',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'unitPrice', label: 'Unit price',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData?.toString() || ''}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'currency', label: 'Currency',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'reason', label: 'Reason',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'note', label: 'Note',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'productionStartDate', label: 'Production start date',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { 
    dataKey: 'nextProductionDate', 
    label: 'Next production date',
    metadata: { divider: true },
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'closeProductionNote', label: 'Close production note',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'carryOverSentTo', label: 'Carry over sent to',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'shipTo', label: 'Ship to',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
  { dataKey: 'needByDate', label: 'Need by date',
    cellRenderer: ({ cellData }) => (
      <TooltipWrapper content={cellData}>
        <TruncatedCell>{cellData}</TruncatedCell>
      </TooltipWrapper>
    )
  },
];

// Function to calculate FG quantity produceable based on material bottleneck
const calculateFGQuantityProduceable = (includeInTransit = false, productionStartDate = '2025-06-20', requiredQuantity = 100) => {
  const bomMaterials = [
    {
      material: 'Steel Rod 12mm',
      materialRequirement: 3, // KG per 1 FG
      initialOnHand: 50,
      inTransitQuantity: 20, // From STO arriving 2025-06-15
      inTransitDate: '2025-06-15',
      events: [
        { date: '2025-06-15', quantity: 20 }, // First STO
        { date: '2025-06-25', quantity: 30 }, // Second STO
      ],
      totalRequired: requiredQuantity * 3 // Calculate total required based on BOM ratio
    },
    {
      material: 'Aluminum Sheet 5mm', 
      materialRequirement: 2, // M² per 1 FG
      initialOnHand: 40,
      inTransitQuantity: 20, // From STO arriving 2025-06-10
      inTransitDate: '2025-06-10',
      events: [
        { date: '2025-06-10', quantity: 20 }, // First STO
      ],
      totalRequired: requiredQuantity * 2 // Calculate total required based on BOM ratio
    },
    {
      material: 'Copper Wire 2.5mm',
      materialRequirement: 1, // M per 1 FG
      initialOnHand: 15,
      inTransitQuantity: 0, // No STO for copper wire before production start
      inTransitDate: null,
      events: [
        { date: '2025-06-28', quantity: 50 }, // First STO
      ],
      totalRequired: requiredQuantity * 1 // Calculate total required based on BOM ratio
    }
  ];

  let bottleneckQuantity = Infinity;
  let materialsAvailabilityDate = null;

  // Get all unique dates from all materials' events
  const allDates = new Set();
  bomMaterials.forEach(material => {
    material.events.forEach(event => allDates.add(event.date));
  });

  // Sort dates chronologically
  const sortedDates = Array.from(allDates).sort();

  // For each date, check if all materials have sufficient quantity
  for (const date of sortedDates) {
    let allMaterialsAvailable = true;
    let minQuantityAvailable = Infinity;

    bomMaterials.forEach(material => {
      let availableQuantity = material.initialOnHand;
      
      // Add quantities from events up to and including current date
      material.events.forEach(event => {
        if (event.date <= date) {
          availableQuantity += event.quantity;
        }
      });
      
      // Calculate how many FG units this material can support
      const fgUnits = Math.floor(availableQuantity / material.materialRequirement);
      minQuantityAvailable = Math.min(minQuantityAvailable, fgUnits);
      
      // Check if we have enough quantity to meet the total required
      if (availableQuantity < material.totalRequired) {
        allMaterialsAvailable = false;
      }
    });

    // If all materials are available and we haven't set a date yet, this is our date
    if (allMaterialsAvailable && !materialsAvailabilityDate) {
      materialsAvailabilityDate = date;
      bottleneckQuantity = minQuantityAvailable;
    }
  }

  // If we're not including in-transit or checking by production start date,
  // we should only consider initial on-hand quantities
  if (!includeInTransit) {
    bottleneckQuantity = Infinity;
    bomMaterials.forEach(material => {
      const fgUnits = Math.floor(material.initialOnHand / material.materialRequirement);
      bottleneckQuantity = Math.min(bottleneckQuantity, fgUnits);
    });
  } else if (productionStartDate) {
    // If we're checking by production start date, only include events before that date
    bottleneckQuantity = Infinity;
    bomMaterials.forEach(material => {
      let availableQuantity = material.initialOnHand;
      material.events.forEach(event => {
        if (event.date <= productionStartDate) {
          availableQuantity += event.quantity;
        }
      });
      const fgUnits = Math.floor(availableQuantity / material.materialRequirement);
      bottleneckQuantity = Math.min(bottleneckQuantity, fgUnits);
    });
  } 

  return {
    quantity: bottleneckQuantity === Infinity ? 0 : bottleneckQuantity,
    materialsAvailabilityDate
  };
};

const sampleData = [
  {
    id: '1',
    poNumber: 'PO-001',
    customer: 'Sample Customer',
    itemCode: 'ITEM-001 - Sample Item',
    supplierPOLineItem: 'SPO-001',
    priority: 'High',
    problemsAndRisks: 'None',
    materialAvailabilityDate: calculateFGQuantityProduceable(true, '2025-06-20', 25).materialsAvailabilityDate,
    canRunNow: calculateFGQuantityProduceable(false, '2025-06-20', 25).quantity,
    canRunByStartDate: calculateFGQuantityProduceable(true, '2025-06-20', 25).quantity,
    productionProgress: {
      completed: 75,
      total: 100,
      percentage: 75
    },
    validatedForAssembly: ['Validated for assembly', 'Express shipment'],
    collaborationStatus: 'Requires your response',
    quantity: 100,
    uom: 'PCS',
    requestType: 'Standard',
    productionDueDate: '2025-06-30',
    unitPrice: 10.99,
    currency: 'USD',
    reason: 'Material shortage - Waiting for component delivery',
    note: 'Sample note',
    productionStartDate: '2025-06-20',
    nextProductionDate: '2025-06-30',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse A',
    shipTo: 'Customer Location',
    needByDate: '2025-07-15',
  },
  {
    id: '2',
    poNumber: 'PO-002',
    customer: 'Sample Customer 2',
    itemCode: 'ITEM-002 - Sample Item 2',
    supplierPOLineItem: 'SPO-002',
    priority: 'Medium',
    problemsAndRisks: 'Temporary material shortage',
    materialAvailabilityDate: calculateFGQuantityProduceable(true, '2025-06-15', 60).materialsAvailabilityDate,
    canRunNow: calculateFGQuantityProduceable(false, '2025-06-15', 60).quantity,
    canRunByStartDate: calculateFGQuantityProduceable(true, '2025-06-15', 60).quantity,
    productionProgress: {
      completed: 40,
      total: 100,
      percentage: 40
    },
    validatedForAssembly: ['Validated for assembly'],
    collaborationStatus: 'Awaiting supplier response',
    quantity: 150,
    uom: 'PCS',
    requestType: 'Standard',
    productionDueDate: '2025-06-25',
    unitPrice: 15.99,
    currency: 'USD',
    reason: 'Machine breakdown - Production line maintenance',
    note: 'Sample note 2',
    productionStartDate: '2025-06-15',
    nextProductionDate: '2025-06-25',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse B',
    shipTo: 'Customer Location 2',
    needByDate: '2025-07-10',
  },
  {
    id: '3',
    poNumber: 'PO-003',
    customer: 'Sample Customer 3',
    itemCode: 'ITEM-003 - Sample Item 3',
    supplierPOLineItem: 'SPO-003',
    priority: 'Low',
    problemsAndRisks: 'Late',
    materialAvailabilityDate: calculateFGQuantityProduceable(true, '2025-06-20', 90).materialsAvailabilityDate,
    canRunNow: calculateFGQuantityProduceable(false, '2025-06-20', 90).quantity,
    canRunByStartDate: calculateFGQuantityProduceable(true, '2025-06-20', 90).quantity,
    productionProgress: {
      completed: 60,
      total: 150,
      percentage: 40
    },
    validatedForAssembly: ['Express shipment'],
    collaborationStatus: 'Accepted',
    quantity: 60,
    uom: 'PCS',
    requestType: 'Express',
    productionDueDate: '2025-07-02',
    unitPrice: 12.99,
    currency: 'USD',
    reason: 'Labour shortage - Reduced workforce availability',
    note: 'Sample note 3',
    productionStartDate: '2025-06-20',
    nextProductionDate: '2025-07-02',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse C',
    shipTo: 'Customer Location 3',
    needByDate: '2025-07-12',
  },
  {
    id: '4',
    poNumber: 'PO-004',
    customer: 'Sample Customer 4',
    itemCode: 'ITEM-004 - Sample Item 4',
    supplierPOLineItem: 'SPO-004',
    priority: 'High',
    problemsAndRisks: 'Material shortage',
    materialAvailabilityDate: calculateFGQuantityProduceable(true, '2025-06-28', 200).materialsAvailabilityDate,
    canRunNow: calculateFGQuantityProduceable(false, '2025-06-28', 200).quantity,
    canRunByStartDate: calculateFGQuantityProduceable(true, '2025-06-28', 200).quantity,
    productionProgress: {
      completed: 0,
      total: 200,
      percentage: 0
    },
    validatedForAssembly: [],
    collaborationStatus: 'Awaiting supplier response',
    quantity: 200,
    uom: 'PCS',
    requestType: 'Standard',
    productionDueDate: '2025-07-08',
    unitPrice: 8.99,
    currency: 'USD',
    reason: 'Quality control issues - Material inspection required',
    note: 'Sample note 4',
    productionStartDate: '2025-06-28',
    nextProductionDate: '2025-07-08',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse D',
    shipTo: 'Customer Location 4',
    needByDate: '2025-07-18',
  }
];

const HoverableCell = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const inboundTableColumns = [
  { 
    dataKey: 'stockTransferOrder', 
    label: 'STO number',
    cellRenderer: ({ cellData }) => (
      <PaddedCell style={{ cursor: 'pointer' }}>
        <HoverableText>{cellData}</HoverableText>
      </PaddedCell>
    )
  },
  { dataKey: 'expectedShipDate', label: 'Expected ship date' },
  { dataKey: 'actualShipDate', label: 'Actual ship date' },
  { dataKey: 'expectedReceiveDate', label: 'Expected receive date' },
  { dataKey: 'expectedQuantity', label: 'Expected quantity' },
  { dataKey: 'shippedQuantity', label: 'Shipped quantity' },
  { dataKey: 'deliveryNumber', label: 'Delivery number' },
];

// Add a styled component for left padding
const PaddedCell = styled.span`
  padding-left: ${props => props.theme.space.x1};
  white-space: nowrap;
`;

const allocatedTableColumns = [
  {
    dataKey: 'po',
    label: 'PO',
    cellRenderer: ({ cellData }) => (
      <PaddedCell>{cellData}</PaddedCell>
    ),
  },
  { dataKey: 'lineItemNumber', label: 'Line item number' },
  { dataKey: 'supplierPOLineItem', label: 'Supplier PO line item number' },
  { dataKey: 'itemCode', label: 'Item code and description' },
  { dataKey: 'productionDueDate', label: 'Production due date' },
  { 
    dataKey: 'productionProgress', 
    label: 'Production progress',
    cellRenderer: ({ cellData }) => {
      if (typeof cellData === 'object' && cellData !== null) {
        const { completed, total, percentage } = cellData;
        return `${completed}/${total} • ${percentage}%`;
      }
      return cellData;
    }
  },
  { dataKey: 'materialRequired', label: 'Material required for remaining production' },
];

const getInboundTableData = (totalQuantity: number) => [
  {
    id: '1',
    stockTransferOrder: 'STO-001',
    expectedShipDate: '2025-06-10',
    actualShipDate: '2025-06-11',
    expectedReceiveDate: '2025-06-15',
    expectedQuantity: Math.floor(totalQuantity * 0.6),
    shippedQuantity: Math.floor(totalQuantity * 0.6),
    deliveryNumber: 'DEL-001',
  },
  {
    id: '2',
    stockTransferOrder: 'STO-002',
    expectedShipDate: '2025-06-18',
    actualShipDate: null,
    expectedReceiveDate: '2025-06-25',
    expectedQuantity: Math.floor(totalQuantity * 0.4),
    shippedQuantity: 0,
    deliveryNumber: null,
  },
];

const getAllocatedTableData = (totalQuantity: number) => [
  {
    id: '1',
    po: 'PO-001',
    lineItemNumber: 'SPO-001',
    supplierPOLineItem: 'SPO-001',
    itemCode: 'ITEM-001 - Sample Item',
    productionDueDate: '2025-06-30',
    productionProgress: {
      completed: 75,
      total: 100,
      percentage: 75
    },
    materialRequired: Math.floor(totalQuantity * 0.6),
  },
  {
    id: '2',
    po: 'PO-002',
    lineItemNumber: 'SPO-002',
    supplierPOLineItem: 'SPO-002',
    itemCode: 'ITEM-002 - Sample Item 2',
    productionDueDate: '2025-06-25',
    productionProgress: {
      completed: 40,
      total: 100,
      percentage: 40
    },
    materialRequired: Math.floor(totalQuantity * 0.4),
  },
];

const FilterDivider = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  margin-bottom: 24px;
`;

const FilterChipButton = styled.button<{
  active?: boolean;
}>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 16px;
  }
`;

const FilterChip: React.FC<{ label: string; count: number; active: boolean; onClick: () => void; innerType?: 'danger' | 'warning' | 'quiet' | 'success' | 'informative' | 'neutral' }> = ({ label, count, active, onClick, innerType = 'danger' }) => {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  let styleOverrides: React.CSSProperties = {};
  if (active && theme) {
    styleOverrides.backgroundColor = theme.colors.lightBlue;
    styleOverrides.color = theme.colors.black;
    styleOverrides.borderColor = theme.colors.grey;
  } else if (hovered && !active) {
    styleOverrides.backgroundColor = '#F5F5F7';
  }
  return (
    <FilterChipButton
      onClick={onClick}
      active={active}
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StatusIndicator
        type={active ? 'danger' : 'quiet'}
        style={styleOverrides}
      >
        {label}
        <StatusIndicator type={innerType} my="x1" ml="x1">{count}</StatusIndicator>
      </StatusIndicator>
    </FilterChipButton>
  );
};

const VerticalDivider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colors.lightGrey};
  margin: 0 12px;
`;

const ActionRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  margin-top: -56px;
  margin-bottom: 16px;
`;

const ActionButtons = styled(Box)`
  display: flex;
  & > * + * {
    margin-left: ${props => props.theme.space.x2};
  }
`;

const HoverableText = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

const TwoRowCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MaterialCodeLink = styled.a`
  color: ${props => props.theme.colors.blue};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MaterialDescription = styled.div`
  color: ${props => props.theme.colors.darkGrey};
  font-size: ${props => props.theme.fontSizes.small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MaterialsAvailability: React.FC<MaterialsAvailabilityProps> = ({ 
  selectedIndex = 0, 
  hideNavigation = false,
  onTabChange
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filteredData, setFilteredData] = useState(sampleData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedPO, setSelectedPO] = useState<string | null>('');
  const [selectedLineItem, setSelectedLineItem] = useState<string | null>('');
  const [showMaterialsTable, setShowMaterialsTable] = useState(false);
  const [isInboundSidebarOpen, setIsInboundSidebarOpen] = useState(false);
  const [isAllocatedSidebarOpen, setIsAllocatedSidebarOpen] = useState(false);
  const [selectedInbound, setSelectedInbound] = useState<{ component: string; quantity: number } | null>(null);
  const [selectedAllocated, setSelectedAllocated] = useState<{ component: string; quantity: number } | null>(null);
  const [expandedMaterials, setExpandedMaterials] = useState<Set<string>>(new Set());
  const [uomMode, setUomMode] = useState<'customer' | 'supplier'>('customer');
  const filterButtonRef = React.useRef<HTMLButtonElement>(null);
  const inboundButtonRef = React.useRef<HTMLButtonElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const theme = useTheme();
  const filterChipsRef = useRef<HTMLDivElement>(null);
  const rightButtonsRef = useRef<HTMLDivElement>(null);
  const [collapseActions, setCollapseActions] = useState(false);
  const [currentPOData, setCurrentPOData] = useState<any>(null);

  useLayoutEffect(() => {
    function checkSpace() {
      if (filterChipsRef.current && rightButtonsRef.current) {
        const chipsRect = filterChipsRef.current.getBoundingClientRect();
        const rightRect = rightButtonsRef.current.getBoundingClientRect();
        const space = rightRect.left - chipsRect.right;
        const minSpace = parseInt(theme.space.x3, 10) || 24;
        setCollapseActions(space < minSpace);
      }
    }
    checkSpace();
    window.addEventListener('resize', checkSpace);
    return () => window.removeEventListener('resize', checkSpace);
  }, [theme.space.x3]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    let filtered = sampleData;
    
    // Apply filter chip filters
    if (activeFilter === 'late') {
      filtered = filtered.filter(row => row.problemsAndRisks === 'Late');
    }
    if (activeFilter === 'material-shortage') {
      filtered = filtered.filter(row => row.problemsAndRisks === 'Material shortage');
    }
    if (activeFilter === 'temp-shortage') {
      filtered = filtered.filter(row => row.problemsAndRisks === 'Temporary material shortage');
    }
    if (activeFilter === 'requires-response') {
      filtered = filtered.filter(row => row.collaborationStatus === 'Requires your response');
    }
    if (activeFilter === 'awaiting-supplier') {
      filtered = filtered.filter(row => row.collaborationStatus === 'Awaiting supplier response');
    }

    // Apply tag filters
    if (filters.validatedForAssembly) {
      filtered = filtered.filter(row => row.validatedForAssembly?.includes('Validated for assembly'));
    }
    if (filters.expressShipment) {
      filtered = filtered.filter(row => row.validatedForAssembly?.includes('Express shipment'));
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || key === 'validatedForAssembly' || key === 'expressShipment') return;
      
      const cellValue = filtered[0]?.[key];
      if (typeof value === 'string') {
        filtered = filtered.filter(row => 
          row[key]?.toString().toLowerCase().includes(value.toLowerCase())
        );
      } else {
        filtered = filtered.filter(row => row[key] === value);
      }
    });
    
    setFilteredData(filtered);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredData(sampleData);
    setIsFilterOpen(false);
  };

  const renderFilters = () => (
    <Box p="half">
      <FilterSection>
        <FilterLabel>Saved filters</FilterLabel>
        <Select
          options={[
            { value: '', label: 'Select a saved filter' },
            { value: 'filter1', label: 'Filter 1' },
            { value: 'filter2', label: 'Filter 2' },
            { value: 'filter3', label: 'Filter 3' },
          ]}
          value={filters.savedFilter || ''}
          onChange={value => handleFilterChange('savedFilter', value)}
        />
      </FilterSection>
      <FilterDivider />
<Box mb="x6">
        <Heading4 color="midGrey">Item details</Heading4>
        <FilterSection>
          <FilterLabel>Search for item code, description or alternate code</FilterLabel>
          <Input 
            placeholder="Search items" 
            value={filters.itemSearch || ''}
            onChange={e => handleFilterChange('itemSearch', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Brand</FilterLabel>
          <Input 
            placeholder="Filter by brand" 
            value={filters.brand || ''}
            onChange={e => handleFilterChange('brand', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Division</FilterLabel>
          <Input 
            placeholder="Filter by division" 
            value={filters.division || ''}
            onChange={e => handleFilterChange('division', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Product group</FilterLabel>
          <Input 
            placeholder="Filter by product group" 
            value={filters.productGroup || ''}
            onChange={e => handleFilterChange('productGroup', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Customer</FilterLabel>
          <Input 
            placeholder="Filter by customer" 
            value={filters.customer || ''}
            onChange={e => handleFilterChange('customer', e.target.value)}
          />
        </FilterSection>
      </Box>
      <FilterDivider />

      <Box mb="x6">
        <Heading4 color="midGrey">Order details</Heading4>
        <FilterSection>
          <FilterLabel>Production due date range</FilterLabel>
          <Input 
            placeholder="Select date range" 
            value={filters.productionDueDateRange || ''}
            onChange={e => handleFilterChange('productionDueDateRange', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Purchase orders</FilterLabel>
          <Input 
            placeholder="Filter by purchase orders" 
            value={filters.purchaseOrders || ''}
            onChange={e => handleFilterChange('purchaseOrders', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Supplier PO line item number</FilterLabel>
          <Input 
            placeholder="Filter by supplier PO line item" 
            value={filters.supplierPOLineItem || ''}
            onChange={e => handleFilterChange('supplierPOLineItem', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Priority</FilterLabel>
          <Select
            options={[
              { value: '', label: 'All' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
            value={filters.priority || ''}
            onChange={value => handleFilterChange('priority', value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Collaboration status</FilterLabel>
          <Select
            options={[
              { value: '', label: 'All' },
              { value: 'Requires your response', label: 'Requires your response' },
              { value: 'Awaiting supplier response', label: 'Awaiting supplier response' },
              { value: 'Accepted', label: 'Accepted' },
            ]}
            value={filters.collaborationStatus || ''}
            onChange={value => handleFilterChange('collaborationStatus', value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Production progress</FilterLabel>
          <Select
            options={[
              { value: '', label: 'All' },
              { value: 'not_started', label: 'Not Started' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
            value={filters.productionProgress || ''}
            onChange={value => handleFilterChange('productionProgress', value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Tags</FilterLabel>
          <Box>
            <Checkbox
              labelText="Only line items marked as validated for assembly"
              checked={filters.validatedForAssembly || false}
              onChange={e => handleFilterChange('validatedForAssembly', e.target.checked)}
            />
            <Box>
              <Checkbox
                labelText="Only line items marked as express shipments"
                checked={filters.expressShipment || false}
                onChange={e => handleFilterChange('expressShipment', e.target.checked)}
              />
            </Box>
          </Box>
        </FilterSection>
        <FilterSection>
          <FilterLabel>Demand</FilterLabel>
          <Checkbox
            labelText="Only line items with a requested or proposed quantity"
            checked={filters.demand || false}
            onChange={e => handleFilterChange('demand', e.target.checked)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Updates</FilterLabel>
          <Box>
            <Checkbox
              labelText="Only line items with new comments"
              checked={filters.hasNewComments || false}
              onChange={e => handleFilterChange('hasNewComments', e.target.checked)}
            />
            <Box>
              <Checkbox
                labelText="Only line items with new attachments"
                checked={filters.hasNewAttachments || false}
                onChange={e => handleFilterChange('hasNewAttachments', e.target.checked)}
              />
            </Box>
          </Box>
        </FilterSection>
        <FilterSection>
          <FilterLabel>Order type</FilterLabel>
          <Select
            options={[
              { value: '', label: 'All' },
              { value: 'standard', label: 'Standard' },
              { value: 'express', label: 'Express' },
              { value: 'rush', label: 'Rush' },
            ]}
            value={filters.orderType || ''}
            onChange={value => handleFilterChange('orderType', value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Canceled line items</FilterLabel>
          <Select
            options={[
              { value: '', label: 'All' },
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={filters.canceledLineItems || ''}
            onChange={value => handleFilterChange('canceledLineItems', value)}
          />
        </FilterSection>
      </Box>
      <FilterDivider />

      <Box mb="x6">
        <Heading4 color="midGrey">Material details</Heading4>
        <FilterSection>
          <FilterLabel>Material availability status</FilterLabel>
          <Select
            options={[
              { value: '', label: 'All' },
              { value: 'No shortage', label: 'No shortage' },
              { value: 'Temporary shortage', label: 'Temporary shortage' },
              { value: 'Material shortage', label: 'Material shortage' },
            ]}
            value={filters.materialAvailabilityStatus || ''}
            onChange={value => handleFilterChange('materialAvailabilityStatus', value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Search for item code, description or alternate code</FilterLabel>
          <Input 
            placeholder="Search subcomponents" 
            value={filters.subcomponentSearch || ''}
            onChange={e => handleFilterChange('subcomponentSearch', e.target.value)}
          />
        </FilterSection>
        
      </Box>
      <FilterDivider />

      <Box>
        <Heading4 color="midGrey">Delivery details</Heading4>
        <FilterSection>
          <FilterLabel>Ship to</FilterLabel>
          <Input 
            placeholder="Filter by ship to location" 
            value={filters.shipTo || ''}
            onChange={e => handleFilterChange('shipTo', e.target.value)}
          />
        </FilterSection>
        <FilterSection>
          <FilterLabel>Need by date</FilterLabel>
          <Input 
            placeholder="Select need by date" 
            value={filters.needByDate || ''}
            onChange={e => handleFilterChange('needByDate', e.target.value)}
          />
        </FilterSection>
        
      </Box>
    </Box>
  );

  const renderFilterFooter = () => (
    <FilterFooter>
      <Box display="flex">
        <PrimaryButton onClick={applyFilters}>
          Apply
        </PrimaryButton>
        <Box ml="x2">
          <Button onClick={() => {}}>
            Save
          </Button>
        </Box>
      </Box>
      <Box>
        <QuietButton onClick={resetFilters}>
          Reset
        </QuietButton>
      </Box>
    </FilterFooter>
  );

  const poOptions = [
    { value: '', label: 'Select PO' },
    { value: 'PO-001', label: 'PO-001' },
    { value: 'PO-002', label: 'PO-002' },
  ];

  const lineItemOptions = [
    { value: '', label: 'Select line item' },
    { 
      value: 'SPO-001', 
      label: formatLineItemLabel('SPO-001', 'ITEM-001', 'Sample Item')
    },
    { 
      value: 'SPO-002', 
      label: formatLineItemLabel('SPO-002', 'ITEM-002', 'Sample Item 2')
    },
  ];

  const handlePOChange = (value: NDSOptionValue) => {
    setSelectedPO(value as string);
  };

  const handleLineItemChange = (value: NDSOptionValue) => {
    setSelectedLineItem(value as string);
  };

  const handleApply = () => {
    if (selectedPO && selectedLineItem) {
      // Find the selected PO data
      const poData = sampleData.find(item => 
        item.poNumber === selectedPO && 
        item.supplierPOLineItem === selectedLineItem
      );
      
      if (poData) {
        // Calculate remaining quantity
        const remainingQuantity = poData.productionProgress.total - poData.productionProgress.completed;
        
        // Update the data with new calculations
        const updatedPOData = {
          ...poData,
          materialAvailabilityDate: calculateFGQuantityProduceable(
            true, 
            poData.productionStartDate, 
            remainingQuantity
          ).materialsAvailabilityDate,
          canRunNow: calculateFGQuantityProduceable(
            false, 
            poData.productionStartDate, 
            remainingQuantity
          ).quantity,
          canRunByStartDate: calculateFGQuantityProduceable(
            true, 
            poData.productionStartDate, 
            remainingQuantity
          ).quantity
        };
        
        setCurrentPOData(updatedPOData);
        setShowMaterialsTable(true);
      }
    }
  };

  const handleReset = () => {
    setSelectedPO('');
    setSelectedLineItem('');
    setShowMaterialsTable(false);
    setCurrentPOData(null);
  };

  const handleInboundClose = () => {
    setIsInboundSidebarOpen(false);
    setSelectedInbound(null);
  };

  const handleInboundClick = React.useCallback((component: string, quantity: number) => {
    setSelectedInbound({ component, quantity });
    setIsInboundSidebarOpen(true);
  }, []);

  const handleAllocatedClick = React.useCallback((component: string, quantity: number) => {
    setSelectedAllocated({ component, quantity });
    setIsAllocatedSidebarOpen(true);
  }, []);

  const handleAllocatedClose = () => {
    setIsAllocatedSidebarOpen(false);
    setSelectedAllocated(null);
  };

  const toggleMaterialExpansion = (materialId: string) => {
    setExpandedMaterials(prev => {
      const newSet = new Set(prev);
      if (newSet.has(materialId)) {
        newSet.delete(materialId);
      } else {
        newSet.add(materialId);
      }
      return newSet;
    });
  };

  // Generate expanded table data with nested events
  const generateExpandedTableData = () => {
    const selectedPoLineItem = '001-001'; // This would come from the selected PO and line item
    
    // Helper function to get priority order for sorting
    const getPriorityOrder = (priority: string) => {
      switch (priority) {
        case 'High': return 1;
        case 'Medium': return 2;
        case 'Low': return 3;
        default: return 4; // For STOs with '-' priority
      }
    };
    
    // Customer UOM data
    const customerUOMData = [
      {
        id: '1',
        materialCode: 'NUL-STL-ROD-12',
        material: 'Steel Rod 12mm',
        materialAlternateCode: 'STL-12-ROD',
        uom: 'KG',
        materialRequirement: '3',
        componentScrap: '0',
        conversionFactor: 1,
        selectedPoLineItem: selectedPoLineItem,
        events: [
          {
            id: '1-1',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 20,
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-15',
            remainingMaterialDemandOnly: 0,
            poLineItem: '001-002',
            isSelectedPo: false,
            initialOnHand: 50
          },
          {
            id: '1-2',
            inventoryEvent: 'PO line item',
            priority: 'High',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 75,
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 75,
            poLineItem: selectedPoLineItem,
            isSelectedPo: true,
            initialOnHand: 0 // Will be calculated from previous event
          },
          {
            id: '1-3',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 30,
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-25',
            remainingMaterialDemandOnly: 0,
            poLineItem: '002-001',
            isSelectedPo: false,
            initialOnHand: 0 // Will be calculated from previous event
          },
          {
            id: '1-4',
            inventoryEvent: 'PO line item',
            priority: 'Low',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 45,
            productionStartExpectedReceiveDate: '2025-07-02',
            remainingMaterialDemandOnly: 45,
            poLineItem: '002-003',
            isSelectedPo: false,
            initialOnHand: 0 // Will be calculated from previous event
          }
        ]
      },
      {
        id: '2',
        materialCode: 'NUL-ALU-SHT-5',
        material: 'Aluminum Sheet 5mm',
        materialAlternateCode: 'ALU-5-SHT',
        uom: 'M²',
        materialRequirement: '2',
        componentScrap: '0',
        conversionFactor: 1,
        selectedPoLineItem: selectedPoLineItem,
        events: [
          {
            id: '2-1',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 20,
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-10',
            remainingMaterialDemandOnly: 0,
            poLineItem: '003-001',
            isSelectedPo: false,
            initialOnHand: 40
          },
          {
            id: '2-2',
            inventoryEvent: 'PO line item',
            priority: 'High',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 50,
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 50,
            poLineItem: selectedPoLineItem,
            isSelectedPo: true,
            initialOnHand: 0 // Will be calculated from previous event
          },
          {
            id: '2-3',
            inventoryEvent: 'PO line item',
            priority: 'Low',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 30,
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 30,
            poLineItem: '003-002',
            isSelectedPo: false,
            initialOnHand: 0 // Will be calculated from previous event
          }
        ]
      },
      {
        id: '3',
        materialCode: 'NUL-COP-WIR-2.5',
        material: 'Copper Wire 2.5mm',
        materialAlternateCode: 'COP-2.5-WIR',
        uom: 'M',
        materialRequirement: '1',
        componentScrap: '0',
        conversionFactor: 1,
        selectedPoLineItem: selectedPoLineItem,
        events: [
          {
            id: '3-1',
            inventoryEvent: 'PO line item',
            priority: 'High',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 25,
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 25,
            poLineItem: selectedPoLineItem,
            isSelectedPo: true,
            initialOnHand: 15
          },
          {
            id: '3-2',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 50,
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-28',
            remainingMaterialDemandOnly: 0,
            poLineItem: '004-001',
            isSelectedPo: false,
            initialOnHand: 0 // Will be calculated from previous event
          },
          {
            id: '3-3',
            inventoryEvent: 'PO line item',
            priority: 'Low',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 15,
            productionStartExpectedReceiveDate: '2025-07-02',
            remainingMaterialDemandOnly: 15,
            poLineItem: '004-002',
            isSelectedPo: false,
            initialOnHand: 0 // Will be calculated from previous event
          }
        ]
      }
    ];

    // Supplier UOM data  
    const supplierUOMData = [
      {
        id: '1',
        materialCode: 'NUL-STL-ROD-12',
        material: 'Steel Rod 12mm',
        materialAlternateCode: 'STL-12-ROD',
        uom: 'EA',
        materialRequirement: '30',
        componentScrap: '0',
        conversionFactor: 10,
        selectedPoLineItem: selectedPoLineItem,
        events: [
          {
            id: '1-1',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 200, // 20 * 10 conversion
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-15',
            remainingMaterialDemandOnly: 0,
            poLineItem: '001-002',
            isSelectedPo: false,
            initialOnHand: 500 // 50 * 10 conversion
          },
          {
            id: '1-2',
            inventoryEvent: 'PO line item',
            priority: 'High',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 750, // 75 * 10 conversion
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 750,
            poLineItem: selectedPoLineItem,
            isSelectedPo: true,
            initialOnHand: 0
          },
          {
            id: '1-3',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 300, // 30 * 10 conversion
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-25',
            remainingMaterialDemandOnly: 0,
            poLineItem: '002-001',
            isSelectedPo: false,
            initialOnHand: 0
          },
          {
            id: '1-4',
            inventoryEvent: 'PO line item',
            priority: 'Low',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 450, // 45 * 10 conversion
            productionStartExpectedReceiveDate: '2025-07-02',
            remainingMaterialDemandOnly: 450,
            poLineItem: '002-003',
            isSelectedPo: false,
            initialOnHand: 0
          }
        ]
      },
      {
        id: '2',
        materialCode: 'NUL-ALU-SHT-5',
        material: 'Aluminum Sheet 5mm',
        materialAlternateCode: 'ALU-5-SHT',
        uom: 'KG',
        materialRequirement: '20',
        componentScrap: '0',
        conversionFactor: 10,
        selectedPoLineItem: selectedPoLineItem,
        events: [
          {
            id: '2-1',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 200, // 20 * 10 conversion
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-10',
            remainingMaterialDemandOnly: 0,
            poLineItem: '003-001',
            isSelectedPo: false,
            initialOnHand: 400 // 40 * 10 conversion
          },
          {
            id: '2-2',
            inventoryEvent: 'PO line item',
            priority: 'High',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 500, // 50 * 10 conversion
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 500,
            poLineItem: selectedPoLineItem,
            isSelectedPo: true,
            initialOnHand: 0
          },
          {
            id: '2-3',
            inventoryEvent: 'PO line item',
            priority: 'Low',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 300, // 30 * 10 conversion
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 300,
            poLineItem: '003-002',
            isSelectedPo: false,
            initialOnHand: 0
          }
        ]
      },
      {
        id: '3',
        materialCode: 'NUL-COP-WIR-2.5',
        material: 'Copper Wire 2.5mm',
        materialAlternateCode: 'COP-2.5-WIR',
        uom: 'EA',
        materialRequirement: '5',
        componentScrap: '0',
        conversionFactor: 5,
        selectedPoLineItem: selectedPoLineItem,
        events: [
          {
            id: '3-1',
            inventoryEvent: 'PO line item',
            priority: 'High',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 125, // 25 * 5 conversion
            productionStartExpectedReceiveDate: '2025-06-20',
            remainingMaterialDemandOnly: 125,
            poLineItem: selectedPoLineItem,
            isSelectedPo: true,
            initialOnHand: 75 // 15 * 5 conversion
          },
          {
            id: '3-2',
            inventoryEvent: 'STO',
            priority: '-',
            inTransit: 250, // 50 * 5 conversion
            remainingMaterialDemandWithTransit: 0,
            productionStartExpectedReceiveDate: '2025-06-28',
            remainingMaterialDemandOnly: 0,
            poLineItem: '004-001',
            isSelectedPo: false,
            initialOnHand: 0
          },
          {
            id: '3-3',
            inventoryEvent: 'PO line item',
            priority: 'Low',
            inTransit: 0,
            remainingMaterialDemandWithTransit: 75, // 15 * 5 conversion
            productionStartExpectedReceiveDate: '2025-07-02',
            remainingMaterialDemandOnly: 75,
            poLineItem: '004-002',
            isSelectedPo: false,
            initialOnHand: 0
          }
        ]
      }
    ];

    // Select data based on UOM mode
    const baseData = uomMode === 'customer' ? customerUOMData : supplierUOMData;

    // Flatten the data for table display
    const flattenedData = [];
    baseData.forEach(material => {
      if (expandedMaterials.has(material.id)) {
        // Sort events chronologically by date, with priority as tiebreaker
        const sortedEvents = [...material.events].sort((a, b) => {
          const dateA = new Date(a.productionStartExpectedReceiveDate).getTime();
          const dateB = new Date(b.productionStartExpectedReceiveDate).getTime();
          
          if (dateA === dateB) {
            // Same date, use priority as tiebreaker (High priority comes first)
            return getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
          }
          
          return dateA - dateB;
        });

        // Calculate running balances
        let runningOnHandWithTransit = sortedEvents[0]?.initialOnHand || 0;
        let runningOnHandOnly = sortedEvents[0]?.initialOnHand || 0;

        sortedEvents.forEach((event, index) => {
          // Calculate on hand values (previous material balance becomes current on hand)
          const onHandWithTransit = index === 0 ? event.initialOnHand : runningOnHandWithTransit;
          const onHandOnly = index === 0 ? event.initialOnHand : runningOnHandOnly;
          
          // Calculate material balances
          const materialBalanceWithTransit = onHandWithTransit + event.inTransit - event.remainingMaterialDemandWithTransit;
          const materialBalanceOnlyOnHand = onHandOnly - event.remainingMaterialDemandOnly;
          
          // Update running balances for next iteration
          runningOnHandWithTransit = materialBalanceWithTransit;
          runningOnHandOnly = materialBalanceOnlyOnHand;

          flattenedData.push({
            id: event.id,
            materialId: material.id,
            isExpanded: true,
            isFirstEvent: index === 0,
            isSelectedPo: event.isSelectedPo,
            isLastExpanded: index === sortedEvents.length - 1,
            rowType: 'expanded',
            rowClassName: index === sortedEvents.length - 1 ? 'material-group-last' : 'material-group-item',
            materialCode: index === 0 ? material.materialCode : '',
            material: index === 0 ? material.material : '',
            materialAlternateCode: index === 0 ? material.materialAlternateCode : '',
            uom: index === 0 ? material.uom : '',
            materialRequirement: index === 0 ? material.materialRequirement : '',
            componentScrap: index === 0 ? material.componentScrap : '',
            inventoryEvent: event.inventoryEvent,
            priority: event.priority,
            onHandWithTransit: onHandWithTransit,
            inTransit: event.inTransit,
            remainingMaterialDemandWithTransit: event.remainingMaterialDemandWithTransit,
            materialBalanceWithTransit: materialBalanceWithTransit,
            productionStartExpectedReceiveDate: event.productionStartExpectedReceiveDate,
            onHandOnly: onHandOnly,
            remainingMaterialDemandOnly: event.remainingMaterialDemandOnly,
            materialBalanceOnlyOnHand: materialBalanceOnlyOnHand,
            poLineItem: event.poLineItem,
          });
        });
      } else {
        // Show collapsed state with selected PO line item details only
        const selectedEvent = material.events.find(event => event.isSelectedPo);
        if (selectedEvent) {
          // Calculate the values for the selected event in context of chronological order
          const sortedEvents = [...material.events].sort((a, b) => {
            const dateA = new Date(a.productionStartExpectedReceiveDate).getTime();
            const dateB = new Date(b.productionStartExpectedReceiveDate).getTime();
            
            if (dateA === dateB) {
              // Same date, use priority as tiebreaker (High priority comes first)
              return getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
            }
            
            return dateA - dateB;
          });
          
          const selectedEventIndex = sortedEvents.findIndex(event => event.isSelectedPo);
          let onHandWithTransit = sortedEvents[0]?.initialOnHand || 0;
          let onHandOnly = sortedEvents[0]?.initialOnHand || 0;
          
          // Calculate running balance up to selected event
          for (let i = 0; i <= selectedEventIndex; i++) {
            const event = sortedEvents[i];
            if (i === 0) {
              onHandWithTransit = event.initialOnHand;
              onHandOnly = event.initialOnHand;
                         } else {
               // Previous event's material balance becomes current on hand
               const prevEvent = sortedEvents[i - 1];
               const prevMaterialBalanceWithTransit = onHandWithTransit + prevEvent.inTransit - prevEvent.remainingMaterialDemandWithTransit;
               const prevMaterialBalanceOnlyOnHand = onHandOnly - prevEvent.remainingMaterialDemandOnly;
               onHandWithTransit = prevMaterialBalanceWithTransit;
               onHandOnly = prevMaterialBalanceOnlyOnHand;
             }
            
            if (i === selectedEventIndex) {
              // This is our selected event
              const materialBalanceWithTransit = onHandWithTransit + event.inTransit - event.remainingMaterialDemandWithTransit;
              const materialBalanceOnlyOnHand = onHandOnly - event.remainingMaterialDemandOnly;
              
              flattenedData.push({
                id: material.id,
                materialId: material.id,
                isExpanded: false,
                isFirstEvent: true,
                isSelectedPo: false, // Not applicable in collapsed state
                isLastExpanded: false,
                rowType: 'collapsed',
                rowClassName: 'material-collapsed',
                materialCode: material.materialCode,
                material: material.material,
                materialAlternateCode: material.materialAlternateCode,
                uom: material.uom,
                materialRequirement: material.materialRequirement,
                componentScrap: material.componentScrap,
                inventoryEvent: selectedEvent.inventoryEvent,
                priority: selectedEvent.priority,
                onHandWithTransit: onHandWithTransit,
                inTransit: selectedEvent.inTransit,
                remainingMaterialDemandWithTransit: selectedEvent.remainingMaterialDemandWithTransit,
                materialBalanceWithTransit: materialBalanceWithTransit,
                productionStartExpectedReceiveDate: selectedEvent.productionStartExpectedReceiveDate,
                onHandOnly: onHandOnly,
                remainingMaterialDemandOnly: selectedEvent.remainingMaterialDemandOnly,
                materialBalanceOnlyOnHand: materialBalanceOnlyOnHand,
                poLineItem: selectedEvent.poLineItem,
              });
            }
          }
        }
      }
    });

    return flattenedData;
  };



  const materialsColumns = React.useMemo(() => [
    {
      dataKey: 'bomComponent',
      label: 'BOM Component',
      cellRenderer: (cell: CellInfoType<unknown>) => (
      <PaddedCell style={{ cursor: 'pointer' }}>
        <HoverableText>{cell.cellData}</HoverableText>
      </PaddedCell>
      ),
    },
    { dataKey: 'uom', label: 'UOM' },
    { dataKey: 'bomRatio', label: 'BOM ratio' },
    { dataKey: 'componentScrap', label: 'Component scrap (%)' },
    { dataKey: 'remainingRequired', label: 'Remaining material required for order' },
    { dataKey: 'materialBalanceOnHand', label: 'Material balance (on hand)', cellRenderer: (cell: CellInfoType<unknown>) => {
      const value = cell.cellData;
      const isNegative = typeof value === 'number' && value < 0;
      return <span style={{ color: isNegative ? theme.colors.red : undefined }}>{value}</span>;
    } },
    {
      dataKey: 'materialBalanceByNextProdDate',
      label: 'Material balance (by next production date)',
      cellRenderer: (cell: CellInfoType<unknown>) => {
        const value = cell.cellData;
        const isNegative = typeof value === 'number' && value < 0;
        return <span style={{ color: isNegative ? theme.colors.red : undefined }}>{value}</span>;
      },
    },
    {
      dataKey: 'materialBalanceByProdDueDate',
      label: 'Material balance (by production due date)',
      cellRenderer: (cell: CellInfoType<unknown>) => {
        const value = cell.cellData;
        const isNegative = typeof value === 'number' && value < 0;
        return <span style={{ color: isNegative ? theme.colors.red : undefined }}>{value}</span>;
      },
    },
    { dataKey: 'availableOnHand', label: 'Available material on hand for order' },
    {
      dataKey: 'inboundQuantity',
      label: 'Inbound quantity (by next production date)',
      cellRenderer: (cell: CellInfoType<unknown>) => (
        <QuantityCell 
          color="green" 
          onClick={() => handleInboundClick(cell.row.bomComponent, cell.cellData)}
          type="button"
        >
          +{cell.cellData}
        </QuantityCell>
      )
    },
    { dataKey: 'availableAfterInbound', label: 'Available after inbound' },
    {
      dataKey: 'inboundQuantityByDueDate',
      label: 'Inbound quantity (by production due date)',
      cellRenderer: (cell: CellInfoType<unknown>) => cell.row.inboundQuantityByDueDate ?? '-',
    },
    { 
      dataKey: 'allocatedQuantity', 
      label: 'Allocated quantity',
      cellRenderer: (cell: CellInfoType<unknown>) => (
        <QuantityCell 
          color="red" 
          onClick={() => handleAllocatedClick(cell.row.bomComponent, cell.cellData)}
          type="button"
        >
          {cell.cellData}
        </QuantityCell>
      )
    },
    { dataKey: 'availableIfStealing', label: 'Available if stealing from allocated' },
  ], [handleInboundClick, handleAllocatedClick]);

  const materialsData = [
    {
      id: '1',
      bomComponent: 'Component A',
      bomRatio: '1:1',
      uom: 'PCS',
      componentScrap: 0,
      remainingRequired: 50,
      materialBalanceOnHand: -10,
      materialBalanceByNextProdDate: 5,
      materialBalanceByProdDueDate: -8,
      availableOnHand: 75,
      inboundQuantity: 25,
      availableAfterInbound: 100,
      inboundQuantityByDueDate: 10,
      allocatedQuantity: 30,
      availableIfStealing: 130,
      productionProgress: { completed: 75, total: 100, percentage: 75 },
      productionStartDate: '2025-06-20',
      productionDueDate: '2025-06-30',
    },
    {
      id: '2',
      bomComponent: 'Component B',
      bomRatio: '2:1',
      uom: 'PCS',
      componentScrap: 0,
      remainingRequired: 100,
      materialBalanceOnHand: 20,
      materialBalanceByNextProdDate: -15,
      materialBalanceByProdDueDate: 12,
      availableOnHand: 50,
      inboundQuantity: 50,
      availableAfterInbound: 100,
      inboundQuantityByDueDate: 20,
      allocatedQuantity: 20,
      availableIfStealing: 120,
      productionProgress: { completed: 40, total: 100, percentage: 40 },
      productionStartDate: '2025-06-20',
      productionDueDate: '2025-06-25',
    },
    {
      id: '3',
      bomComponent: 'Component C',
      bomRatio: '1:2',
      uom: 'PCS',
      componentScrap: 0,
      remainingRequired: 75,
      materialBalanceOnHand: 0,
      materialBalanceByNextProdDate: -25,
      materialBalanceByProdDueDate: -5,
      availableOnHand: 60,
      inboundQuantity: 40,
      availableAfterInbound: 100,
      inboundQuantityByDueDate: 30,
      allocatedQuantity: 25,
      availableIfStealing: 125,
      productionProgress: { completed: 60, total: 150, percentage: 40 },
      productionStartDate: '2025-06-28',
      productionDueDate: '2025-07-08',
    }
  ];

  const renderInboundQuantitySidebar = () => {
    return (
      <Box p="half">
        <Heading3>Subcomponent details</Heading3>
        <DescriptionList layout="inline" showDivider={true}>
          <DescriptionGroup>
            <DescriptionTerm>BOM component</DescriptionTerm>
            <DescriptionDetails>{selectedInbound?.component}</DescriptionDetails>
          </DescriptionGroup>
          <DescriptionGroup>
            <DescriptionTerm>Subcomponent UOM</DescriptionTerm>
            <DescriptionDetails>EA</DescriptionDetails>
          </DescriptionGroup>
        </DescriptionList>
        <Box borderBottom="1px solid" borderColor="lightGrey" my="x4" />
        <TableContainer>
          <Heading3>Open STOs</Heading3>
          <ScrollableTable>
            <StyledTable
              columns={inboundTableColumns}
              rows={selectedInbound ? getInboundTableData(selectedInbound.quantity) : []}
              keyField="id"
            />
          </ScrollableTable>
        </TableContainer>
      </Box>
    );
  };

  const renderAllocatedQuantitySidebar = () => {
    return (
      <Box p="half">
        <Heading3>Subcomponent details</Heading3>
        <DescriptionList layout="inline" showDivider={true}>
          <DescriptionGroup>
            <DescriptionTerm>BOM component</DescriptionTerm>
            <DescriptionDetails>{selectedAllocated?.component}</DescriptionDetails>
          </DescriptionGroup>
          <DescriptionGroup>
            <DescriptionTerm>Subcomponent UOM</DescriptionTerm>
            <DescriptionDetails>EA</DescriptionDetails>
          </DescriptionGroup>
        </DescriptionList>
        <Box borderBottom="1px solid" borderColor="lightGrey" my="x4" />
        <TableContainer>
          <Heading3>PO line items</Heading3>
          <ScrollableTable>
            <StyledTable
              columns={allocatedTableColumns}
              rows={selectedAllocated ? getAllocatedTableData(selectedAllocated.quantity) : []}
              keyField="id"
            />
          </ScrollableTable>
        </TableContainer>
      </Box>
    );
  };

  React.useEffect(() => {
    let filtered = sampleData;
    if (activeFilter === 'late') {
      filtered = filtered.filter(row => row.problemsAndRisks === 'Late');
    } else if (activeFilter === 'material-shortage') {
      filtered = filtered.filter(row => row.problemsAndRisks === 'Material shortage');
    } else if (activeFilter === 'temp-shortage') {
      filtered = filtered.filter(row => row.problemsAndRisks === 'Temporary material shortage');
    } else if (activeFilter === 'requires-response') {
      filtered = filtered.filter(row => row.collaborationStatus === 'Requires your response');
    } else if (activeFilter === 'awaiting-supplier') {
      filtered = filtered.filter(row => row.collaborationStatus === 'Awaiting supplier response');
    }
    setFilteredData(filtered);
  }, [activeFilter]);

  // Calculate the number of applied filters
  const appliedFiltersCount = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== null && value !== '' && value !== false
  ).length;

  const handleTabClick = (e: React.MouseEvent, index: number) => {
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const renderTabContent = (): JSX.Element => {
    if (selectedIndex === 0) {
      return (
        <Box mt="x4">
          <TableHeader>
            {selectedRows.length === 0 && (
              <>
                <Box display="flex" flex="1" alignItems="center" style={{ gap: 8 }} ref={filterChipsRef}>
                  <FilterChip
                    label="Late"
                    count={sampleData.filter(row => row.problemsAndRisks === 'Late').length}
                    active={activeFilter === 'late'}
                    onClick={() => setActiveFilter(activeFilter === 'late' ? null : 'late')}
                    innerType="danger"
                  />
                  <FilterChip
                    label="Material shortage"
                    count={sampleData.filter(row => row.problemsAndRisks === 'Material shortage').length}
                    active={activeFilter === 'material-shortage'}
                    onClick={() => setActiveFilter(activeFilter === 'material-shortage' ? null : 'material-shortage')}
                    innerType="danger"
                  />
                  <FilterChip
                    label="Temporary material shortage"
                    count={sampleData.filter(row => row.problemsAndRisks === 'Temporary material shortage').length}
                    active={activeFilter === 'temp-shortage'}
                    onClick={() => setActiveFilter(activeFilter === 'temp-shortage' ? null : 'temp-shortage')}
                    innerType="warning"
                  />
                  <FilterChip
                    label="Requires your response"
                    count={sampleData.filter(row => row.collaborationStatus === 'Requires your response').length}
                    active={activeFilter === 'requires-response'}
                    onClick={() => setActiveFilter(activeFilter === 'requires-response' ? null : 'requires-response')}
                    innerType="warning"
                  />
                  <FilterChip
                    label="Awaiting supplier response"
                    count={sampleData.filter(row => row.collaborationStatus === 'Awaiting supplier response').length}
                    active={activeFilter === 'awaiting-supplier'}
                    onClick={() => setActiveFilter(activeFilter === 'awaiting-supplier' ? null : 'awaiting-supplier')}
                    innerType="neutral"
                  />
                </Box>
                <Box display="flex" alignItems="center" ref={rightButtonsRef}>
                  {collapseActions ? (
                    <>
                      <DropdownMenu
                        trigger={() => (
                          <IconicButton icon="more">More actions</IconicButton>
                        )}
                      >
                        <DropdownButton onClick={() => {}}>Import</DropdownButton>
                        <DropdownButton onClick={() => {}}>Export</DropdownButton>
                        <DropdownButton onClick={() => {}}>Collaboration status</DropdownButton>
                      </DropdownMenu>
                      <VerticalDivider />
                    </>
                  ) : (
                    <>
                      <IconicButton icon="publish">Import</IconicButton>
                      <IconicButton icon="getApp">Export</IconicButton>
                      <VerticalDivider />
                      <IconicButton icon="sort">Collaboration status</IconicButton>
                      <VerticalDivider />
                    </>
                  )}
                  <IconicButton 
                    icon="filter" 
                    ref={filterButtonRef}
                    onClick={handleFilterClick}
                  >
                    {`Filters (${appliedFiltersCount})`}
                  </IconicButton>
                </Box>
              </>
            )}
          </TableHeader>
          {selectedRows.length > 0 && (
            <ActionRow>
              <Box color="midGrey">
                {selectedRows.length} {selectedRows.length === 1 ? 'item' : 'items'} selected
              </Box>
              <Box display="flex" alignItems="center">
                <DropdownMenu
                  trigger={() => (
                    <IconicButton icon="more">Tags</IconicButton>
                  )}
                >
                  <DropdownMenu
                    trigger={() => (
                      <DropdownButton>
                        <Flex justifyContent="space-between" alignItems="center" width="100%">
                          <Text>Add</Text>
                          <Icon icon="rightArrow" title="right arrow" />
                        </Flex>
                      </DropdownButton>
                    )}
                    placement="right-start"
                    showArrow={false}
                    openOnHover
                  >
                    <DropdownButton onClick={() => {}} whiteSpace="nowrap">Express shipment tag</DropdownButton>
                    <DropdownButton onClick={() => {}} whiteSpace="nowrap">Validated for assembly tag</DropdownButton>
                  </DropdownMenu>
                  <DropdownMenu
                    trigger={() => (
                      <DropdownButton>
                        <Flex justifyContent="space-between" alignItems="center" width="100%">
                          <Text>Remove</Text>
                          <Icon icon="rightArrow" title="right arrow" />
                        </Flex>
                      </DropdownButton>
                    )}
                    placement="right-start"
                    showArrow={false}
                    openOnHover
                  >
                    <DropdownButton onClick={() => {}} whiteSpace="nowrap">Express shipment tag</DropdownButton>
                    <DropdownButton onClick={() => {}} whiteSpace="nowrap">Validated for assembly tag</DropdownButton>
                  </DropdownMenu>
                </DropdownMenu>
                <VerticalDivider />
                <Box ml="x3">
                  <Button onClick={() => setSelectedRows([])} style={{ marginRight: '8px' }}>Cancel</Button>
                  <Button onClick={() => {}} style={{ marginRight: '8px' }}>Edit</Button>
                  <Button onClick={() => {}}>Accept</Button>
                </Box>
              </Box>
            </ActionRow>
          )}
          <TableContainer>
            <ScrollableTable>
              <StyledTable
                columns={columns}
                rows={filteredData}
                hasSelectableRows
                keyField="id"
                selectedRows={selectedRows}
                onRowSelectionChange={setSelectedRows}
              />
            </ScrollableTable>
          </TableContainer>
          <Sidebar
            isOpen={isFilterOpen}
            onClose={handleFilterClose}
            title="Filters"
            triggerRef={filterButtonRef}
            width="m"
            footer={renderFilterFooter()}
          >
            {renderFilters()}
          </Sidebar>
        </Box>
      );
    }
    
    return (
      <Box mt="x4">
        <Heading3>Viewing materials for</Heading3>
        <SelectContainer>
          <SelectWrapper width="200px">
            <SelectLabel>PO</SelectLabel>
            <Select
              options={poOptions}
              value={selectedPO}
              onChange={handlePOChange}
            />
          </SelectWrapper>
          <SelectWrapper width="500px">
            <SelectLabel>Line item number</SelectLabel>
            <Select
              options={lineItemOptions}
              value={selectedLineItem}
              onChange={handleLineItemChange}
            />
          </SelectWrapper>
          <Box display="flex" mr="x2">
            <PrimaryButton onClick={handleApply}>
              Apply
            </PrimaryButton>
            <Box ml="x2">
              <QuietButton onClick={handleReset}>
                Reset
              </QuietButton>
            </Box>
          </Box>
        </SelectContainer>
        {showMaterialsTable && currentPOData && (
          <>
            <Box display="flex">
              <DescriptionList layout="stacked" columns={5} density="relaxed" showDivider={false}>
                <DescriptionGroup>
                  <DescriptionTerm>Requested quantity</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.productionProgress.total}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Remaining quantity</DescriptionTerm>
                  <DescriptionDetails>
                    {currentPOData.productionProgress.total - currentPOData.productionProgress.completed}
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Production progress</DescriptionTerm>
                  <DescriptionDetails>
                    {`${currentPOData.productionProgress.completed}/${currentPOData.productionProgress.total} • ${currentPOData.productionProgress.percentage}%`}
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Order UOM</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.uom}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Production start date</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.productionStartDate}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Production due date</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.productionDueDate}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Priority</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.priority}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>FG quantity produceable (now)</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.canRunNow}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>FG quantity produceable (by production start date)</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.canRunByStartDate}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Materials availability date</DescriptionTerm>
                  <DescriptionDetails>{currentPOData.materialAvailabilityDate}</DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
            </Box>
            <Box borderBottom="1px solid" borderColor="lightGrey" my="x4" />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="x3">
              <Heading3>Bill of materials</Heading3>
              <Switcher
                selected={uomMode}
                onChange={(value) => setUomMode(value as 'customer' | 'supplier')}
              >
                <Switch value="customer">Customer UOM</Switch>
                <Switch value="supplier">Supplier UOM</Switch>
              </Switcher>
            </Box>
            <Box mb="x3">
              <DescriptionList layout="inline">
                <DescriptionGroup>
                  <DescriptionTerm>Revision name and release date:</DescriptionTerm>
                  <DescriptionDetails>Revision 1 • 2025-01-01</DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>
            </Box>
            <TableContainer>
              <ScrollableTable>
                <StyledTable
                  rowBorder={true}
                  columns={[
                    { 
                      dataKey: 'material', 
                      label: 'Customer material code',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        const materialCode = row.materialCode;
                        const materialDescription = cellData;
                        
                        return (
                          <TwoRowCell>
                                                         {materialCode && (
                               <MaterialCodeLink 
                                 href="#" 
                                 onClick={(e) => { e.preventDefault(); /* Handle material code click */ }}
                               >
                                 {materialCode}
                               </MaterialCodeLink>
                             )}
                            {materialDescription && (
                              <MaterialDescription style={{ fontWeight: isSelected ? "bold" : "normal" }}>
                                {materialDescription}
                              </MaterialDescription>
                            )}
                          </TwoRowCell>
                        );
                      }
                    },
                    { 
                      dataKey: 'materialAlternateCode', 
                      label: 'Supplier material code',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'uom', 
                      label: 'UOM',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'materialRequirement', 
                      label: 'Material requirement (for 1 FG)',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'componentScrap', 
                      label: 'Component scrap (%)',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'expandToggle', 
                      label: '', 
                      cellRenderer: ({ row }) => (
                        <Box style={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
                          {row.isFirstEvent && (
                            <Button
                              onClick={() => toggleMaterialExpansion(row.materialId)}
                              style={{ padding: '2px 6px', fontSize: '12px', width: '24px', height: '24px', lineHeight: '1' }}
                            >
                              {expandedMaterials.has(row.materialId) ? "−" : "+"}
                            </Button>
                          )}
                        </Box>
                      )
                    },
                    { 
                      dataKey: 'inventoryEvent', 
                      label: 'Inventory event', 
                      metadata: { divider: true },
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return (
                          <Box fontWeight={isSelected ? "bold" : "normal"}>
                            {cellData}
                            {row.poLineItem && (
                              <Box fontSize="small" fontWeight={isSelected ? "bold" : "normal"}>
                                <HoverableText style={{ color: '#0066CC', cursor: 'pointer' }} onClick={() => {}}>
                                  {row.poLineItem}
                                </HoverableText>
                              </Box>
                            )}
                          </Box>
                        );
                      }
                    },
                    { 
                      dataKey: 'priority', 
                      label: 'Priority',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'onHandOnly', 
                      label: 'On hand (without in-transit)', 
                      metadata: { divider: true },
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'remainingMaterialDemandOnly', 
                      label: 'Remaining material demand',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        const displayValue = row.inventoryEvent === 'STO' && cellData === 0 ? '-' : cellData;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{displayValue}</Box>;
                      }
                    },
                    { 
                      dataKey: 'materialBalanceOnlyOnHand', 
                      label: 'Material balance (without in-transit)',
                      cellRenderer: ({ cellData, row }) => {
                        const isNegative = typeof cellData === 'number' && cellData < 0;
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return (
                          <Box 
                            fontWeight={isSelected ? "bold" : "normal"}
                            color={isNegative ? "red" : undefined}
                          >
                            {cellData}
                          </Box>
                        );
                      }
                    },
                    
                    { 
                      dataKey: 'productionStartExpectedReceiveDate', 
                      label: 'Production start date / Expected receive date',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    
                    { 
                      dataKey: 'onHandWithTransit', 
                      label: 'On hand (with in-transit)', 
                      metadata: { divider: true },
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{cellData}</Box>;
                      }
                    },
                    { 
                      dataKey: 'inTransit', 
                      label: 'In-transit',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        const displayValue = row.inventoryEvent === 'PO line item' && cellData === 0 ? '-' : cellData;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{displayValue}</Box>;
                      }
                    },
                    { 
                      dataKey: 'remainingMaterialDemandWithTransit', 
                      label: 'Remaining material demand',
                      cellRenderer: ({ cellData, row }) => {
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        const displayValue = row.inventoryEvent === 'STO' && cellData === 0 ? '-' : cellData;
                        return <Box fontWeight={isSelected ? "bold" : "normal"}>{displayValue}</Box>;
                      }
                    },
                    { 
                      dataKey: 'materialBalanceWithTransit', 
                      label: 'Material balance (with in-transit)',
                      cellRenderer: ({ cellData, row }) => {
                        const isNegative = typeof cellData === 'number' && cellData < 0;
                        const isSelected = row.isExpanded && row.isSelectedPo;
                        return (
                          <Box 
                            fontWeight={isSelected ? "bold" : "normal"}
                            color={isNegative ? "red" : undefined}
                          >
                            {cellData}
                          </Box>
                        );
                      }
                    },
                  ]}
                  rows={generateExpandedTableData()}
                  keyField="id"
                />
              </ScrollableTable>
            </TableContainer>
          </>
        )}
      </Box>
    );
  };

  if (hideNavigation) {
    return renderTabContent();
  }

  return (
    <Box>
      <FullWidthBox>
        <BrandedNavBar menuData={menuData} />
      </FullWidthBox>
      <FullWidthBox>
        <Header
          renderBreadcrumbs={() => (
            <Breadcrumbs>
              <Link href="#">Home</Link>
            </Breadcrumbs>
          )}
          title="PO line items"
        />
      </FullWidthBox>
      <Box p="x4">
        <Tabs selectedIndex={selectedIndex} onTabClick={handleTabClick}>
          <Tab label="Orders">
            {renderTabContent()}
          </Tab>
          <Tab label="Materials availability">
            {renderTabContent()}
          </Tab>
        </Tabs>
      </Box>
    </Box>
  );
}; 