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
  status: "Active" | "Deactivated";
}

// Helper function to create display objects
const createDisplayObjects = (priority: WorkOrderPriority) => ({
  priorityDisplay: { priority: priority.priority, status: priority.status },
  descriptionDisplay: { description: priority.description, status: priority.status },
  statusDisplay: { status: priority.status },
});

const PrioritiesPage = () => {
  const [priorities, setPriorities] = useState<WorkOrderPriority[]>([
    { id: "1", priority: 1, description: "High", status: "Active" },
    { id: "2", priority: 2, description: "Medium", status: "Active" },
    { id: "3", priority: 3, description: "Low", status: "Active" },
    { id: "4", priority: 4, description: "Very Low", status: "Deactivated" },
    { id: "5", priority: 5, description: "Minimal", status: "Deactivated" },
    { id: "6", priority: 6, description: "Routine", status: "Deactivated" },
    { id: "7", priority: 7, description: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", status: "Active" },
    { id: "8", priority: 8, description: "Basic", status: "Deactivated" },
    { id: "9", priority: 9, description: "Optional", status: "Deactivated" },
    { id: "10", priority: 10, description: "Custom", status: "Deactivated" },
  ]);

  const [editingPriority, setEditingPriority] = useState<WorkOrderPriority | null>(null);
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [isBlankSlate, setIsBlankSlate] = useState(true);
  const [deactivatingPriority, setDeactivatingPriority] = useState<WorkOrderPriority | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // Helper function to update priority with display objects
  const updatePriority = (id: string, updates: Partial<WorkOrderPriority>) => {
    setPriorities((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleEditPriority = (priority: WorkOrderPriority) => {
    setEditingPriority(priority);
    setShowEditSidebar(true);
  };

  const handleSavePriority = () => {
    if (editingPriority) {
      updatePriority(editingPriority.id, editingPriority);
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
      setEditingPriority({ ...editingPriority, status: checked ? "Active" : "Deactivated" });
    }
  };

  const handleToggleStatus = (priority: WorkOrderPriority) => {
    if (priority.status === "Active") {
      setDeactivatingPriority(priority);
      setShowDeactivateModal(true);
    } else {
      updatePriority(priority.id, { status: "Active" });
      toast.success("Priority activated successfully");
    }
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingPriority) {
      updatePriority(deactivatingPriority.id, { status: "Deactivated" });
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
    { id: "1", priority: 1, description: "High", status: "Active" },
    { id: "2", priority: 2, description: "Medium", status: "Active" },
    { id: "3", priority: 3, description: "Low", status: "Active" },
    { id: "4", priority: 4, description: "P4", status: "Deactivated" },
    { id: "5", priority: 5, description: "P5", status: "Deactivated" },
    { id: "6", priority: 6, description: "P6", status: "Deactivated" },
    { id: "7", priority: 7, description: "P7", status: "Deactivated" },
    { id: "8", priority: 8, description: "P8", status: "Deactivated" },
    { id: "9", priority: 9, description: "P9", status: "Deactivated" },
    { id: "10", priority: 10, description: "P10", status: "Deactivated" },
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

  const currentPriorities = isBlankSlate ? blankSlatePriorities : priorities;

  const priorityColumns = [
    {
      label: "Priority",
      dataKey: "priority",
      width: "160px",
      cellFormatter: (props: { row: WorkOrderPriority }) => {
        const display = createDisplayObjects(props.row);
        return (
          <Text color={display.priorityDisplay.status === "Active" ? undefined : "midGrey"}>
            {display.priorityDisplay.priority}
          </Text>
        );
      },
    },
    {
      label: "Label",
      dataKey: "description",
      width: "auto",
      cellFormatter: (props: { row: WorkOrderPriority }) => {
        const display = createDisplayObjects(props.row);
        return (
          <Text color={display.descriptionDisplay.status === "Active" ? undefined : "midGrey"}>
            {display.descriptionDisplay.description || "-"}
          </Text>
        );
      },
    },
    {
      label: "Status",
      dataKey: "status",
      width: "220px",
      cellFormatter: (props: { row: WorkOrderPriority }) => {
        const display = createDisplayObjects(props.row);
        return (
          <Text color={display.statusDisplay.status === "Active" ? undefined : "midGrey"}>
            {display.statusDisplay.status}
          </Text>
        );
      },
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
            <Box maxWidth="976px" mx="auto" mt="x3">
              <Table columns={priorityColumns} rows={currentPriorities} compact />
            </Box>
          </Tab>
        </Tabs>

        {/* Edit Sidebar */}
        <Sidebar
          isOpen={showEditSidebar && !!editingPriority}
          title="Edit priority"
          onClose={handleCancelEdit}
          width="400px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          helpText={editingPriority ? `Priority ${editingPriority.priority}` : undefined}
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
                      helpText="This label will be displayed throughout the application."
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
                      helpText="Toggle to activate or deactivate the the priority in the application."
                    />
                    <Toggle
                      toggled={editingPriority.status === "Active"}
                      onChange={(e) => handleStatusChange(e.target.checked)}
                      onText="Active"
                      offText="Deactivated"
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
          px="x3"
          borderRadius="rounded"
          boxShadow="shadow"
          border="1px solid"
          borderColor="lightGrey"
        >
          <Flex alignItems="center" gap="x2">
            <Text fontWeight="medium">View</Text>
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
          title="Priority assigned in a PO line item"
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
              Priority {deactivatingPriority.priority} ({deactivatingPriority.description}) is currently assigned to at
              least one "In progress" PO line item. Deactivating this priority will retain its assignment on existing
              line item(s), but it will no longer be available for new assignments.
            </Text>
          )}
          <Text>Are you sure you want to deactivate this priority?</Text>
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};

export const Default = () => <PrioritiesPage />;
