import React, { useState } from "react";
import {
  ApplicationFrame,
  Header,
  Page,
  Box,
  Flex,
  Text,
  Heading3,
  Heading4,
  Input,
  Select,
  Checkbox,
  Radio,
  Button,
  Form,
  FormSection,
  Field,
  FieldLabel,
  Divider,
  Breadcrumbs,
  Link,
  BrandedNavBar,
  Alert,
  NDSProvider,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Dual acceptance/Organization settings",
};

const DefaultComponent = () => {
  const [organizationName, setOrganizationName] = useState("0 - new org and then some aasd");
  const [organizationCode, setOrganizationCode] = useState("Oneworg");
  const [timeZone, setTimeZone] = useState("(GMT-05:00) Eastern Time (US & Canada)");
  const [logoFile, setLogoFile] = useState(null);

  // Module access states
  const [enableInvoices, setEnableInvoices] = useState(true);
  const [enableOrderManagement, setEnableOrderManagement] = useState(false);
  const [enableOrderCollaboration, setEnableOrderCollaboration] = useState(false);
  const [enableCapacityManagement, setEnableCapacityManagement] = useState(false);
  const [enableScorecards, setEnableScorecards] = useState(false);
  const [enableMaterialsOverview, setEnableMaterialsOverview] = useState(true);
  const [enableInventoryReconciliation, setEnableInventoryReconciliation] = useState(false);
  const [enableNotificationsForNewUsers, setEnableNotificationsForNewUsers] = useState(false);

  // Order management module configuration
  const [collaborationAcceptanceModel, setCollaborationAcceptanceModel] = useState("standard");

  // In-transit configuration
  const [inTransitShipmentCSV, setInTransitShipmentCSV] = useState("No Validation");

  // Items configuration
  const [enableItemSpec, setEnableItemSpec] = useState(false);

  // BOM explosion configuration
  const [bomExplosionMethod, setBomExplosionMethod] = useState("full-tree");
  const [enableItemLevelOverrides, setEnableItemLevelOverrides] = useState(false);

  // Shop Floor integration
  const [enableShopFloorDataModelAlignment, setEnableShopFloorDataModelAlignment] = useState(false);

  // Nulogy configuration
  const [createIntegrationEvents, setCreateIntegrationEvents] = useState(true);
  const [quickSightDashboardId, setQuickSightDashboardId] = useState("");
  const [tenantUID, setTenantUID] = useState("Oneworg_go_eco2-test");

  const breadcrumbs = (
    <Breadcrumbs {...({} as any)}>
      <Link href="#" {...({} as any)}>
        Home
      </Link>
      <Link href="#" {...({} as any)}>
        Organizations
      </Link>
    </Breadcrumbs>
  );

  return (
    <ApplicationFrame {...({} as any)}>
      <Header
        breakpoints={{ medium: 1200 }}
        renderBreadcrumbs={() => breadcrumbs}
        title="Edit Organization"
        {...({} as any)}
      />
      <Page {...({} as any)}>
        <Box maxWidth="800px" mx="auto" p="x4">
          <Form>
            {/* Organization Details */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">Organization Details</Heading3>

              <Field mb="x3">
                <FieldLabel labelText="Name" mb="x1" {...({} as any)} />
                <Input value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
              </Field>

              <Field mb="x3">
                <FieldLabel labelText="Code" mb="x1" {...({} as any)} />
                <Input value={organizationCode} onChange={(e) => setOrganizationCode(e.target.value)} />
              </Field>

              <Field mb="x3">
                <FieldLabel labelText="Time Zone" mb="x1" {...({} as any)} />
                <Select
                  value={timeZone}
                  onChange={(value) => setTimeZone(String(value))}
                  options={[
                    {
                      value: "(GMT-05:00) Eastern Time (US & Canada)",
                      label: "(GMT-05:00) Eastern Time (US & Canada)",
                    },
                    {
                      value: "(GMT-06:00) Central Time (US & Canada)",
                      label: "(GMT-06:00) Central Time (US & Canada)",
                    },
                    {
                      value: "(GMT-07:00) Mountain Time (US & Canada)",
                      label: "(GMT-07:00) Mountain Time (US & Canada)",
                    },
                    {
                      value: "(GMT-08:00) Pacific Time (US & Canada)",
                      label: "(GMT-08:00) Pacific Time (US & Canada)",
                    },
                  ]}
                />
              </Field>

              <Field mb="x3">
                <FieldLabel labelText="Logo" mb="x1" {...({} as any)} />
                <Box>
                  <input
                    type="file"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    style={{ display: "none" }}
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" style={{ cursor: "pointer" }}>
                    <Button size="small">Choose File</Button>
                  </label>
                  <Text ml="x2" color="midGrey" fontSize="small">
                    {logoFile ? logoFile.name : "No file chosen"}
                  </Text>
                </Box>
              </Field>
            </FormSection>

            <Divider my="x4" />

            {/* Module access */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">Module access</Heading3>
              <Box mb="x2">
                <Checkbox
                  checked={enableInvoices}
                  onChange={(e) => setEnableInvoices(e.target.checked)}
                  labelText="Enable Invoices"
                />
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableOrderManagement}
                  onChange={(e) => setEnableOrderManagement(e.target.checked)}
                  labelText="Enable Order Management"
                />
                {enableOrderManagement && (
                  <Box ml="x4" mt="x1">
                    <Box mb="x1">
                      <Checkbox
                        checked={enableOrderCollaboration}
                        onChange={(e) => setEnableOrderCollaboration(e.target.checked)}
                        labelText="Enable Order Collaboration"
                      />
                    </Box>
                    <Box mb="x1">
                      <Checkbox
                        checked={enableCapacityManagement}
                        onChange={(e) => setEnableCapacityManagement(e.target.checked)}
                        labelText="Enable Capacity Management"
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableScorecards}
                  onChange={(e) => setEnableScorecards(e.target.checked)}
                  labelText="Enable Scorecards"
                />
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableMaterialsOverview}
                  onChange={(e) => setEnableMaterialsOverview(e.target.checked)}
                  labelText="Enable Materials Overview"
                />
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableInventoryReconciliation}
                  onChange={(e) => setEnableInventoryReconciliation(e.target.checked)}
                  labelText="Enable Inventory Reconciliation"
                />
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableNotificationsForNewUsers}
                  onChange={(e) => setEnableNotificationsForNewUsers(e.target.checked)}
                  labelText="Enable Notifications for new users (all notifications from all brands)"
                />
              </Box>
            </FormSection>

            <Divider my="x4" />

            {/* Order management module configuration */}
            <FormSection>
              <Heading3 mb="x2">Order management configuration</Heading3>
              <Heading4 mb="x2">Collaboration acceptance model</Heading4>

              <Box mb="x3">
                <Radio
                  name="collaborationAcceptanceModel"
                  value="standard"
                  checked={collaborationAcceptanceModel === "standard"}
                  onChange={(e) => setCollaborationAcceptanceModel(e.target.value)}
                  labelText="Single acceptance"
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  With this method, accepting a proposal always updates the requested values.
                </Text>
              </Box>

              <Box mb="x3">
                <Radio
                  name="collaborationAcceptanceModel"
                  value="dual"
                  checked={collaborationAcceptanceModel === "dual"}
                  onChange={(e) => setCollaborationAcceptanceModel(e.target.value)}
                  labelText="Dual acceptance"
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  With this method, the user can choose whether accepting a proposal updates or retains the requested values.
                </Text>
              </Box>

              <Text mb="x3" color="midGrey" fontSize="small">
                This configuration setting is only available
                to customer organizations. Supplier organizations are automatically assigned the acceptance model based on their customer's selection.
              </Text>
            </FormSection>

            <Divider my="x4" />

            {/* In-transit configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">In-transit configuration</Heading3>

              <Field mb="x3">
                <FieldLabel labelText="In Transit Shipment CSV import" mb="x1" {...({} as any)} />
                <Select
                  value={inTransitShipmentCSV}
                  onChange={(value) => setInTransitShipmentCSV(String(value))}
                  options={[
                    { value: "No Validation", label: "No Validation" },
                    { value: "Basic Validation", label: "Basic Validation" },
                    { value: "Full Validation", label: "Full Validation" },
                  ]}
                />
              </Field>
            </FormSection>

            <Divider my="x4" />

            {/* Items configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">Items configuration</Heading3>

              <Box mb="x2">
                <Checkbox
                  checked={enableItemSpec}
                  onChange={(e) => setEnableItemSpec(e.target.checked)}
                  labelText="Enable Item Spec"
                />
              </Box>
            </FormSection>

            <Divider my="x4" />

            {/* BOM explosion configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">BOM explosion configuration</Heading3>

              <Text mb="x2" color="midGrey" fontSize="small">
                Determines how the system calculates material requirements from the BOM.
              </Text>

              <Box mb="x3" p="x2" backgroundColor="lightYellow" borderRadius="medium">
                <Text fontSize="small" fontWeight="bold" color="warning">
                  WARNING: Once item-level overrides are enabled, the selected BOM explosion method will only apply to
                  newly created items. If item-level overrides remain disabled, the BOM explosion method applies to both
                  existing and new items.
                </Text>
              </Box>

              <Box>
                <Box mb="x3">
                  <Radio
                    name="bomExplosionMethod"
                    value="full-tree"
                    checked={bomExplosionMethod === "full-tree"}
                    onChange={(e) => setBomExplosionMethod(e.target.value)}
                    labelText="Full-tree BOM explosion"
                  />
                  <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                    Explodes the BOM through all levels. Ensures full material requirement coverage when PO line items
                    are not issued for subassemblies.
                  </Text>
                </Box>

                <Box mb="x3">
                  <Radio
                    name="bomExplosionMethod"
                    value="single-level"
                    checked={bomExplosionMethod === "single-level"}
                    onChange={(e) => setBomExplosionMethod(e.target.value)}
                    labelText="Single-level BOM explosion"
                  />
                  <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                    Explodes only the first level of the BOM specified on PO line item. Prevents double-counting when PO
                    line items exist for both finished goods and their subassemblies.
                  </Text>
                </Box>
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableItemLevelOverrides}
                  onChange={(e) => setEnableItemLevelOverrides(e.target.checked)}
                  labelText="Enable item-level overrides"
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  Allows individual items to use a different explosion method than the default. WARNING: Once enabled,
                  this setting cannot be disabled, and the BOM explosion method cannot be changed.
                </Text>
              </Box>
            </FormSection>

            <Divider my="x4" />

            {/* Shop Floor integration configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">Shop Floor integration configuration</Heading3>

              <Box mb="x3" p="x2" backgroundColor="lightYellow" borderRadius="medium">
                <Text fontSize="small" color="midGrey">
                  Only enable if the supplier is already integrated with Shop Floor
                </Text>
              </Box>

              <Box mb="x1">
                <Checkbox
                  checked={enableShopFloorDataModelAlignment}
                  onChange={(e) => setEnableShopFloorDataModelAlignment(e.target.checked)}
                  labelText="Enable Shop Floor data model alignment"
                />
              </Box>
            </FormSection>

            <Divider my="x4" />

            {/* Nulogy configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">Nulogy configuration</Heading3>

              <Box mb="x3">
                <Checkbox
                  checked={createIntegrationEvents}
                  onChange={(e) => setCreateIntegrationEvents(e.target.checked)}
                  labelText="Create integration events"
                />
              </Box>

              <Field mb="x3">
                <FieldLabel labelText="QuickSight Dashboard ID" mb="x1" {...({} as any)} />
                <Input
                  value={quickSightDashboardId}
                  onChange={(e) => setQuickSightDashboardId(e.target.value)}
                  placeholder="Enter QuickSight Dashboard ID"
                />
              </Field>

              <Box mt="x2" p="x2" backgroundColor="lightYellow" borderRadius="medium">
                <Text fontSize="small" fontWeight="bold" color="warning">
                  Warning: changing this value will erase the user saved controls for the scorecards page.
                </Text>
              </Box>

              <Field mb="x3" mt="x3">
                <FieldLabel labelText="Tenant UID" mb="x1" {...({} as any)} />
                <Input value={tenantUID} onChange={(e) => setTenantUID(e.target.value)} />
              </Field>
            </FormSection>

            {/* Action Buttons */}
            <Flex justifyContent="flex-end" gap="x2" mt="x6" style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Button>Cancel</Button>
              <Button>Save</Button>
            </Flex>
          </Form>
        </Box>
      </Page>
    </ApplicationFrame>
  );
};

export const Default = () => (
  <NDSProvider locale="en_US" variant="desktop" {...({} as any)}>
    <DefaultComponent />
  </NDSProvider>
);
