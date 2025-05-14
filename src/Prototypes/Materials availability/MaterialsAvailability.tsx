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
import { Heading3, Heading4 } from '../../Type';
import styled, { useTheme } from 'styled-components';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { DescriptionList, DescriptionGroup, DescriptionTerm, DescriptionDetails } from '../../DescriptionList/index';
import { DropdownMenu, DropdownButton } from '../../DropdownMenu';

interface MaterialsAvailabilityProps {
  selectedIndex?: number;
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
  }
  th:first-child, td:first-child {
    min-width: auto;
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
    case 'full shortage':
      return 'danger';
    case 'no shortage':
      return 'quiet';
    default:
      return 'quiet';
  }
};

const columns = [
  { dataKey: 'poNumber', label: 'PO number' },
  { dataKey: 'customer', label: 'Customer' },
  { dataKey: 'itemCode', label: 'Item code and description' },
  { dataKey: 'supplierPOLineItem', label: 'Supplier PO line item number' },
  { 
    dataKey: 'priority', 
    label: 'Priority',
    metadata: { divider: true }
  },
  { dataKey: 'problemsAndRisks', label: 'Problems and risks',
    cellRenderer: ({ cellData }) => cellData && cellData !== 'None'
      ? <StatusIndicator type="danger" style={{ whiteSpace: 'nowrap' }}>Late</StatusIndicator>
      : '-' },
  { 
    dataKey: 'materialAvailabilityStatus', 
    label: 'Material availability status',
    cellRenderer: ({ cellData }) => (
      <span style={{ cursor: 'pointer' }} onClick={() => window.open('about:blank', '_blank')}>
        <StatusIndicator type={getStatusType(cellData)} style={{ whiteSpace: 'nowrap' }}>
          {cellData}
        </StatusIndicator>
      </span>
    )
  },
  { dataKey: 'readyToBuild', label: 'Ready to build' },
  { 
    dataKey: 'canRunNow', 
    label: 'Can run (now)',
    cellRenderer: ({ cellData }) => `${cellData} ${cellData > 0 ? 'PCS' : ''}`
  },
  { 
    dataKey: 'canRunByStartDate', 
    label: 'Can run (by production start date)',
    cellRenderer: ({ cellData }) => `${cellData} ${cellData > 0 ? 'PCS' : ''}`
  },
  { dataKey: 'materialAvailabilityDate', label: 'Material availability date' },
  { dataKey: 'productionProgress', label: 'Production progress' },
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
        return cellData;
      }
    }
  },
  { dataKey: 'quantity', label: 'Quantity' },
  { dataKey: 'uom', label: 'UOM' },
  { dataKey: 'productionDueDate', label: 'Production due date' },
  { dataKey: 'unitPrice', label: 'Unit price' },
  { dataKey: 'currency', label: 'Currency' },
  { dataKey: 'reason', label: 'Reason' },
  { dataKey: 'note', label: 'Note' },
  { 
    dataKey: 'nextProductionDate', 
    label: 'Next production date',
    metadata: { divider: true }
  },
  { dataKey: 'closeProductionNote', label: 'Close production note' },
  { dataKey: 'carryOverSentTo', label: 'Carry over sent to' },
  { dataKey: 'shipTo', label: 'Ship to' },
  { dataKey: 'needByDate', label: 'Need by date' },
];

const sampleData = [
  {
    id: '1',
    poNumber: 'PO-001',
    customer: 'Sample Customer',
    itemCode: 'ITEM-001 - Sample Item',
    supplierPOLineItem: 'SPO-001',
    priority: 'High',
    problemsAndRisks: 'None',
    materialAvailabilityStatus: 'No shortage',
    materialAvailabilityDate: '2024-04-01',
    canRunNow: 50,
    canRunByStartDate: 100,
    productionProgress: 'In Progress',
    readyToBuild: 'Yes',
    collaborationStatus: 'Requires your response',
    quantity: 100,
    uom: 'PCS',
    requestType: 'Standard',
    productionDueDate: '2024-04-01',
    unitPrice: 10.99,
    currency: 'USD',
    reason: 'Regular order',
    note: 'Sample note',
    nextProductionDate: '2024-04-15',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse A',
    shipTo: 'Customer Location',
    needByDate: '2024-04-30',
  },
  {
    id: '2',
    poNumber: 'PO-002',
    customer: 'Sample Customer 2',
    itemCode: 'ITEM-002 - Sample Item 2',
    supplierPOLineItem: 'SPO-002',
    priority: 'Medium',
    problemsAndRisks: 'Material shortage',
    materialAvailabilityStatus: 'Temporary shortage',
    materialAvailabilityDate: '2024-04-05',
    canRunNow: 0,
    canRunByStartDate: 75,
    productionProgress: 'Not Started',
    readyToBuild: 'No',
    collaborationStatus: 'Awaiting supplier response',
    quantity: 150,
    uom: 'PCS',
    requestType: 'Standard',
    productionDueDate: '2024-04-10',
    unitPrice: 15.99,
    currency: 'USD',
    reason: 'Regular order',
    note: 'Sample note 2',
    nextProductionDate: '2024-04-20',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse B',
    shipTo: 'Customer Location 2',
    needByDate: '2024-04-25',
  },
  {
    id: '3',
    poNumber: 'PO-003',
    customer: 'Sample Customer 3',
    itemCode: 'ITEM-003 - Sample Item 3',
    supplierPOLineItem: 'SPO-003',
    priority: 'Low',
    problemsAndRisks: 'None',
    materialAvailabilityStatus: 'Full shortage',
    materialAvailabilityDate: '2024-04-12',
    canRunNow: 20,
    canRunByStartDate: 40,
    productionProgress: 'Completed',
    readyToBuild: 'Yes',
    collaborationStatus: 'Accepted',
    quantity: 60,
    uom: 'PCS',
    requestType: 'Express',
    productionDueDate: '2024-04-15',
    unitPrice: 12.99,
    currency: 'USD',
    reason: 'Urgent order',
    note: 'Sample note 3',
    nextProductionDate: '2024-04-18',
    closeProductionNote: 'None',
    carryOverSentTo: 'Warehouse C',
    shipTo: 'Customer Location 3',
    needByDate: '2024-04-28',
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
    label: 'Stock transfer order number',
    cellRenderer: ({ cellData }) => (
      <PaddedCell style={{ cursor: 'pointer', textDecoration: 'underline' }}>{cellData}</PaddedCell>
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
      const { completed, total, percentage } = cellData;
      return `${completed}/${total} • ${percentage}%`;
    }
  },
  { dataKey: 'materialRequired', label: 'Material required for remaining production' },
];

const getInboundTableData = (totalQuantity: number) => [
  {
    id: '1',
    stockTransferOrder: 'STO-001',
    expectedShipDate: '2024-04-10',
    actualShipDate: '2024-04-11',
    expectedReceiveDate: '2024-04-15',
    expectedQuantity: Math.floor(totalQuantity * 0.6),
    shippedQuantity: Math.floor(totalQuantity * 0.6),
    deliveryNumber: 'DEL-001',
  },
  {
    id: '2',
    stockTransferOrder: 'STO-002',
    expectedShipDate: '2024-04-15',
    actualShipDate: null,
    expectedReceiveDate: '2024-04-20',
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
    productionDueDate: '2024-04-15',
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
    productionDueDate: '2024-04-20',
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

export const MaterialsAvailability: React.FC<MaterialsAvailabilityProps> = ({ selectedIndex = 0 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filteredData, setFilteredData] = useState(sampleData);
  const [selectedPO, setSelectedPO] = useState<string | null>('');
  const [selectedLineItem, setSelectedLineItem] = useState<string | null>('');
  const [showMaterialsTable, setShowMaterialsTable] = useState(false);
  const [isInboundSidebarOpen, setIsInboundSidebarOpen] = useState(false);
  const [isAllocatedSidebarOpen, setIsAllocatedSidebarOpen] = useState(false);
  const [selectedInbound, setSelectedInbound] = useState<{ component: string; quantity: number } | null>(null);
  const [selectedAllocated, setSelectedAllocated] = useState<{ component: string; quantity: number } | null>(null);
  const filterButtonRef = React.useRef<HTMLButtonElement>(null);
  const inboundButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isLateFilterActive, setIsLateFilterActive] = useState(false);
  const [isRequiresResponseFilterActive, setIsRequiresResponseFilterActive] = useState(false);
  const [isAwaitingSupplierFilterActive, setIsAwaitingSupplierFilterActive] = useState(false);
  const [isTempShortageFilterActive, setIsTempShortageFilterActive] = useState(false);
  const [isFullShortageFilterActive, setIsFullShortageFilterActive] = useState(false);
  const theme = useTheme();
  const filterChipsRef = useRef<HTMLDivElement>(null);
  const rightButtonsRef = useRef<HTMLDivElement>(null);
  const [collapseActions, setCollapseActions] = useState(false);

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
    const filtered = sampleData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        const cellValue = row[key];
        if (typeof value === 'string') {
          return cellValue?.toString().toLowerCase().includes(value.toLowerCase());
        }
        return cellValue === value;
      });
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
          <FilterLabel>Supplier PO line item number</FilterLabel>
          <Input 
            placeholder="Filter by supplier PO line item" 
            value={filters.supplierPOLineItem || ''}
            onChange={e => handleFilterChange('supplierPOLineItem', e.target.value)}
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
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
              { value: 'inactive', label: 'Inactive' },
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
              { value: 'Full shortage', label: 'Full shortage' },
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
        <FilterSection>
          <FilterLabel>Ready to build</FilterLabel>
          <Checkbox
            labelText="Only line items marked as ready to build"
            checked={filters.readyToBuild || false}
            onChange={e => handleFilterChange('readyToBuild', e.target.checked)}
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
        <FilterSection>
          <FilterLabel>Express shipment</FilterLabel>
          <Checkbox
            labelText="Only line items marked as express shipments"
            checked={filters.expressShipment || false}
            onChange={e => handleFilterChange('expressShipment', e.target.checked)}
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
      setShowMaterialsTable(true);
    }
  };

  const handleReset = () => {
    setSelectedPO('');
    setSelectedLineItem('');
    setShowMaterialsTable(false);
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

  const materialsColumns = React.useMemo(() => [
    {
      dataKey: 'bomComponent',
      label: 'BOM Component',
      cellRenderer: (cell: CellInfoType<unknown>) => (
        <PaddedCell as={HoverableCell} onClick={() => window.open('about:blank', '_blank')}>
          {cell.cellData}
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
      componentScrap: 2.5,
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
      productionStartDate: '2024-04-10',
      productionDueDate: '2024-04-15',
    },
    {
      id: '2',
      bomComponent: 'Component B',
      bomRatio: '2:1',
      uom: 'PCS',
      componentScrap: 1.8,
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
      productionStartDate: '2024-04-12',
      productionDueDate: '2024-04-20',
    },
    {
      id: '3',
      bomComponent: 'Component C',
      bomRatio: '1:2',
      uom: 'PCS',
      componentScrap: 3.2,
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
      productionStartDate: '2024-04-15',
      productionDueDate: '2024-04-25',
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
          <Heading3>Open stock transfer orders</Heading3>
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
    if (isLateFilterActive) {
      filtered = filtered.filter(row => row.problemsAndRisks && row.problemsAndRisks !== 'None');
    }
    if (isRequiresResponseFilterActive) {
      filtered = filtered.filter(row => row.collaborationStatus === 'Requires your response');
    }
    if (isAwaitingSupplierFilterActive) {
      filtered = filtered.filter(row => row.collaborationStatus === 'Awaiting supplier response');
    }
    if (isTempShortageFilterActive) {
      filtered = filtered.filter(row => row.materialAvailabilityStatus === 'Temporary shortage');
    }
    if (isFullShortageFilterActive) {
      filtered = filtered.filter(row => row.materialAvailabilityStatus === 'Full shortage');
    }
    setFilteredData(filtered);
  }, [isLateFilterActive, isRequiresResponseFilterActive, isAwaitingSupplierFilterActive, isTempShortageFilterActive, isFullShortageFilterActive]);

  // Calculate the number of applied filters
  const appliedFiltersCount = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== null && value !== '' && value !== false
  ).length;

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
        <Tabs selectedIndex={selectedIndex}>
          <Tab label="Orders">
            <Box mt="x4">
              <TableHeader>
                <Box display="flex" flex="1" alignItems="center" style={{ gap: 8 }} ref={filterChipsRef}>
                  <FilterChip
                    label="Late"
                    count={sampleData.filter(row => row.problemsAndRisks && row.problemsAndRisks !== 'None').length}
                    active={isLateFilterActive}
                    onClick={() => setIsLateFilterActive(active => !active)}
                    innerType="danger"
                  />
                  <FilterChip
                    label="Full shortage"
                    count={sampleData.filter(row => row.materialAvailabilityStatus === 'Full shortage').length}
                    active={isFullShortageFilterActive}
                    onClick={() => setIsFullShortageFilterActive(active => !active)}
                    innerType="danger"
                  />
                  <FilterChip
                    label="Temporary shortage"
                    count={sampleData.filter(row => row.materialAvailabilityStatus === 'Temporary shortage').length}
                    active={isTempShortageFilterActive}
                    onClick={() => setIsTempShortageFilterActive(active => !active)}
                    innerType="warning"
                  />
                  <FilterChip
                    label="Requires your response"
                    count={sampleData.filter(row => row.collaborationStatus === 'Requires your response').length}
                    active={isRequiresResponseFilterActive}
                    onClick={() => setIsRequiresResponseFilterActive(active => !active)}
                    innerType="warning"
                  />
                  <FilterChip
                    label="Awaiting supplier response"
                    count={sampleData.filter(row => row.collaborationStatus === 'Awaiting supplier response').length}
                    active={isAwaitingSupplierFilterActive}
                    onClick={() => setIsAwaitingSupplierFilterActive(active => !active)}
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
              </TableHeader>
              <TableContainer>
                <ScrollableTable>
                  <StyledTable
                    columns={columns}
                    rows={filteredData}
                    hasSelectableRows
                    keyField="id"
                  />
                </ScrollableTable>
              </TableContainer>
            </Box>
          </Tab>
          <Tab label="Materials availability">
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
              {showMaterialsTable && (
                <>
                  <Box display="flex">
                    <DescriptionList layout="stacked" columns={5} showDivider={false}>
                      <DescriptionGroup>
                        <DescriptionTerm>Requested quantity</DescriptionTerm>
                        <DescriptionDetails>{materialsData[0]?.productionProgress?.total ?? '-'}</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>UOM</DescriptionTerm>
                        <DescriptionDetails>{materialsData[0]?.uom ?? '-'}</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>Production progress</DescriptionTerm>
                        <DescriptionDetails>
                          {materialsData[0]?.productionProgress
                            ? `${materialsData[0].productionProgress.completed}/${materialsData[0].productionProgress.total} • ${materialsData[0].productionProgress.percentage}%`
                            : '-'}
                        </DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>Production start date</DescriptionTerm>
                        <DescriptionDetails>{materialsData[0]?.productionStartDate ?? '-'}</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>Production due date</DescriptionTerm>
                        <DescriptionDetails>{materialsData[0]?.productionDueDate ?? '-'}</DescriptionDetails>
                      </DescriptionGroup>
                    </DescriptionList>
                  </Box>
                  <Box borderBottom="1px solid" borderColor="lightGrey" my="x4" />
                  <TableContainer>
                    <ScrollableTable>
                      <StyledTable
                        columns={materialsColumns}
                        rows={materialsData}
                        keyField="id"
                      />
                    </ScrollableTable>
                  </TableContainer>
                </>
              )}
            </Box>
          </Tab>
        </Tabs>
      </Box>
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
      <Sidebar
        isOpen={isInboundSidebarOpen}
        onClose={handleInboundClose}
        title="Inbound quantity"
        width="xl"
      >
        {renderInboundQuantitySidebar()}
      </Sidebar>
      <Sidebar
        isOpen={isAllocatedSidebarOpen}
        onClose={handleAllocatedClose}
        title="Allocated quantity"
        width="xl"
      >
        {renderAllocatedQuantitySidebar()}
      </Sidebar>
    </Box>
  );
}; 