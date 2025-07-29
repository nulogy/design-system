import React, { useState } from "react";
import {
  ApplicationFrame,
  Page,
  Box,
  Heading2,
  Text,
  Flex,
  Table,
  StatusIndicator,
  Link,
  IconicButton,
  ToastContainer,
  toast,
  Breadcrumbs,
  Button,
  Sidebar,
  Input,
  Select,
  DatePicker,
  Form,
  FormSection,
  Field,
  Checkbox,
  FieldLabel,
  Toggle,
  TruncatedText,
  PrimaryButton,
  QuietButton,
  DropdownMenu,
  DropdownButton,
  Divider,
  Tabs,
  Tab,
  Alert,
  Modal,
  BrandedNavBar,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Priorities/Default",
  parameters: {
    layout: "fullscreen",
  },
};

interface WorkOrderPriority {
  id: string;
  priority: number;
  description: string;
  status: "Active" | "Inactive";
  priorityDisplay: { priority: number; status: "Active" | "Inactive" };
  descriptionDisplay: { description: string; status: "Active" | "Inactive" };
  statusDisplay: { status: "Active" | "Inactive" };
}

const PrioritiesPage = () => {
  const [priorities, setPriorities] = useState<WorkOrderPriority[]>([
    {
      id: "1",
      priority: 1,
      description: "Critical",
      status: "Active",
      priorityDisplay: { priority: 1, status: "Active" },
      descriptionDisplay: { description: "Critical", status: "Active" },
      statusDisplay: { status: "Active" },
    },
    {
      id: "2",
      priority: 2,
      description: "High",
      status: "Active",
      priorityDisplay: { priority: 2, status: "Active" },
      descriptionDisplay: { description: "High", status: "Active" },
      statusDisplay: { status: "Active" },
    },
    {
      id: "3",
      priority: 3,
      description: "Wwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      status: "Inactive",
      priorityDisplay: { priority: 3, status: "Inactive" },
      descriptionDisplay: { description: "Wwwwwwwwwwwwwwwwwwwwwwwwwwwwww", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "4",
      priority: 4,
      description: "Low",
      status: "Inactive",
      priorityDisplay: { priority: 4, status: "Inactive" },
      descriptionDisplay: { description: "Low", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "5",
      priority: 5,
      description: "Very Low",
      status: "Active",
      priorityDisplay: { priority: 5, status: "Active" },
      descriptionDisplay: { description: "Very Low", status: "Active" },
      statusDisplay: { status: "Active" },
    },
    {
      id: "6",
      priority: 6,
      description: "Minimal",
      status: "Inactive",
      priorityDisplay: { priority: 6, status: "Inactive" },
      descriptionDisplay: { description: "Minimal", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "7",
      priority: 7,
      description: "Routine",
      status: "Active",
      priorityDisplay: { priority: 7, status: "Active" },
      descriptionDisplay: { description: "Routine", status: "Active" },
      statusDisplay: { status: "Active" },
    },
    {
      id: "8",
      priority: 8,
      description: "Standard",
      status: "Active",
      priorityDisplay: { priority: 8, status: "Active" },
      descriptionDisplay: { description: "Standard", status: "Active" },
      statusDisplay: { status: "Active" },
    },
    {
      id: "9",
      priority: 9,
      description: "Basic",
      status: "Active",
      priorityDisplay: { priority: 9, status: "Active" },
      descriptionDisplay: { description: "Basic", status: "Active" },
      statusDisplay: { status: "Active" },
    },
    {
      id: "10",
      priority: 10,
      description: "Optional",
      status: "Active",
      priorityDisplay: { priority: 10, status: "Active" },
      descriptionDisplay: { description: "Optional", status: "Active" },
      statusDisplay: { status: "Active" },
    },
  ]);

  const [editingPriority, setEditingPriority] = useState<WorkOrderPriority | null>(null);
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [isBlankSlate, setIsBlankSlate] = useState(false);
  const [deactivatingPriority, setDeactivatingPriority] = useState<WorkOrderPriority | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handleEditPriority = (priority: WorkOrderPriority) => {
    setEditingPriority(priority);
    setShowEditSidebar(true);
  };

  const handleSavePriority = () => {
    if (editingPriority) {
      setPriorities((prev) => prev.map((p) => (p.id === editingPriority.id ? editingPriority : p)));
      setEditingPriority(null);
      setShowEditSidebar(false);
      toast.success("Priority updated successfully");
    }
  };

  const handleCancelEdit = () => {
    setEditingPriority(null);
    setShowEditSidebar(false);
  };

  const handleDescriptionChange = (value: string) => {
    if (editingPriority) {
      setEditingPriority({ ...editingPriority, description: value });
    }
  };

  const handleStatusChange = (checked: boolean) => {
    if (editingPriority) {
      setEditingPriority({ ...editingPriority, status: checked ? "Active" : "Inactive" });
    }
  };

  const handleToggleStatus = (priority: WorkOrderPriority) => {
    if (priority.status === "Active") {
      // Show confirmation modal for deactivation
      setDeactivatingPriority(priority);
      setShowDeactivateModal(true);
    } else {
      // Activate immediately
      setPriorities((prev) =>
        prev.map((p) =>
          p.id === priority.id
            ? {
                ...p,
                status: "Active",
                priorityDisplay: {
                  priority: p.priority,
                  status: "Active",
                },
                descriptionDisplay: {
                  description: p.description,
                  status: "Active",
                },
                statusDisplay: {
                  status: "Active",
                },
              }
            : p
        )
      );
      toast.success("Priority activated successfully");
    }
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingPriority) {
      setPriorities((prev) =>
        prev.map((p) =>
          p.id === deactivatingPriority.id
            ? {
                ...p,
                status: "Inactive",
                priorityDisplay: {
                  priority: p.priority,
                  status: "Inactive",
                },
                descriptionDisplay: {
                  description: p.description,
                  status: "Inactive",
                },
                statusDisplay: {
                  status: "Inactive",
                },
              }
            : p
        )
      );
      toast.success("Priority deactivated successfully");
    }
    setDeactivatingPriority(null);
    setShowDeactivateModal(false);
  };

  const handleCancelDeactivate = () => {
    setDeactivatingPriority(null);
    setShowDeactivateModal(false);
  };

  const blankSlatePriorities: WorkOrderPriority[] = [
    {
      id: "1",
      priority: 1,
      description: "P1",
      status: "Inactive",
      priorityDisplay: { priority: 1, status: "Inactive" },
      descriptionDisplay: { description: "P1", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "2",
      priority: 2,
      description: "P2",
      status: "Inactive",
      priorityDisplay: { priority: 2, status: "Inactive" },
      descriptionDisplay: { description: "P2", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "3",
      priority: 3,
      description: "P3",
      status: "Inactive",
      priorityDisplay: { priority: 3, status: "Inactive" },
      descriptionDisplay: { description: "P3", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "4",
      priority: 4,
      description: "P4",
      status: "Inactive",
      priorityDisplay: { priority: 4, status: "Inactive" },
      descriptionDisplay: { description: "P4", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "5",
      priority: 5,
      description: "P5",
      status: "Inactive",
      priorityDisplay: { priority: 5, status: "Inactive" },
      descriptionDisplay: { description: "P5", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "6",
      priority: 6,
      description: "P6",
      status: "Inactive",
      priorityDisplay: { priority: 6, status: "Inactive" },
      descriptionDisplay: { description: "P6", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "7",
      priority: 7,
      description: "P7",
      status: "Inactive",
      priorityDisplay: { priority: 7, status: "Inactive" },
      descriptionDisplay: { description: "P7", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "8",
      priority: 8,
      description: "P8",
      status: "Inactive",
      priorityDisplay: { priority: 8, status: "Inactive" },
      descriptionDisplay: { description: "P8", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "9",
      priority: 9,
      description: "P9",
      status: "Inactive",
      priorityDisplay: { priority: 9, status: "Inactive" },
      descriptionDisplay: { description: "P9", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
    {
      id: "10",
      priority: 10,
      description: "P10",
      status: "Inactive",
      priorityDisplay: { priority: 10, status: "Inactive" },
      descriptionDisplay: { description: "P10", status: "Inactive" },
      statusDisplay: { status: "Inactive" },
    },
  ];

  const navigation = (
    <BrandedNavBar
      menuData={{
        primaryMenu: [
          { name: "Dashboard", href: "/app/supplier-collaboration" },
          { name: "Suppliers", href: "/app/supplier-collaboration/suppliers" },
          { name: "Collaborations", href: "/app/supplier-collaboration/collaborations" },
          { name: "Priorities", href: "/app/supplier-collaboration/priorities" },
        ],
        secondaryMenu: [
          { name: "Help", href: "#" },
          { name: "Settings", href: "#" },
        ],
      }}
    />
  );

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="/app/supplier-collaboration" underline={false}>
        Home
      </Link>
    </Breadcrumbs>
  );

  const priorityColumns = [
    {
      label: "Priority",
      dataKey: "priorityDisplay",
      width: "120px",
      cellFormatter: (props: { cellData: { priority: number; status: "Active" | "Inactive" } }) => (
        <Text color={props.cellData.status === "Active" ? undefined : "midGrey"}>{props.cellData.priority}</Text>
      ),
    },
    {
      label: "Label",
      dataKey: "descriptionDisplay",
      width: "auto",
      cellFormatter: (props: { cellData: { description: string; status: "Active" | "Inactive" } }) => (
        <Text color={props.cellData.status === "Active" ? undefined : "midGrey"}>
          {props.cellData.description || "-"}
        </Text>
      ),
    },
    {
      label: "Status",
      dataKey: "statusDisplay",
      width: "170px",
      cellFormatter: (props: { cellData: { status: "Active" | "Inactive" } }) => (
        <Text color={props.cellData.status === "Active" ? undefined : "midGrey"}>{props.cellData.status}</Text>
      ),
    },
    {
      label: "",
      dataKey: "actions",
      width: "40px",
      cellFormatter: (props: { row: WorkOrderPriority }) => (
        <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />}>
          <DropdownButton onClick={() => handleEditPriority(props.row)}>Edit</DropdownButton>
          <Divider my="x1" />
          {props.row.status === "Active" ? (
            <DropdownButton onClick={() => handleToggleStatus(props.row)}>Deactivate</DropdownButton>
          ) : (
            <DropdownButton onClick={() => handleToggleStatus(props.row)}>Activate</DropdownButton>
          )}
        </DropdownMenu>
      ),
    },
  ];

  return (
    <ApplicationFrame>
      <ToastContainer />
      {navigation}
      <Page fullHeight breadcrumbs={breadcrumbs} title="PO line items configuration">
        <Tabs defaultSelectedIndex={0}>
          <Tab label="Priorities">
            <Box maxWidth="720px" mx="auto" mt="x3">
              <Table columns={priorityColumns} rows={isBlankSlate ? blankSlatePriorities : priorities} compact />
            </Box>
          </Tab>
        </Tabs>

        {/* Edit Sidebar */}
        <Sidebar
          isOpen={showEditSidebar && !!editingPriority}
          title="Edit"
          onClose={handleCancelEdit}
          width="400px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          helpText={editingPriority ? `Priority level ${editingPriority.priority}` : undefined}
          footer={
            <Flex gap="x2">
              <PrimaryButton onClick={handleSavePriority}>Save</PrimaryButton>
              <QuietButton onClick={handleCancelEdit}>Cancel</QuietButton>
            </Flex>
          }
        >
          {editingPriority && (
            <Form>
              <FormSection>
                <Box pb="x3">
                  <Field>
                    <FieldLabel
                      labelText="Label"
                      pb="x1"
                      helpText="This label will be displayed in the application instead of the priority level name."
                      requirementText="(Required)"
                    />
                    <Input
                      value={editingPriority.description}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      placeholder="Enter priority label"
                      required
                      autoFocus
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel
                      labelText="Status"
                      pb="x1"
                      helpText="Toggle to activate or deactivate the use of this priority level in the application."
                    />
                    <Toggle
                      toggled={editingPriority.status === "Active"}
                      onChange={(e) => handleStatusChange(e.target.checked)}
                      onText="Active"
                      offText="Inactive"
                    />
                  </Field>
                </Box>
              </FormSection>
            </Form>
          )}
        </Sidebar>

        {/* Floating Configuration */}
        <Box
          position="fixed"
          bottom="x4"
          right="x4"
          bg="white"
          p="x3"
          borderRadius="rounded"
          boxShadow="shadow"
          border="1px solid"
          borderColor="lightGrey"
        >
          <Flex alignItems="center" gap="x2">
            <Text fontWeight="medium">Configuration</Text>
            <Toggle
              toggled={isBlankSlate}
              onChange={(e) => setIsBlankSlate(e.target.checked)}
              onText="Default"
              offText="Customized"
            />
          </Flex>
        </Box>

        {/* Deactivate Confirmation Modal */}
        <Modal
          isOpen={showDeactivateModal}
          title="Priority assigned in an active PO line item"
          onRequestClose={handleCancelDeactivate}
          footerContent={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={handleConfirmDeactivate}>Yes, deactivate priority</PrimaryButton>
              <QuietButton onClick={handleCancelDeactivate}>No, cancel</QuietButton>
            </Flex>
          }
        >
          {deactivatingPriority && (
            <Text mb="x2">
              This Priority {deactivatingPriority.priority} ({deactivatingPriority.description}) is currently assigned
              to an active PO line item. Disabling the priority will retain its assignment on this item, but it will no
              longer be available for reassignment to this or any other PO line item.
            </Text>
          )}
          <Text>Are you sure you want to deactivate this priority?</Text>
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};

export const Default = () => <PrioritiesPage />;
