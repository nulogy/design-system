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
  title: "Projects/Supplier Collaboration/Custom tags",
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

interface CustomTag {
  id: string;
  label: string;
  type: string;
  status: "Active" | "Deactivated";
}

// Helper function to create display objects
const createDisplayObjects = (priority: WorkOrderPriority) => ({
  priorityDisplay: { priority: priority.priority, status: priority.status },
  descriptionDisplay: { description: priority.description, status: priority.status },
  statusDisplay: { status: priority.status },
});

const CustomTagsPage = () => {
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

  const [customTags, setCustomTags] = useState<CustomTag[]>([
    { id: "1", label: "Express shipment", type: "neutral", status: "Active" },
    { id: "2", label: "Validated for assembly", type: "success", status: "Active" },
  ]);

  const [editingPriority, setEditingPriority] = useState<WorkOrderPriority | null>(null);
  const [editingTag, setEditingTag] = useState<CustomTag | null>(null);
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [showTagEditSidebar, setShowTagEditSidebar] = useState(false);
  const [showCreateTagSidebar, setShowCreateTagSidebar] = useState(false);
  const [newTag, setNewTag] = useState<Partial<CustomTag>>({
    label: "",
    type: "neutral",
    status: "Active",
  });
  const [isBlankSlate, setIsBlankSlate] = useState(true);
  const [deactivatingPriority, setDeactivatingPriority] = useState<WorkOrderPriority | null>(null);
  const [deactivatingTag, setDeactivatingTag] = useState<CustomTag | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showTagDeactivateModal, setShowTagDeactivateModal] = useState(false);

  // Helper function to update priority with display objects
  const updatePriority = (id: string, updates: Partial<WorkOrderPriority>) => {
    setPriorities((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  // Helper function to update custom tag
  const updateTag = (id: string, updates: Partial<CustomTag>) => {
    setCustomTags((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const handleEditPriority = (priority: WorkOrderPriority) => {
    setEditingPriority(priority);
    setShowEditSidebar(true);
  };

  const handleEditTag = (tag: CustomTag) => {
    setEditingTag(tag);
    setShowTagEditSidebar(true);
  };

  const handleSavePriority = () => {
    if (editingPriority) {
      updatePriority(editingPriority.id, editingPriority);
      setEditingPriority(null);
      setShowEditSidebar(false);
      toast.success("Priority updated successfully");
    }
  };

  const handleSaveTag = () => {
    if (editingTag) {
      updateTag(editingTag.id, editingTag);
      setEditingTag(null);
      setShowTagEditSidebar(false);
      toast.success("Custom tag updated successfully");
    }
  };

  const handleCancelEdit = () => {
    setEditingPriority(null);
    setShowEditSidebar(false);
  };

  const handleCancelTagEdit = () => {
    setEditingTag(null);
    setShowTagEditSidebar(false);
  };

  const handleCreateTag = () => {
    setShowCreateTagSidebar(true);
  };

  const handleSaveNewTag = () => {
    if (newTag.label && newTag.type && newTag.status) {
      const tag: CustomTag = {
        id: String(Date.now()),
        label: newTag.label,
        type: newTag.type,
        status: newTag.status,
      };
      setCustomTags((prev) => [...prev, tag]);
      setNewTag({ label: "", type: "neutral", status: "Active" });
      setShowCreateTagSidebar(false);
      toast.success("Custom tag created successfully");
    }
  };

  const handleCancelCreateTag = () => {
    setNewTag({ label: "", type: "neutral", status: "Active" });
    setShowCreateTagSidebar(false);
  };

  const handleDescriptionChange = (value: string) => {
    if (editingPriority) {
      setEditingPriority({ ...editingPriority, description: value });
    }
  };

  const handleStatusChange = (isActive: boolean) => {
    if (editingPriority) {
      setEditingPriority({ ...editingPriority, status: isActive ? "Active" : "Deactivated" });
    }
  };

  const handleTagLabelChange = (value: string) => {
    if (editingTag) {
      setEditingTag({ ...editingTag, label: value });
    }
  };

  const handleTagTypeChange = (value: string) => {
    if (editingTag) {
      setEditingTag({ ...editingTag, type: value });
    }
  };

  const handleTagStatusChange = (isActive: boolean) => {
    if (editingTag) {
      setEditingTag({ ...editingTag, status: isActive ? "Active" : "Deactivated" });
    }
  };

  const handleNewTagLabelChange = (value: string) => {
    setNewTag({ ...newTag, label: value });
  };

  const handleNewTagTypeChange = (value: string) => {
    setNewTag({ ...newTag, type: value });
  };

  const handleNewTagStatusChange = (isActive: boolean) => {
    setNewTag({ ...newTag, status: isActive ? "Active" : "Deactivated" });
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

  const handleToggleTagStatus = (tag: CustomTag) => {
    if (tag.status === "Active") {
      setDeactivatingTag(tag);
      setShowTagDeactivateModal(true);
    } else {
      updateTag(tag.id, { status: "Active" });
      toast.success("Custom tag activated successfully");
    }
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingPriority) {
      updatePriority(deactivatingPriority.id, { status: "Deactivated" });
      setDeactivatingPriority(null);
      setShowDeactivateModal(false);
      toast.success("Priority deactivated successfully");
    }
  };

  const handleConfirmTagDeactivate = () => {
    if (deactivatingTag) {
      updateTag(deactivatingTag.id, { status: "Deactivated" });
      setDeactivatingTag(null);
      setShowTagDeactivateModal(false);
      toast.success("Custom tag deactivated successfully");
    }
  };

  const handleCancelDeactivate = () => {
    setDeactivatingPriority(null);
    setShowDeactivateModal(false);
  };

  const handleCancelTagDeactivate = () => {
    setDeactivatingTag(null);
    setShowTagDeactivateModal(false);
  };

  const blankSlatePriorities = [
    { id: "1", priority: 1, description: "High", status: "Active" },
    { id: "2", priority: 2, description: "Medium", status: "Active" },
    { id: "3", priority: 3, description: "Low", status: "Active" },
    { id: "4", priority: 4, description: "Very Low", status: "Deactivated" },
    { id: "5", priority: 5, description: "Minimal", status: "Deactivated" },
    { id: "6", priority: 6, description: "Routine", status: "Deactivated" },
    { id: "7", priority: 7, description: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", status: "Active" },
    { id: "8", priority: 8, description: "-", status: "Deactivated" },
    { id: "9", priority: 9, description: "-", status: "Deactivated" },
    { id: "10", priority: 10, description: "-", status: "Deactivated" },
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
      <Text>Configuration</Text>
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
      label: "Description",
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

  const customTagColumns = [
    {
      label: "Custom tag",
      dataKey: "customTag",
      width: "auto",
      cellFormatter: (props: { row: CustomTag }) => {
        const getStatusIndicatorType = (type: string) => {
          return type as any; // Type corresponds directly to StatusIndicator type
        };

        return (
          <Flex alignItems="center" gap="x1">
            <StatusIndicator type={getStatusIndicatorType(props.row.type)}>{props.row.label}</StatusIndicator>
            {props.row.status === "Deactivated" && (
              <Text fontSize="small" color="midGrey">
                (Deactivated)
              </Text>
            )}
          </Flex>
        );
      },
    },
    {
      label: "Status",
      dataKey: "status",
      width: "220px",
      cellFormatter: (props: { row: CustomTag }) => (
        <Text color={props.row.status === "Active" ? undefined : "midGrey"}>{props.row.status}</Text>
      ),
    },
    {
      label: "",
      dataKey: "actions",
      width: "40px",
      cellFormatter: (props: { row: CustomTag }) => (
        <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />}>
          <DropdownButton onClick={() => handleEditTag(props.row)}>Edit</DropdownButton>
          <Divider my="x1" />
          {props.row.status === "Active" ? (
            <DropdownButton onClick={() => handleToggleTagStatus(props.row)}>Deactivate</DropdownButton>
          ) : (
            <DropdownButton onClick={() => handleToggleTagStatus(props.row)}>Activate</DropdownButton>
          )}
        </DropdownMenu>
      ),
    },
  ];

  const tagTypeOptions = [
    { label: "Neutral", value: "neutral" },
    { label: "Dark", value: "dark" },
    { label: "Danger", value: "danger" },
    { label: "Informative", value: "informative" },
    { label: "Success", value: "success" },
    { label: "Warning", value: "warning" },
    { label: "Quiet", value: "quiet" },
  ];

  return (
    <ApplicationFrame>
      <ToastContainer />
      {navigation}
      <Page fullHeight breadcrumbs={breadcrumbs} title="PO line items">
        <Tabs defaultSelectedIndex={0}>
          <Tab label="Priorities">
            <Box maxWidth="976px" mx="auto" mt="x3">
              <Table columns={priorityColumns} rows={currentPriorities} compact />
            </Box>
          </Tab>
          <Tab label="Custom tags">
            <Box maxWidth="976px" mx="auto" mt="x3">
              <Flex justifyContent="flex-end" mb="x2">
                <IconicButton icon="add" onClick={handleCreateTag}>
                  New custom tag
                </IconicButton>
              </Flex>
              <Table columns={customTagColumns} rows={customTags} compact />
            </Box>
          </Tab>
        </Tabs>

        {/* Edit Priority Sidebar */}
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
                      labelText="Description"
                      pb="x1"
                      helpText="Description will be displayed throughout the application in addition to the priority number."
                    />
                    <Input
                      value={editingPriority.description}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      placeholder="Enter priority description"
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

        {/* Edit Custom Tag Sidebar */}
        <Sidebar
          isOpen={showTagEditSidebar && !!editingTag}
          title="Edit custom tag"
          onClose={handleCancelTagEdit}
          width="400px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          helpText={editingTag ? editingTag.label : undefined}
          footer={
            <Flex gap="x2">
              <PrimaryButton onClick={handleSaveTag}>Save</PrimaryButton>
              <QuietButton onClick={handleCancelTagEdit}>Cancel</QuietButton>
            </Flex>
          }
        >
          {editingTag && (
            <Form>
              <FormSection>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Label" pb="x1" />
                    <Input
                      value={editingTag.label}
                      onChange={(e) => handleTagLabelChange(e.target.value)}
                      placeholder="Enter tag label"
                      autoFocus
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Type" pb="x1" />
                    <Select
                      value={editingTag.type}
                      onChange={(value) => handleTagTypeChange(String(value))}
                      options={tagTypeOptions}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel
                      labelText="Status"
                      pb="x1"
                      helpText="Toggle to activate or deactivate the custom tag in the application."
                    />
                    <Toggle
                      toggled={editingTag.status === "Active"}
                      onChange={(e) => handleTagStatusChange(e.target.checked)}
                      onText="Active"
                      offText="Deactivated"
                    />
                  </Field>
                </Box>
              </FormSection>
            </Form>
          )}
        </Sidebar>

        {/* Create New Custom Tag Sidebar */}
        <Sidebar
          isOpen={showCreateTagSidebar}
          title="New custom tag"
          onClose={handleCancelCreateTag}
          width="400px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton onClick={handleSaveNewTag}>Create</PrimaryButton>
              <QuietButton onClick={handleCancelCreateTag}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Label" pb="x1" />
                  <Input
                    value={newTag.label || ""}
                    onChange={(e) => handleNewTagLabelChange(e.target.value)}
                    placeholder="Enter tag label"
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Type" pb="x1" />
                  <Select
                    value={newTag.type || "neutral"}
                    onChange={(value) => handleNewTagTypeChange(String(value))}
                    options={tagTypeOptions}
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Status"
                    pb="x1"
                    helpText="Toggle to activate or deactivate the custom tag in the application."
                  />
                  <Toggle
                    toggled={newTag.status === "Active"}
                    onChange={(e) => handleNewTagStatusChange(e.target.checked)}
                    onText="Active"
                    offText="Deactivated"
                  />
                </Field>
              </Box>
            </FormSection>
          </Form>
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

        {/* Deactivate Priority Confirmation Modal */}
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
              Priority{" "}
              <Text as="span" fontWeight="medium">
                {deactivatingPriority.priority} - {deactivatingPriority.description}
              </Text>{" "}
              is currently assigned to at least one "In progress" PO line item. Deactivating this priority will retain
              its assignment on existing line item(s), but it will no longer be available for new assignments.
            </Text>
          )}
          <Text>Are you sure you want to deactivate this priority?</Text>
        </Modal>

        {/* Deactivate Custom Tag Confirmation Modal */}
        <Modal
          isOpen={showTagDeactivateModal}
          title="Custom tag assigned in a PO line item"
          onRequestClose={handleCancelTagDeactivate}
          footerContent={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={handleConfirmTagDeactivate}>Yes, deactivate tag</PrimaryButton>
              <QuietButton onClick={handleCancelTagDeactivate}>No, cancel</QuietButton>
            </Flex>
          }
        >
          {deactivatingTag && (
            <Text mb="x2">
              Custom tag{" "}
              <Text as="span" fontWeight="medium">
                {deactivatingTag.label} ({deactivatingTag.type})
              </Text>{" "}
              is currently assigned to at least one "In progress" PO line item. Deactivating this tag will retain its
              assignment on existing line item(s), but it will no longer be available for new assignments.
            </Text>
          )}
          <Text>Are you sure you want to deactivate this custom tag?</Text>
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};

export const Default = CustomTagsPage;
