import React, { useState } from "react";
import styled from "styled-components";
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
  SelectOption,
  type SelectOptionProps,
  type NDSOption,
  DatePicker,
  Form,
  FormSection,
  Field,
  Checkbox,
  FieldLabel,
  Toggle,
  TruncatedText,
  Textarea,
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
// Enforce top vertical alignment for table cells in this story
const TopAlignedTable = styled.div(() => ({
  "& table td": {
    verticalAlign: "top",
  },
}));

interface WorkOrderPriority {
  id: string;
  priority: number;
  description: string;
  status: "Active" | "Deactivated";
}

interface CustomTag {
  id: string;
  label: string;
  description: string;
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
    {
      id: "1",
      label: "Express shipment",
      description: "Priority shipping for urgent orders",
      type: "quiet",
      status: "Active",
    },
    {
      id: "2",
      label: "Validated for assembly",
      description: "Items that have passed quality checks",
      type: "success",
      status: "Active",
    },
    {
      id: "3",
      label: "This is a very long custom tag label that exceeds 24 characters",
      description:
        "This is a very long description that demonstrates how the textarea handles longer content and wrapping",
      type: "warning",
      status: "Deactivated",
    },
  ]);

  const [editingPriority, setEditingPriority] = useState<WorkOrderPriority | null>(null);
  const [editingTag, setEditingTag] = useState<CustomTag | null>(null);
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [showTagEditSidebar, setShowTagEditSidebar] = useState(false);
  const [showCreateTagSidebar, setShowCreateTagSidebar] = useState(false);
  const [newTag, setNewTag] = useState<Partial<CustomTag>>({
    label: "",
    description: "",
    type: "quiet",
    status: "Active",
  });
  const [isBlankSlate, setIsBlankSlate] = useState(false);
  const [blankSlateCustomTags, setBlankSlateCustomTags] = useState<CustomTag[]>([]);
  const [deactivatingPriority, setDeactivatingPriority] = useState<WorkOrderPriority | null>(null);
  const [deactivatingTag, setDeactivatingTag] = useState<CustomTag | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showTagDeactivateModal, setShowTagDeactivateModal] = useState(false);
  const [labelError, setLabelError] = useState<string>("");
  const [hasValidated, setHasValidated] = useState<boolean>(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [editLabelError, setEditLabelError] = useState<string>("");
  const [createLabelError, setCreateLabelError] = useState<string>("");
  const [editHasValidated, setEditHasValidated] = useState<boolean>(false);
  const [createHasValidated, setCreateHasValidated] = useState<boolean>(false);

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
    // Reset validation state when opening edit sidebar
    setEditHasValidated(false);
    setEditLabelError("");
    setShowValidationAlert(false);
  };

  const handleSavePriority = () => {
    if (editingPriority) {
      updatePriority(editingPriority.id, editingPriority);
      setEditingPriority(null);
      setShowEditSidebar(false);
      toast.success("Priority updated");
    }
  };

  const handleSaveTag = () => {
    if (editingTag) {
      setEditHasValidated(true);
      const error = validateLabel(editingTag.label, editingTag.id);
      if (error) {
        setEditLabelError(error);
        setShowValidationAlert(true);
        return;
      }
      setEditLabelError("");
      setShowValidationAlert(false);
      updateTag(editingTag.id, editingTag);
      setEditingTag(null);
      setShowTagEditSidebar(false);
      toast.success("Custom tag updated");
    }
  };

  const handleCancelEdit = () => {
    setEditingPriority(null);
    setShowEditSidebar(false);
  };

  const handleCancelTagEdit = () => {
    setEditingTag(null);
    setShowTagEditSidebar(false);
    setEditLabelError("");
    setShowValidationAlert(false);
    setEditHasValidated(false);
  };

  const handleCreateTag = () => {
    setShowCreateTagSidebar(true);
    // Reset validation state when opening create sidebar
    setCreateHasValidated(false);
    setCreateLabelError("");
    setShowValidationAlert(false);
  };

  const handleSaveNewTag = () => {
    setCreateHasValidated(true);
    const error = validateLabel(newTag.label);
    if (error) {
      setCreateLabelError(error);
      setShowValidationAlert(true);
      return;
    }

    if (newTag.type && newTag.status) {
      setCreateLabelError("");
      setShowValidationAlert(false);
      const tag: CustomTag = {
        id: String(Date.now()),
        label: newTag.label,
        description: newTag.description || "",
        type: newTag.type,
        status: newTag.status,
      };
      if (isBlankSlate) {
        setBlankSlateCustomTags((prev) => [...prev, tag]);
      } else {
        setCustomTags((prev) => [...prev, tag]);
      }
      setNewTag({ label: "", description: "", type: "quiet", status: "Active" });
      setShowCreateTagSidebar(false);
      toast.success("Custom tag created");
    }
  };

  const handleCancelCreateTag = () => {
    setNewTag({ label: "", description: "", type: "quiet", status: "Active" });
    setShowCreateTagSidebar(false);
    setCreateLabelError("");
    setShowValidationAlert(false);
    setCreateHasValidated(false);
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

  const handleTagLabelBlur = () => {
    if (editingTag) {
      setEditHasValidated(true);
      const error = validateLabel(editingTag.label, editingTag.id);
      setEditLabelError(error);
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

  const handleNewTagLabelBlur = () => {
    setCreateHasValidated(true);
    const error = validateLabel(newTag.label);
    setCreateLabelError(error);
  };

  const handleNewTagTypeChange = (value: string) => {
    setNewTag({ ...newTag, type: value });
  };

  const handleNewTagStatusChange = (isActive: boolean) => {
    setNewTag({ ...newTag, status: isActive ? "Active" : "Deactivated" });
  };

  const handleTagDescriptionChange = (value: string) => {
    if (editingTag) {
      setEditingTag({ ...editingTag, description: value });
    }
  };

  const handleNewTagDescriptionChange = (value: string) => {
    setNewTag({ ...newTag, description: value });
  };

  const validateLabel = (label: string, excludeId?: string): string => {
    if (!label.trim()) {
      return "The field is required.";
    }

    const currentTags = isBlankSlate ? blankSlateCustomTags : customTags;
    const isDuplicate = currentTags.some(
      (tag) => tag.label.toLowerCase() === label.toLowerCase() && tag.id !== excludeId
    );

    if (isDuplicate) {
      return "This label already exists. Please enter a unique label.";
    }

    return "";
  };

  const handleToggleStatus = (priority: WorkOrderPriority) => {
    if (priority.status === "Active") {
      setDeactivatingPriority(priority);
      setShowDeactivateModal(true);
    } else {
      updatePriority(priority.id, { status: "Active" });
      toast.success("Priority activated");
    }
  };

  const handleToggleTagStatus = (tag: CustomTag) => {
    if (tag.status === "Active") {
      setDeactivatingTag(tag);
      setShowTagDeactivateModal(true);
    } else {
      updateTag(tag.id, { status: "Active" });
      toast.success("Custom tag activated");
    }
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingPriority) {
      updatePriority(deactivatingPriority.id, { status: "Deactivated" });
      setDeactivatingPriority(null);
      setShowDeactivateModal(false);
      toast.success("Priority deactivated");
    }
  };

  const handleConfirmTagDeactivate = () => {
    if (deactivatingTag) {
      updateTag(deactivatingTag.id, { status: "Deactivated" });
      setDeactivatingTag(null);
      setShowTagDeactivateModal(false);
      toast.success("Custom tag deactivated");
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
      cellRenderer: (props: { row: WorkOrderPriority }) => {
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
      cellRenderer: (props: { row: WorkOrderPriority }) => {
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
      cellRenderer: (props: { row: WorkOrderPriority }) => {
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
      cellRenderer: (props: { row: WorkOrderPriority }) => (
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
      width: "240px",
      cellRenderer: (props: { row: CustomTag }) => {
        const getStatusIndicatorType = (type: string, status: string) => {
          // Deactivated tags always show as neutral
          return status === "Deactivated" ? "neutral" : (type as any);
        };

        return (
          <Box pl="x0_25" py="x0_75">
            <StatusIndicator type={getStatusIndicatorType(props.row.type, props.row.status)}>
              <TruncatedText maxCharacters={24} fontSize="smaller" lineHeight="smallerText">
                {props.row.label.length > 24 ? `${props.row.label.substring(0, 96)}...` : props.row.label}
              </TruncatedText>
            </StatusIndicator>
          </Box>
        );
      },
    },
    {
      label: "Description",
      dataKey: "description",
      width: "auto",
      cellFormatter: ({ row }: { row: CustomTag }) => (
        <Box py="0">
          <Text color={row.status === "Active" ? undefined : "midGrey"}>{row.description || "-"}</Text>
        </Box>
      ),
    },
    {
      label: "Status",
      dataKey: "status",
      width: "140px",
      cellFormatter: ({ row }: { row: CustomTag }) => (
        <Box py="0">
          <Text color={row.status === "Active" ? undefined : "midGrey"}>{row.status}</Text>
        </Box>
      ),
    },
    {
      label: "",
      dataKey: "actions",
      width: "40px",
      cellRenderer: (props: { row: CustomTag }) => (
        <Box py="0">
          <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />}>
            <DropdownButton onClick={() => handleEditTag(props.row)}>Edit</DropdownButton>
            <Divider my="x1" />
            {props.row.status === "Active" ? (
              <DropdownButton onClick={() => handleToggleTagStatus(props.row)}>Deactivate</DropdownButton>
            ) : (
              <DropdownButton onClick={() => handleToggleTagStatus(props.row)}>Activate</DropdownButton>
            )}
          </DropdownMenu>
        </Box>
      ),
    },
  ];

  const tagTypeOptions = [
    { label: "Neutral", value: "quiet" },
    { label: "Warning", value: "warning" },
    { label: "Error", value: "danger" },
    { label: "Success", value: "success" },
  ];

  // Custom Option component that renders StatusIndicator
  const StatusIndicatorOption = ({ ...props }: SelectOptionProps<NDSOption, false, any>) => {
    return (
      <SelectOption {...props}>
        <StatusIndicator type={props.data.value as any}>{props.data.label}</StatusIndicator>
      </SelectOption>
    );
  };

  return (
    <ApplicationFrame>
      <ToastContainer />
      {navigation}
      <Page fullHeight breadcrumbs={breadcrumbs} title="PO line items">
        <Tabs defaultSelectedIndex={1}>
          <Tab label="Priorities">
            <Box maxWidth="1236px" mx="auto" mt="x3">
              <Table columns={priorityColumns} rows={currentPriorities} compact />
            </Box>
          </Tab>
          <Tab label="Custom tags">
            <Box maxWidth="1236px" mx="auto" mt="x3">
              <Flex justifyContent="flex-end" mb="x2">
                <IconicButton icon="add" onClick={handleCreateTag}>
                  New custom tag
                </IconicButton>
              </Flex>
              <TopAlignedTable>
                <Table
                  columns={customTagColumns}
                  rows={isBlankSlate ? blankSlateCustomTags : customTags}
                  compact
                  noRowsContent="No custom tags have been created yet. Click 'New custom tag' to get started."
                />
              </TopAlignedTable>
            </Box>
          </Tab>
        </Tabs>

        {/* Edit Priority Sidebar */}
        <Sidebar
          isOpen={showEditSidebar && !!editingPriority}
          title="Edit priority"
          onClose={handleCancelEdit}
          width="480px"
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
          width="480px"
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
            <>
              {showValidationAlert && (
                <Box mb="x3">
                  <Alert type="danger" title="Errors prevent the custom tag from being saved">
                    <Text>Please correct the errors and try again.</Text>
                  </Alert>
                </Box>
              )}
              <Form>
                <FormSection>
                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Label" pb="x1" />
                      <Input
                        value={editingTag.label}
                        onChange={(e) => handleTagLabelChange(e.target.value)}
                        onBlur={handleTagLabelBlur}
                        placeholder="Enter tag label"
                        maxLength={96}
                        errorMessage={editHasValidated ? editLabelError : ""}
                      />
                    </Field>
                  </Box>
                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Description" pb="x1" requirementText="(Optional)" />
                      <Textarea
                        value={editingTag.description || ""}
                        onChange={(e) => handleTagDescriptionChange(e.target.value)}
                        placeholder="Enter tag description"
                        rows={3}
                      />
                    </Field>
                  </Box>
                  <Box pb="x3">
                    <Field>
                      <FieldLabel
                        labelText="Type"
                        pb="x1"
                        hint="Type applies only to your organization. Your partners will see the Neutral tag type regardless of your selection."
                      />
                      <Select
                        value={editingTag.type}
                        onChange={(value) => handleTagTypeChange(String(value))}
                        options={tagTypeOptions}
                        components={{
                          Option: StatusIndicatorOption,
                        }}
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
            </>
          )}
        </Sidebar>

        {/* Create New Custom Tag Sidebar */}
        <Sidebar
          isOpen={showCreateTagSidebar}
          title="New custom tag"
          onClose={handleCancelCreateTag}
          width="480px"
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
          {showValidationAlert && (
            <Box mb="x3">
              <Alert type="danger" title="Errors prevent the custom tag from being saved">
                <Text>Please correct the errors and try again.</Text>
              </Alert>
            </Box>
          )}
          <Form>
            <FormSection>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Label" pb="x1" />
                  <Input
                    value={newTag.label || ""}
                    onChange={(e) => handleNewTagLabelChange(e.target.value)}
                    onBlur={handleNewTagLabelBlur}
                    placeholder="Enter tag label"
                    maxLength={96}
                    errorMessage={createHasValidated ? createLabelError : ""}
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Description" pb="x1" requirementText="(Optional)" />
                  <Textarea
                    value={newTag.description || ""}
                    onChange={(e) => handleNewTagDescriptionChange(e.target.value)}
                    placeholder="Enter tag description"
                    rows={3}
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Type"
                    pb="x1"
                    hint="Type applies only to your organization. Your partners will see the Neutral tag type regardless of your selection."
                  />
                  <Select
                    value={newTag.type || "quiet"}
                    onChange={(value) => handleNewTagTypeChange(String(value))}
                    options={tagTypeOptions}
                    components={{
                      Option: StatusIndicatorOption,
                    }}
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
              onText="Blank slate"
              offText="Default"
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
          title="Custom tag assigned to a PO line item"
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
                {deactivatingTag.label}
              </Text>{" "}
              is currently assigned to at least one PO line item. Deactivating this tag will retain its assignment on
              existing line item(s), but it will no longer be available for new assignments.
            </Text>
          )}
          {deactivatingTag && <Text>Are you sure you want to deactivate this custom tag?</Text>}
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};

export const Default = CustomTagsPage;
