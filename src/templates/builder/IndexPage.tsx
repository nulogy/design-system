import React from "react";
import {
  ApplicationFrame,
  Box,
  Flex,
  Header,
  IconicButton,
  Link,
  Navigation,
  Page,
  Pagination,
  Table,
  Text,
  VerticalDivider,
  Breadcrumbs,
} from "../../index";
import { IndexConfig } from "./types";

interface IndexPageProps {
  config: IndexConfig;
  tableData: any[];
  currentPage: number;
  containerWidth: string;
  onPageSelect: (page: number) => void;
  onCreateNew: () => void;
  onFilterClick: () => void;
  onDeleteClick: (record: any) => void;
}

export const IndexPage: React.FC<IndexPageProps> = ({
  config,
  tableData,
  currentPage,
  containerWidth,
  onPageSelect,
  onCreateNew,
  onFilterClick,
  onDeleteClick,
}) => {
  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  const visibleTableColumns = React.useMemo(() => {
    if (!config.tableColumns || config.tableColumns.length === 0) {
      return [
        {
          label: "ID",
          dataKey: "id",
          cellFormatter: (props) => (
            <Link href={`#/records/${props.cellData}`} underline={false}>
              {props.cellData}
            </Link>
          ),
        },
        { label: "Name", dataKey: "name" },
        { label: "Status", dataKey: "status" },
        { label: "Date", dataKey: "date" },
        {
          label: "Actions",
          dataKey: "actions",
          cellFormatter: (props) => (
            <Flex gap="x1">
              <IconicButton icon="edit" tooltip="Edit" onClick={() => {}} />
              <IconicButton icon="delete" tooltip="Delete" onClick={() => onDeleteClick(props.row)} />
            </Flex>
          ),
        },
      ];
    }
    return config.tableColumns.filter((column) => config.visibleColumns[column.dataKey] !== false);
  }, [config.tableColumns, config.visibleColumns, onDeleteClick]);

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          appSwitcher={{
            apps: {
              "production-scheduling": { url: "https://nulogy.com/" },
              "supplier-collaboration": { url: "https://nulogy.com/" },
              "digital-quality-inspection": { url: "https://nulogy.com/" },
            },
          }}
          primaryNavigation={[
            {
              key: "home",
              label: "Home",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "records",
              label: "Records",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "help",
              label: "Help",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "settings",
              label: "Settings",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
        />
      }
    >
      <Page
        breadcrumbs={breadcrumbs}
        title={config.title}
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title={config.title}
            subtitle={config.alternativeTitle}
            renderActions={() =>
              config.includePageActions ? (
                <Flex gap="x2" alignItems="center">
                  <IconicButton icon="publish" tooltip="Export records">
                    Export records
                  </IconicButton>
                </Flex>
              ) : null
            }
          />
        )}
      >
        <Box maxWidth={containerWidth} mx="auto">
          <Flex justifyContent="flex-end" mb="x4">
            <Flex gap="x2" alignItems="center">
              <IconicButton icon="filter" tooltip="Filter records" onClick={onFilterClick}>
                Filter records
              </IconicButton>
              <VerticalDivider />
              <IconicButton icon="getApp" tooltip="Import records">
                Import records
              </IconicButton>
              <VerticalDivider />
              <IconicButton icon="add" tooltip="New record" onClick={onCreateNew}>
                New record
              </IconicButton>
              <VerticalDivider />
              <IconicButton icon="print" tooltip="Print records">
                Print records
              </IconicButton>
            </Flex>
          </Flex>
          <Table
            columns={visibleTableColumns}
            rows={config.uploadedData || tableData}
            hasSelectableRows
            hasExpandableRows={false}
            keyField="id"
            compact
          />
          {config.showPagination && (
            <Flex justifyContent="flex-end" mt="x4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil((config.uploadedData || tableData).length / (config.numberOfRows || 10))}
                onSelectPage={onPageSelect}
              />
            </Flex>
          )}
        </Box>
      </Page>
    </ApplicationFrame>
  );
};
