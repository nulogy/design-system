import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  Navigation,
  Page,
  Header,
  Breadcrumbs,
  Link,
  Table,
  Flex,
  IconicButton,
  Text,
  Box,
  Divider,
  Pagination,
  VerticalDivider,
  ToastContainer,
  toast,
  Heading2,
  Heading3,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Sidebar,
  Form,
  FormSection,
  FieldLabel,
  Input,
  Select,
  DatePicker,
  Textarea,
  PrimaryButton,
  QuietButton,
} from "../../index";
import FilterSidebar from "../builder/FilterSidebar";

const meta: Meta = {
  title: "Templates/Prototype/Wireframe Flow",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Sample customer data
const initialCustomers = [
  {
    id: "1",
    name: "XYZ Corporation",
    code: "123",
    description: "Large manufacturing company specializing in automotive parts",
    inactive: false,
  },
  {
    id: "2",
    name: "ABC Industries",
    code: "456",
    description: "Electronics distributor serving North America",
    inactive: true,
  },
  {
    id: "3",
    name: "Global Supply Co",
    code: "789",
    description: "International logistics and supply chain solutions",
    inactive: false,
  },
  {
    id: "4",
    name: "Metro Manufacturing",
    code: "101",
    description: "Regional manufacturer of consumer goods",
    inactive: false,
  },
];

export const IndexToRecordFlow = () => {
  const [currentView, setCurrentView] = useState<"index" | "record">("index");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("1");
  const [customers, setCustomers] = useState(initialCustomers);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isCreateSidebarOpen, setIsCreateSidebarOpen] = useState(false);

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentView("record");
  };

  const handleBackToIndex = () => {
    setCurrentView("index");
  };

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleCreateCustomerClick = () => {
    setIsCreateSidebarOpen(true);
  };

  const handleCreateCustomer = (formData: any) => {
    const newCustomer = {
      id: String(customers.length + 1),
      name: formData.name,
      code: formData.code,
      description: formData.description,
      inactive: formData.inactive === "true",
    };
    setCustomers([...customers, newCustomer]);
    setIsCreateSidebarOpen(false);
    toast.success("Customer created successfully");
  };

  const handleFilterApply = (newFilters: any) => {
    setIsFilterSidebarOpen(false);
    toast.success("Filters applied");
  };

  // Get selected customer data
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);

  // Breadcrumbs
  const indexBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#" underline={false}>
        Home
      </Link>
    </Breadcrumbs>
  );

  const recordBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#" underline={false}>
        Home
      </Link>
      <Link href="#" underline={false} onClick={handleBackToIndex}>
        Customers
      </Link>
    </Breadcrumbs>
  );

  // Table columns for index
  const tableColumns = [
    {
      label: "Name",
      dataKey: "name",
      cellFormatter: (props) => (
        <Link href="#" underline={false} onClick={() => handleCustomerClick(props.row.id)}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Code", dataKey: "code" },
    { label: "Description", dataKey: "description" },
    {
      label: "Inactive",
      dataKey: "inactive",
      cellFormatter: (props) => (props.cellData ? "Yes" : "No"),
    },
  ];

  const filterFields = [
    {
      key: "name",
      label: "Name",
      type: "text" as const,
    },
    {
      key: "code",
      label: "Code",
      type: "text" as const,
    },
    {
      key: "description",
      label: "Description",
      type: "text" as const,
    },
    {
      key: "inactive",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "All", value: "all" },
        { label: "Active only", value: "false" },
        { label: "Inactive only", value: "true" },
      ],
    },
  ];

  // Render index view
  if (currentView === "index") {
    return (
      <ApplicationFrame
        navBar={
          <Navigation
            appSwitcher={{
              apps: {
                "production-scheduling": {
                  url: "https://nulogy.com/",
                },
                "supplier-collaboration": {
                  url: "https://nulogy.com/",
                },
              },
            }}
            primaryNavigation={[
              {
                key: "company",
                label: "Company",
                type: "link" as const,
                props: { href: "#" },
              },
              {
                key: "operations",
                label: "Operations",
                type: "link" as const,
                props: { href: "#" },
              },
              {
                key: "reports",
                label: "Reports",
                type: "link" as const,
                props: { href: "#" },
              },
            ]}
            secondaryNavigation={[
              {
                key: "create",
                label: "Create",
                type: "link" as const,
                props: { href: "#" },
              },
            ]}
          />
        }
      >
        <ToastContainer />
        <Page
          fullHeight
          breadcrumbs={indexBreadcrumbs}
          renderHeader={() => (
            <Header renderBreadcrumbs={() => indexBreadcrumbs} title="Customers" subtitle="Nulogy Site" />
          )}
        >
          <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
            <IconicButton icon="add" onClick={handleCreateCustomerClick}>
              Add
            </IconicButton>
          </Flex>

          <Flex gap="x2" px="x1" pb="x2" justifyContent="space-between" alignItems="center">
            <Heading2>Customers</Heading2>
            <IconicButton icon="filter" onClick={handleFilterClick}>
              Filters
            </IconicButton>
          </Flex>

          <Table columns={tableColumns} rows={customers} keyField="id" />
        </Page>

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
        />

        <Sidebar isOpen={isCreateSidebarOpen} onClose={() => setIsCreateSidebarOpen(false)} title="Create customer">
          <Form onSubmit={handleCreateCustomer}>
            <FormSection>
              <FieldLabel labelText="Name" htmlFor="name">
                Name
              </FieldLabel>
              <Input id="name" name="name" required />

              <FieldLabel labelText="Code" htmlFor="code">
                Code
              </FieldLabel>
              <Input id="code" name="code" required />

              <FieldLabel labelText="Description" htmlFor="description">
                Description
              </FieldLabel>
              <Textarea id="description" name="description" />

              <FieldLabel labelText="Status" htmlFor="inactive">
                Status
              </FieldLabel>
              <select id="inactive" name="inactive">
                <option value="false">Active</option>
                <option value="true">Inactive</option>
              </select>
            </FormSection>

            <Flex gap="x2" justifyContent="flex-end" pt="x4">
              <QuietButton type="button" onClick={() => setIsCreateSidebarOpen(false)}>
                Cancel
              </QuietButton>
              <PrimaryButton type="submit">Create customer</PrimaryButton>
            </Flex>
          </Form>
        </Sidebar>
      </ApplicationFrame>
    );
  }

  // Render record view
  return (
    <ApplicationFrame
      navBar={
        <Navigation
          appSwitcher={{
            apps: {
              "production-scheduling": {
                url: "https://nulogy.com/",
              },
              "supplier-collaboration": {
                url: "https://nulogy.com/",
              },
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
        />
      }
    >
      <ToastContainer />
      <Page
        fullHeight
        breadcrumbs={recordBreadcrumbs}
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => recordBreadcrumbs}
            title={selectedCustomer?.name || "Customer"}
            subtitle="Nulogy Site"
          />
        )}
      >
        <Box px="x1">
          <Heading2 pb="x2">Customer details</Heading2>
          <DescriptionList>
            <DescriptionGroup>
              <DescriptionTerm>Name</DescriptionTerm>
              <DescriptionDetails>{selectedCustomer?.name}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Code</DescriptionTerm>
              <DescriptionDetails>{selectedCustomer?.code}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Description</DescriptionTerm>
              <DescriptionDetails>{selectedCustomer?.description}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>{selectedCustomer?.inactive ? "Inactive" : "Active"}</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>

          <Heading2 pb="x2" pt="x6">
            Contact information
          </Heading2>
          <DescriptionList>
            <DescriptionGroup>
              <DescriptionTerm>Primary contact</DescriptionTerm>
              <DescriptionDetails>John Smith</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Email</DescriptionTerm>
              <DescriptionDetails>
                john.smith@{selectedCustomer?.name.toLowerCase().replace(/\s+/g, "")}.com
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Phone</DescriptionTerm>
              <DescriptionDetails>(555) 123-4567</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Address</DescriptionTerm>
              <DescriptionDetails>
                123 Business Ave, Suite 100
                <br />
                Business City, BC A1B 2C3
              </DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>

          <Heading2 pb="x2" pt="x6">
            Account information
          </Heading2>
          <DescriptionList>
            <DescriptionGroup>
              <DescriptionTerm>Account manager</DescriptionTerm>
              <DescriptionDetails>Sarah Johnson</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Credit limit</DescriptionTerm>
              <DescriptionDetails>$50,000.00</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Payment terms</DescriptionTerm>
              <DescriptionDetails>Net 30</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer since</DescriptionTerm>
              <DescriptionDetails>January 15, 2020</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
      </Page>
    </ApplicationFrame>
  );
};
