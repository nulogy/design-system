import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Table, Box, Text, Flex, TruncatedText, IconicButton, Tooltip } from '../../../index';
import { Columns } from '../../../Table/Table.types';

const generateRows = (count: number) => {
  const rows = [];
  const itemTypes = ['Raw Material', 'Component', 'Finished Good', 'Packaging', 'MRO', 'Subassembly', 'Tooling', 'Consumable'];
  const statuses = ['Active', 'Pending Approval', 'On Hold', 'Discontinued', 'In Review', 'Approved', 'Rejected', 'Draft'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'South America', 'Middle East', 'Africa', 'Central America', 'Caribbean'];
  const suppliers = [
    'Global Materials Corp',
    'Premium Components Ltd',
    'Quality Supplies Inc',
    'Elite Manufacturing',
    'Advanced Materials Group',
    'Precision Components',
    'Industrial Solutions',
    'Material Technologies',
    'Global Sourcing Partners',
    'Innovative Materials Co',
    'Strategic Components',
    'Reliable Supplies Ltd',
    'Elite Manufacturing Solutions',
    'Advanced Industrial Group',
    'Precision Engineering Corp'
  ];

  const descriptions = [
    'High-grade aluminum alloy sheets, 6061-T6, 0.125" thickness, 48"x96" dimensions, suitable for aerospace applications',
    'Precision-machined steel bearings, sealed, ABEC-7 rating, 10mm ID, 30mm OD, 9mm width, chrome steel construction',
    'Industrial-grade polypropylene pellets, injection molding grade, natural color, MFI 12, UV stabilized',
    'Corrugated cardboard boxes, double-wall, 24"x18"x12", 275lb burst strength, ECT-44, white kraft outer',
    'Electrostatic discharge (ESD) packaging materials, anti-static bubble wrap, 12"x100ft roll, pink color',
    'Stainless steel fasteners, grade 316, M6x1.0 thread, 20mm length, hex head, zinc plated',
    'Industrial rubber gaskets, 1/8" thickness, 12"x12" sheets, oil-resistant, temperature range -40°F to 212°F',
    'High-performance lubricating oil, ISO VG 68, synthetic base, anti-wear additives, 5-gallon pails',
    'Safety gloves, nitrile, powder-free, size L, 100-count box, medical grade',
    'Welding wire, ER70S-6, 0.035" diameter, 10lb spool, AWS certified'
  ];

  const additionalInfo = [
    'Requires temperature-controlled storage (15-25°C), humidity <60%, keep away from direct sunlight',
    'Critical component for assembly line A, minimum order quantity 1000 units, lead time 4-6 weeks',
    'Certified to ISO 9001:2015, RoHS compliant, includes material certification and test reports',
    'Custom printing available, minimum order 500 units, palletized 50 boxes per layer, 4 layers per pallet',
    'ESD protected packaging required, shelf life 12 months, inspect for damage upon receipt',
    'Must be stored in dry conditions, inspect for rust before use, torque specification: 15-20 Nm',
    'Store in cool, dry place, avoid direct sunlight, inspect for cracks before installation',
    'Store in temperature-controlled environment, use within 2 years of manufacture date',
    'Store in clean, dry area, inspect for tears before use, single-use only',
    'Store in dry conditions, use within 6 months of opening, inspect for contamination'
  ];

  for (let i = 1; i <= count; i++) {
    const paddedId = i.toString().padStart(3, '0');
    const descIndex = i % descriptions.length;
    const infoIndex = i % additionalInfo.length;
    
    rows.push({
      id: i,
      customerItemCode: `CUSTOMER-ITEM-${paddedId}-${new Date().getFullYear()}-REV${String.fromCharCode(65 + (i % 26))}`,
      supplierItemCode: `SUPPLIER-ITEM-${paddedId}-${suppliers[i % suppliers.length].split(' ')[0]}-${String.fromCharCode(65 + (i % 26))}`,
      description: descriptions[descIndex],
      itemType: itemTypes[i % itemTypes.length],
      materialOwner: `Procurement Team ${String.fromCharCode(65 + (i % 8))}`,
      costPerUnit: (Math.random() * 1000).toFixed(2),
      customerUOM: ['EA', 'KG', 'M', 'BOX', 'PALLET', 'ROLL', 'SET', 'PACK'][i % 8],
      supplierUOM: ['PCS', 'MT', 'YD', 'CASE', 'CONTAINER', 'REEL', 'KIT', 'BUNDLE'][i % 8],
      managingOrg: regions[i % regions.length],
      supplier: suppliers[i % suppliers.length],
      status: statuses[i % statuses.length],
      customerReference: `PO-${new Date().getFullYear()}-${paddedId}`,
      additionalInfo: additionalInfo[infoIndex]
    });
  }
  return rows;
};

const rows = generateRows(50);

const columns: Columns<{}> = [
  { 
    label: "Customer's Item Code", 
    dataKey: 'customerItemCode',
    width: 'auto',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" px="x2" width="100%" minWidth="216px">
        <Text>{cellData}</Text>
      </Box>
    )
  },
  { 
    label: "Supplier's Item Code", 
    dataKey: 'supplierItemCode',
    width: 'auto',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%" minWidth="216px">
        <Text>{cellData}</Text>
      </Box>
    )
  },
  { 
    label: 'Description', 
    dataKey: 'description',
    width: 'auto',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%" minWidth="288px">
        <Text>{cellData}</Text>
      </Box>
    )
  },
  {
    label: 'Item Type',
    dataKey: 'itemType',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Material Owner',
    dataKey: 'materialOwner',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Cost per Unit',
    dataKey: 'costPerUnit',
    width: '72px',
    align: 'right',
    headerFormatter: ({ label }) => (
      <Flex alignItems="center" gap="x1">
        {label}
        <Tooltip tooltip="Cost per unit in the supplier's currency">
          <IconicButton icon="info" />
        </Tooltip>
      </Flex>
    ),
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        ${cellData}
      </Box>
    )
  },
  {
    label: "Customer's UOM",
    dataKey: 'customerUOM',
    width: '72px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="72px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: "Supplier's UOM",
    dataKey: 'supplierUOM',
    width: '72px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="72px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Managing Organization',
    dataKey: 'managingOrg',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Supplier',
    dataKey: 'supplier',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Status',
    dataKey: 'status',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Customer Reference',
    dataKey: 'customerReference',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  },
  {
    label: 'Additional Info',
    dataKey: 'additionalInfo',
    width: '144px',
    cellRenderer: ({ cellData }) => (
      <Box py="x2" pr="x2" width="100%">
        <TruncatedText fullWidth maxWidth="144px">{cellData}</TruncatedText>
      </Box>
    )
  }
];

export default {
  title: 'Projects/Supplier Collaboration/Item Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'ItemTable component for supplier collaboration.',
      },
    },
  },
} as Meta;

const Template: Story = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
  rows,
  keyField: 'id',
  stickyHeader: true
}; 