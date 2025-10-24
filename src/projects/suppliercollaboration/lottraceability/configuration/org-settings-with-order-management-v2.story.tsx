import React, { useState, useEffect } from "react";
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
  Toggle,
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
  Icon,
  Tooltip,
  NDSProvider,
} from "../../../../..";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/Configuration",
};

const V1Component = () => {
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
  const [configurationEnforcedByCustomer, setConfigurationEnforcedByCustomer] = useState(false);
  const [poLineItemsTraceability, setPoLineItemsTraceability] = useState(["supplier"]);
  const [poLineItemDetailsTraceability, setPoLineItemDetailsTraceability] = useState(["supplier"]);
  const [poLineItemSubcomponentTraceability, setPoLineItemSubcomponentTraceability] = useState(["supplier"]);
  const [inTransitDeliveryTraceability, setInTransitDeliveryTraceability] = useState(["supplier"]);
  const [inventorySummaryTraceability, setInventorySummaryTraceability] = useState(["supplier"]);

  // Configuration enforcement settings
  const [enforceConfigurationToPartners, setEnforceConfigurationToPartners] = useState(false);
  const [allowPartnerEnforcement, setAllowPartnerEnforcement] = useState(true);

  // Shop Floor integration
  const [enableShopFloorDataModelAlignment, setEnableShopFloorDataModelAlignment] = useState(false);

  // Nulogy configuration
  const [createIntegrationEvents, setCreateIntegrationEvents] = useState(true);
  const [quickSightDashboardId, setQuickSightDashboardId] = useState("");

  // Handle changes to allowPartnerEnforcement when configuration is already enforced
  useEffect(() => {
    if (configurationEnforcedByCustomer) {
      if (allowPartnerEnforcement) {
        setPoLineItemDetailsTraceability(["supplier", "customer"]);
        setPoLineItemSubcomponentTraceability(["supplier", "customer"]);
        setInTransitDeliveryTraceability(["supplier", "vendor"]);
      } else {
        setPoLineItemDetailsTraceability(["supplier"]);
        setPoLineItemSubcomponentTraceability(["supplier"]);
        setInTransitDeliveryTraceability(["supplier"]);
      }
    }
  }, [allowPartnerEnforcement, configurationEnforcedByCustomer]);

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
              <Heading3 mb="x3">Lot code field configuration</Heading3>

              <Box mb="x1_5" mt="x2">
                <Radio
                  name="lotCodeMode"
                  value="simplified"
                  checked={lotCodeMode === "simplified"}
                  onChange={(e) => setLotCodeMode(e.target.value)}
                  labelText="Simplified"
                  disabled={configurationEnforcedByCustomer}
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
                  disabled={configurationEnforcedByCustomer}
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  Configure separate lot codes for suppliers, customers, and vendors. Ideal for workflows where partners
                  have their own tracking and reporting requirements.
                </Text>
              </Box>

              {lotCodeMode === "advanced" && (
                <Box ml="x3" mt="x2">
                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="PO line item lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={poLineItemsTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPoLineItemsTraceability([...poLineItemsTraceability, "customer"]);
                              } else {
                                setPoLineItemsTraceability(
                                  poLineItemsTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={false}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="PO line item actual production record lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Flex alignItems="center" gap="x0_5">
                            <Checkbox
                              checked={poLineItemDetailsTraceability.includes("customer")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPoLineItemDetailsTraceability([...poLineItemDetailsTraceability, "customer"]);
                                } else {
                                  setPoLineItemDetailsTraceability(
                                    poLineItemDetailsTraceability.filter((item) => item !== "customer")
                                  );
                                }
                              }}
                              labelText="Customer"
                              disabled={configurationEnforcedByCustomer && allowPartnerEnforcement}
                            />
                            {configurationEnforcedByCustomer && allowPartnerEnforcement && (
                              <Tooltip tooltip="Enforced by a partner">
                                <Icon icon="info" size="x2" color="midGrey" />
                              </Tooltip>
                            )}
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="PO line item subcomponent consumption record lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Flex alignItems="center" gap="x0_5">
                            <Checkbox
                              checked={poLineItemSubcomponentTraceability.includes("customer")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPoLineItemSubcomponentTraceability([...poLineItemSubcomponentTraceability, "customer"]);
                                } else {
                                  setPoLineItemSubcomponentTraceability(
                                    poLineItemSubcomponentTraceability.filter((item) => item !== "customer")
                                  );
                                }
                              }}
                              labelText="Customer"
                              disabled={configurationEnforcedByCustomer && allowPartnerEnforcement}
                            />
                            {configurationEnforcedByCustomer && allowPartnerEnforcement && (
                              <Tooltip tooltip="Enforced by a partner">
                                <Icon icon="info" size="x2" color="midGrey" />
                              </Tooltip>
                            )}
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="Inventory summary record lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={inventorySummaryTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInventorySummaryTraceability([...inventorySummaryTraceability, "customer"]);
                              } else {
                                setInventorySummaryTraceability(
                                  inventorySummaryTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={false}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="In-transit delivery item lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={inTransitDeliveryTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInTransitDeliveryTraceability([...inTransitDeliveryTraceability, "customer"]);
                              } else {
                                setInTransitDeliveryTraceability(
                                  inTransitDeliveryTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={false}
                          />
                          <Flex alignItems="center" gap="x0_5">
                            <Checkbox
                              checked={inTransitDeliveryTraceability.includes("vendor")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setInTransitDeliveryTraceability([...inTransitDeliveryTraceability, "vendor"]);
                                } else {
                                  setInTransitDeliveryTraceability(
                                    inTransitDeliveryTraceability.filter((item) => item !== "vendor")
                                  );
                                }
                              }}
                              labelText="Vendor"
                              disabled={configurationEnforcedByCustomer && allowPartnerEnforcement}
                            />
                            {configurationEnforcedByCustomer && allowPartnerEnforcement && (
                              <Tooltip tooltip="Enforced by a partner">
                                <Icon icon="info" size="x2" color="midGrey" />
                              </Tooltip>
                            )}
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x1">
                    <Checkbox
                      checked={enforceConfigurationToPartners}
                      onChange={(e) => setEnforceConfigurationToPartners(e.target.checked)}
                      labelText="Enforce configuration settings on partners"
                    />
                    <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                      When enabled, your configuration settings are applied to partner organizations that have allowed configuration enforcement. This ensures a consistent experience and interface across all connected partners.
                    </Text>
                  </Box>
                </Box>
              )}

              <Divider my="x2" />

              <Box mb="x2">
                <Checkbox
                  checked={allowPartnerEnforcement}
                  onChange={(e) => setAllowPartnerEnforcement(e.target.checked)}
                  labelText="Allow partner configuration enforcement"
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  When enabled, partners can apply their configuration settings to your organization. This may extend, but not override, your existing setup to ensure compliance with their requirements.
                </Text>
              </Box>
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

        {/* Floating Configuration */}
        <Box
          position="fixed"
          bottom="x4"
          left="50%"
          transform="translateX(-50%)"
          backgroundColor="white"
          borderRadius="large"
          boxShadow="elevated"
          px="x2"
          py="x1"
          border="1px solid"
          borderColor="lightGrey"
          zIndex={1000}
        >
          <Flex alignItems="center">
            <Toggle
              labelText="Configuration enforced by customer"
              toggled={configurationEnforcedByCustomer}
              onChange={(e) => {
                setConfigurationEnforcedByCustomer(e.target.checked);
                if (e.target.checked) {
                  setLotCodeMode("advanced");
                  // Set specific traceability options based on requirements
                  setPoLineItemsTraceability(["supplier", "customer"]); // Supplier checked and disabled, Customer checked but not disabled
                  if (allowPartnerEnforcement) {
                    setPoLineItemDetailsTraceability(["supplier", "customer"]); // Supplier checked and disabled, Customer checked and disabled
                    setPoLineItemSubcomponentTraceability(["supplier", "customer"]); // Supplier checked and disabled, Customer checked and disabled
                    setInTransitDeliveryTraceability(["supplier", "vendor"]); // Supplier checked and disabled, Customer unchecked and not disabled, Vendor checked and disabled
                  } else {
                    setPoLineItemDetailsTraceability(["supplier"]); // Customer unchecked and enabled
                    setPoLineItemSubcomponentTraceability(["supplier"]); // Customer unchecked and enabled
                    setInTransitDeliveryTraceability(["supplier"]); // Vendor unchecked and enabled
                  }
                  setInventorySummaryTraceability(["supplier"]); // Supplier checked and disabled, Customer unchecked and not disabled
                } else {
                  // Reset to default when disabled
                  setPoLineItemsTraceability(["supplier"]);
                  setPoLineItemDetailsTraceability(["supplier"]);
                  setPoLineItemSubcomponentTraceability(["supplier"]);
                  setInTransitDeliveryTraceability(["supplier"]);
                  setInventorySummaryTraceability(["supplier"]);
                }
              }}
            />
          </Flex>
        </Box>
      </Page>
    </ApplicationFrame>
  );
};

export const V1 = () => (
  <NDSProvider locale="en_US" variant="desktop">
    <V1Component />
  </NDSProvider>
);

const V2Component = () => {
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
  const [configurationEnforcedByCustomer, setConfigurationEnforcedByCustomer] = useState(false);
  const [poLineItemsTraceability, setPoLineItemsTraceability] = useState(["supplier"]);
  const [poLineItemDetailsTraceability, setPoLineItemDetailsTraceability] = useState(["supplier"]);
  const [poLineItemSubcomponentTraceability, setPoLineItemSubcomponentTraceability] = useState(["supplier"]);
  const [inTransitDeliveryTraceability, setInTransitDeliveryTraceability] = useState(["supplier"]);
  const [inventorySummaryTraceability, setInventorySummaryTraceability] = useState(["supplier"]);

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
              <Heading3 mb="x3">Lot code field configuration</Heading3>

              <Box mb="x1_5" mt="x2">
                <Radio
                  name="lotCodeMode"
                  value="simplified"
                  checked={lotCodeMode === "simplified"}
                  onChange={(e) => setLotCodeMode(e.target.value)}
                  labelText="Simplified"
                  disabled={configurationEnforcedByCustomer}
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
                  disabled={configurationEnforcedByCustomer}
                />
                <Text ml="x3" mt="quarter" color="midGrey" fontSize="small">
                  Configure separate lot codes for suppliers, customers, and vendors. Ideal for workflows where partners
                  have their own tracking and reporting requirements.
                </Text>
              </Box>

              {lotCodeMode === "advanced" && (
                <Box ml="x3" mt="x2">
                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="PO line item lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={poLineItemsTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPoLineItemsTraceability([...poLineItemsTraceability, "customer"]);
                              } else {
                                setPoLineItemsTraceability(
                                  poLineItemsTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={false}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="PO line item actual production record lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={poLineItemDetailsTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPoLineItemDetailsTraceability([...poLineItemDetailsTraceability, "customer"]);
                              } else {
                                setPoLineItemDetailsTraceability(
                                  poLineItemDetailsTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={configurationEnforcedByCustomer}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="PO line item subcomponent consumption record lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={poLineItemSubcomponentTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPoLineItemSubcomponentTraceability([...poLineItemSubcomponentTraceability, "customer"]);
                              } else {
                                setPoLineItemSubcomponentTraceability(
                                  poLineItemSubcomponentTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={configurationEnforcedByCustomer}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="Inventory summary record lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={inventorySummaryTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInventorySummaryTraceability([...inventorySummaryTraceability, "customer"]);
                              } else {
                                setInventorySummaryTraceability(
                                  inventorySummaryTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={false}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  <Divider my="x0_25" />

                  <Box py="x0_25">
                    <Flex alignItems="flex-start" gap="x0_25">
                      <Box width="50%" pt="x1">
                        <FieldLabel labelText="In-transit delivery item lot code" />
                      </Box>
                      <Box width="50%">
                        <Flex flexDirection="column" gap="x0_25">
                          <Checkbox checked={true} disabled={true} labelText="Supplier" />
                          <Checkbox
                            checked={inTransitDeliveryTraceability.includes("customer")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInTransitDeliveryTraceability([...inTransitDeliveryTraceability, "customer"]);
                              } else {
                                setInTransitDeliveryTraceability(
                                  inTransitDeliveryTraceability.filter((item) => item !== "customer")
                                );
                              }
                            }}
                            labelText="Customer"
                            disabled={false}
                          />
                          <Checkbox
                            checked={inTransitDeliveryTraceability.includes("vendor")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInTransitDeliveryTraceability([...inTransitDeliveryTraceability, "vendor"]);
                              } else {
                                setInTransitDeliveryTraceability(
                                  inTransitDeliveryTraceability.filter((item) => item !== "vendor")
                                );
                              }
                            }}
                            labelText="Vendor"
                            disabled={configurationEnforcedByCustomer}
                          />
                        </Flex>
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

export const V2 = () => (
  <NDSProvider locale="en_US" variant="desktop">
    <V2Component />
  </NDSProvider>
);