import React, { useState } from "react";
import {
  ApplicationFrame,
  Header,
  Page,
  Box,
  Flex,
  Text,
  Heading2,
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
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Org Settings with Order Management",
};

export const OrgSettingsWithOrderManagement = () => {
  const [organizationName, setOrganizationName] = useState("American Wood Fiber");
  const [organizationCode, setOrganizationCode] = useState("7050017");
  const [timeZone, setTimeZone] = useState("(GMT-05:00) Eastern Time (US & Canada)");
  const [logoFile, setLogoFile] = useState(null);

  // Module access states
  const [enableInvoices, setEnableInvoices] = useState(true);
  const [enableOrderManagement, setEnableOrderManagement] = useState(true);
  const [enableOrderCollaboration, setEnableOrderCollaboration] = useState(true);
  const [enableCapacityManagement, setEnableCapacityManagement] = useState(false);
  const [enableOrderTracking, setEnableOrderTracking] = useState(true);
  const [enableScorecards, setEnableScorecards] = useState(false);
  const [enableMaterialsOverview, setEnableMaterialsOverview] = useState(true);
  const [enableHistoricalOrders, setEnableHistoricalOrders] = useState(true);
  const [enableInventoryReconciliation, setEnableInventoryReconciliation] = useState(false);
  const [enableNotificationsForNewUsers, setEnableNotificationsForNewUsers] = useState(false);

  // In-transit configuration
  const [inTransitShipmentCSV, setInTransitShipmentCSV] = useState("No Validation");

  // BOM explosion configuration
  const [bomExplosionMethod, setBomExplosionMethod] = useState("full-tree");
  const [enableItemLevelOverrides, setEnableItemLevelOverrides] = useState(false);

  // Order management configuration
  const [lotCodeMode, setLotCodeMode] = useState("simplified");
  const [poLineItemsTraceability, setPoLineItemsTraceability] = useState(["supplier", "customer"]);
  const [poLineItemDetailsTraceability, setPoLineItemDetailsTraceability] = useState(["supplier", "customer"]);
  const [inTransitDeliveryTraceability, setInTransitDeliveryTraceability] = useState(["supplier", "customer"]);
  const [inventorySummaryTraceability, setInventorySummaryTraceability] = useState(["supplier", "customer"]);

  // Shop Floor integration
  const [enableShopFloorDataModelAlignment, setEnableShopFloorDataModelAlignment] = useState(false);

  // Nulogy configuration
  const [createIntegrationEvents, setCreateIntegrationEvents] = useState(true);
  const [quickSightDashboardId, setQuickSightDashboardId] = useState("");

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">Organizations</Link>
    </Breadcrumbs>
  );

  return (
    <ApplicationFrame>
      <Header breakpoints={{ medium: 1200 }} renderBreadcrumbs={() => breadcrumbs} title="Create organization" />
      <Page>
        <Box maxWidth="800px" mx="auto" p="x4">
          <Form>
            {/* Organization Details */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">Organization Details</Heading3>

              <Field mb="x3">
                <FieldLabel labelText="Name" mb="x1" />
                <Input value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
              </Field>

              <Field mb="x3">
                <FieldLabel labelText="Code" mb="x1" />
                <Input value={organizationCode} onChange={(e) => setOrganizationCode(e.target.value)} />
              </Field>

              <Field mb="x3">
                <FieldLabel labelText="Time Zone" mb="x1" />
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
                <FieldLabel labelText="Logo" mb="x1" />
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
              </Box>

              <Box mb="x2">
                <Checkbox
                  checked={enableOrderCollaboration}
                  onChange={(e) => setEnableOrderCollaboration(e.target.checked)}
                  labelText="Enable Order Collaboration"
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
                    <Box mb="x1">
                      <Checkbox
                        checked={enableOrderTracking}
                        onChange={(e) => setEnableOrderTracking(e.target.checked)}
                        labelText="Enable Order Tracking"
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
                  checked={enableHistoricalOrders}
                  onChange={(e) => setEnableHistoricalOrders(e.target.checked)}
                  labelText="Enable Historical Orders"
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

            {/* In-transit configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading3 mb="x3">In-transit configuration</Heading3>

              <Field mb="x3">
                <FieldLabel labelText="In Transit Shipment CSV import" mb="x1" />
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

            {/* BOM explosion configuration */}
            <FormSection style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Heading4 mb="x3">BOM explosion configuration</Heading4>

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
                  Allows individual items to use a different explosion method than the default.
                </Text>
                <Box ml="x3" mt="quarter" p="x2" backgroundColor="lightYellow" borderRadius="medium">
                  <Text fontSize="small" fontWeight="bold" color="warning">
                    WARNING: Once enabled, this setting cannot be disabled.
                  </Text>
                </Box>
              </Box>
            </FormSection>

            <Divider my="x4" />

            {/* Lot code configuration */}
            <FormSection>
              <Heading3>Lot code field configuration</Heading3>
              <Text mb="x1_5" color="midGrey" fontSize="small">
                Defines how lot codes are structured and managed within the system.
              </Text>

              <Box mb="x1_5">
                <Radio
                  name="lotCodeMode"
                  value="simplified"
                  checked={lotCodeMode === "simplified"}
                  onChange={(e) => setLotCodeMode(e.target.value)}
                  labelText="Simplified"
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  Uses a single, universal lot code across all operations. Ideal for straightforward workflows where a
                  single identifier is sufficient for tracking and reporting.
                </Text>
              </Box>

              <Box mb="x1_5">
                <Radio
                  name="lotCodeMode"
                  value="advanced"
                  checked={lotCodeMode === "advanced"}
                  onChange={(e) => setLotCodeMode(e.target.value)}
                  labelText="Advanced"
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  Define separate lot codes for customer, supplier, and vendor tracking and reporting.
                </Text>
              </Box>

              {lotCodeMode === "advanced" && (
                <Box ml="x3" mt="x2">
                  <Divider my="x0_25" />
                  
                  <Box py="x0_25">
                    <Flex alignItems="center" gap="x0_25">
                      <Box width="40%">
                        <FieldLabel
                          labelText="PO line item (production)"
                          hint="PO line items page and PO line item production record"
                        />
                      </Box>
                      <Box width="60%">
                        <Select
                          multiselect
                          value={poLineItemsTraceability}
                          onChange={(value) => setPoLineItemsTraceability(Array.isArray(value) ? value.map(v => String(v)) : [])}
                          options={[
                            { value: "supplier", label: "Supplier" },
                            { value: "customer", label: "Customer" },
                            { value: "vendor", label: "Vendor" },
                          ]}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Divider my="x0_25" />
                  
                  <Box py="x0_25">
                    <Flex alignItems="center" gap="x0_25">
                      <Box width="40%">
                        <FieldLabel
                          labelText="PO line item (consumption)"
                          hint="PO line item production record"
                        />
                      </Box>
                      <Box width="60%">
                        <Select
                          multiselect
                          value={poLineItemDetailsTraceability}
                          onChange={(value) => setPoLineItemDetailsTraceability(Array.isArray(value) ? value.map(v => String(v)) : [])}
                          options={[
                            { value: "supplier", label: "Supplier" },
                            { value: "customer", label: "Customer" },
                            { value: "vendor", label: "Vendor" },
                          ]}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Divider my="x0_25" />
                  
                  <Box py="x0_25">
                    <Flex alignItems="center" gap="x0_25">
                      <Box width="40%">
                        <FieldLabel
                          labelText="In-transit delivery item"
                          hint="Placeholder"
                        />
                      </Box>
                      <Box width="60%">
                        <Select
                          multiselect
                          value={inTransitDeliveryTraceability}
                          onChange={(value) => setInTransitDeliveryTraceability(Array.isArray(value) ? value.map(v => String(v)) : [])}
                          options={[
                            { value: "supplier", label: "Supplier" },
                            { value: "customer", label: "Customer" },
                            { value: "vendor", label: "Vendor" },
                          ]}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Divider my="x0_25" />
                  
                  <Box py="x0_25">
                    <Flex alignItems="center" gap="x0_25">
                      <Box width="40%">
                        <FieldLabel
                          labelText="Inventory summary record"
                          hint="Placeholder"
                        />
                      </Box>
                      <Box width="60%">
                        <Select
                          multiselect
                          value={inventorySummaryTraceability}
                          onChange={(value) => setInventorySummaryTraceability(Array.isArray(value) ? value.map(v => String(v)) : [])}
                          options={[
                            { value: "supplier", label: "Supplier" },
                            { value: "customer", label: "Customer" },
                            { value: "vendor", label: "Vendor" },
                          ]}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Divider my="x0_25" />
                </Box>
              )}
            </FormSection>

            <Divider my="x2" />

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
                <FieldLabel labelText="QuickSight Dashboard ID" mb="x1" />
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
            </FormSection>

            {/* Action Buttons */}
            <Flex justifyContent="flex-end" gap="x2" mt="x6" style={{ filter: "blur(3px)", pointerEvents: "none" }}>
              <Button>Cancel</Button>
              <Button>Create Organization</Button>
            </Flex>
          </Form>
        </Box>
      </Page>
    </ApplicationFrame>
  );
};
