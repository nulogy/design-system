import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading2,
  Heading3,
  Icon,
  QuietButton,
  PrimaryButton,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Tooltip,
  Select,
  FieldLabel,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  Sidebar,
  Modal,
  ButtonGroup,
  IconicButton,
  VerticalDivider,
  DropdownMenu,
  ToastContainer,
  BrandedNavBar,
  Divider,
  Pagination,
  Tab,
  Tabs,
} from "../../..";
import type { Density } from "../../../DescriptionList/lib/types";

export default {
  title: "Projects/Supplier Collaboration/History log",
  parameters: {
    layout: "fullscreen",
  },
};

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
    <Link href="#">Items</Link>
  </Breadcrumbs>
);

export const Simplified = () => {
  const [selectedIndex, setSelectedIndex] = useState(6);

  return (
    <ApplicationFrame>
      <ToastContainer />
      <BrandedNavBar
        menuData={{
          primaryMenu: [
            { name: "Dashboard", href: "#" },
            { name: "Projects", href: "#" },
            { name: "Settings", href: "#" },
          ],
          secondaryMenu: [
            { name: "Profile", href: "#" },
            { name: "Logout", href: "#" },
          ],
        }}
      />
      <Page title="200283764 - Ugly gloves, marbled chocolate concrete large 4x48" breadcrumbs={breadcrumbs}>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Details">
            <Box p="x4">
              <Text>Details content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Supplier items">
            <Box p="x4">
              <Text>Supplier items content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Bills of materials">
            <Box p="x4">
              <Text>Bills of materials content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Deviations">
            <Box p="x4">
              <Text>Deviations content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Where used">
            <Box p="x4">
              <Text>Where used content goes here</Text>
            </Box>
          </Tab>
          <Tab label="UOM conversion rates">
            <Box p="x4">
              <Text>UOM conversion rates content goes here</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            <Box my="x2" mt="x4">
              <Flex mx="x1" flexDirection="column" maxWidth="1280px" mb="x2">
                <Text>Event / Modification</Text>
                <Text color="midGrey" fontSize="smaller" lineHeight="smallerText">
                  User, date, and time
                </Text>
              </Flex>
              <Divider m="0" />
            </Box>
            <Box mb="x2">
              <Box mx="x1" maxWidth="1280px">
                <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Item number modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          200283764
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          200283765
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Description modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          Ugly gloves, marbled chocolate concrete large 4x48
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          Ugly gloves, marbled chocolate concrete large 4x49
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Materials owner modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          John Smith
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          Jane Doe
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Cost per unit modified
                      </Box>{" "}
                      <Box as="span" fontSize="small" color="black">
                        – Artisan
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          US $18.75
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          US $20.25
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Cost per unit modified
                      </Box>{" "}
                      <Box as="span" fontSize="small" color="black">
                        – KD Services
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          US $22.50
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          US $24.00
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Supplier UOM modified
                      </Box>{" "}
                      <Box as="span" fontSize="small" color="black">
                        – Artisan
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          EA
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          PCS
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Supplier UOM modified
                      </Box>{" "}
                      <Box as="span" fontSize="small" color="black">
                        – Point 1 Display
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          EA
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          PCS
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Supplier UOM modified
                      </Box>{" "}
                      <Box as="span" fontSize="small" color="black">
                        – KD Services
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          EA
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          PCS
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Safety stock modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          100
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          150
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>
                      <Box as="span" color="black">
                        Unit cost modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          US $25.50
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          US $27.75
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>

                <Box mt="x1_5" mb="x2_5">
                  <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                    by
                    <Box as="span" color="black" fontWeight="normal" mx="half">
                      john.smith@something.com
                    </Box>
                    on
                    <Box as="span" color="black" fontWeight="normal" mx="half">
                      January 29th, 2025
                    </Box>
                    at
                    <Box as="span" color="black" fontWeight="normal" mx="half">
                      04:45:03PM
                    </Box>
                  </Text>
                </Box>
              </Box>
              <Divider m="0" />
            </Box>{" "}
            <Box mb="x2">
              <Box mx="x1" maxWidth="1280px">
                <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                  <DescriptionGroup>
                    <DescriptionTerm color="black">
                      <Box as="span" color="black">
                        Item number modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          200283764
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          200283765
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm color="black">
                      <Box as="span" color="black">
                        Description modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          Ugly gloves, marbled chocolate concrete large 4x48
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          Ugly gloves, marbled chocolate concrete large 4x49
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm color="black">
                      <Box as="span" color="black">
                        Materials owner modified
                      </Box>
                    </DescriptionTerm>
                    <DescriptionDetails>
                      <Flex as="span" alignItems="center" gap="half">
                        <Box as="span" color="midGrey">
                          John Smith
                        </Box>
                        <Icon icon="arrowForward" color="grey" size="x2_5" />
                        <Box as="span" color="black">
                          Jane Doe
                        </Box>
                      </Flex>
                    </DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>

                <Box mt="x1_5" mb="x2_5">
                  <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                    by
                    <Box as="span" color="black" fontWeight="normal" mx="half">
                      john.smith@something.com
                    </Box>
                    on
                    <Box as="span" color="black" fontWeight="normal" mx="half">
                      January 29th, 2025
                    </Box>
                    at
                    <Box as="span" color="black" fontWeight="normal" mx="half">
                      04:45:03PM
                    </Box>
                  </Text>
                </Box>
              </Box>
              <Divider m="0" />
            </Box>
            <Pagination currentPage={1} totalPages={10} justifyContent="flex-end" pt="x1" />
          </Tab>
        </Tabs>
      </Page>
    </ApplicationFrame>
  );
};

export const Colourful = () => {
  const [selectedIndex, setSelectedIndex] = useState(6);

  const users = [
    "michael.scott@dundermifflin.com",
    "jim.halpert@dundermifflin.com",
    "pam.beesly@dundermifflin.com",
    "dwight.schrute@dundermifflin.com",
    "angela.martin@dundermifflin.com",
    "kevin.malone@dundermifflin.com",
    "oscar.martinez@dundermifflin.com",
    "stanley.hudson@dundermifflin.com",
    "phyllis.vance@dundermifflin.com",
    "toby.flenderson@dundermifflin.com",
    "ryan.howard@dundermifflin.com",
    "kelly.kapoor@dundermifflin.com",
    "andy.bernard@dundermifflin.com",
    "meredith.palmer@dundermifflin.com",
    "creed.bratton@dundermifflin.com",
  ];

  const generateRandomContent = (index: number) => {
    const suppliers = [
      "Artisan",
      "KD Services",
      "Point 1 Display",
      "Global Manufacturing",
      "Elite Packaging",
      "Premium Supplies",
      "Quality Components",
      "Master Craftsmen",
    ];

    const allTerms = [
      { term: "Status modified", old: "Active", new: "Inactive" },
      { term: "Priority modified", old: "High", new: "Medium" },
      { term: "Category modified", old: `Category ${index}`, new: `Category ${index + 1}` },
      {
        term: "This is an extremely long term that will probably wrap to multiple lines and test the layout's ability to handle long text in the term section modified",
        old: "Short value",
        new: "Another short value",
      },
      {
        term: "Description modified",
        old: "This is a very long description that will definitely wrap to multiple lines. It contains a lot of text to test how the layout handles long content in the description field. We want to make sure it looks good even with extensive content that might be entered by users.",
        new: "This is an even longer new description that will definitely wrap to multiple lines. It contains a lot of text to test how the layout handles long content in the description field. We want to make sure it looks good even with extensive content that might be entered by users. This is additional text to make it even longer.",
      },
      {
        term: "Cost per unit modified",
        supplier: "Artisan",
        old: `US $${(index * 2.5).toFixed(2)}`,
        new: `US $${(index * 2.75).toFixed(2)}`,
      },
      { term: "Supplier UOM modified", supplier: "Artisan", old: "EA", new: "PCS" },
      { term: "Lead time modified", supplier: "Artisan", old: `${index} days`, new: `${index + 2} days` },
      { term: "Minimum order quantity modified", supplier: "Artisan", old: `${index * 5}`, new: `${index * 6}` },
      { term: "Maximum order quantity modified", supplier: "Artisan", old: `${index * 100}`, new: `${index * 120}` },
      { term: "Payment terms modified", supplier: "Artisan", old: "Net 30", new: "Net 45" },
      { term: "Discount rate modified", supplier: "Artisan", old: `${index}%`, new: `${index + 1}%` },
      {
        term: "Cost per unit modified",
        supplier: "KD Services",
        old: `US $${(index * 3.5).toFixed(2)}`,
        new: `US $${(index * 3.75).toFixed(2)}`,
      },
      { term: "Supplier UOM modified", supplier: "KD Services", old: "EA", new: "PCS" },
      { term: "Lead time modified", supplier: "KD Services", old: `${index} days`, new: `${index + 2} days` },
      { term: "Minimum order quantity modified", supplier: "KD Services", old: `${index * 5}`, new: `${index * 6}` },
      {
        term: "Maximum order quantity modified",
        supplier: "KD Services",
        old: `${index * 100}`,
        new: `${index * 120}`,
      },
      { term: "Payment terms modified", supplier: "KD Services", old: "Net 30", new: "Net 45" },
      { term: "Discount rate modified", supplier: "KD Services", old: `${index}%`, new: `${index + 1}%` },
      { term: "Item Number modified", old: `2002837${index}`, new: `2002837${index + 1}` },
      { term: "Description modified", old: `Product ${index} - Standard`, new: `Product ${index} - Premium` },
      { term: "Materials owner modified", old: `Owner ${index}`, new: `Owner ${index + 1}` },
      { term: "Safety stock modified", old: `${index * 10}`, new: `${index * 15}` },
      { term: "Unit cost modified", old: `US $${(index * 3.5).toFixed(2)}`, new: `US $${(index * 3.75).toFixed(2)}` },
      { term: "Quality rating modified", old: `${index}`, new: `${index + 1}` },
      { term: "Production location modified", old: `Location ${index}`, new: `Location ${index + 1}` },
      { term: "Storage requirements modified", old: "Standard", new: "Special" },
      { term: "Shipping method modified", old: "Ground", new: "Express" },
      {
        term: "Supplier contact information modified",
        old: `contact${index}@supplier.com`,
        new: `contact${index + 1}@supplier.com`,
      },
      {
        term: "Long description field that might wrap to multiple lines modified",
        old: `Long value ${index} that might need to be truncated`,
        new: `New long value ${index + 1} that might need to be truncated`,
      },
      ...suppliers.map((supplier) => ({
        term: "Supplier UOM modified",
        supplier,
        old: "EA",
        new: "PCS",
      })),
    ];

    // Special case for index 5 to show all supplier UOM changes
    if (index === 5) {
      return allTerms
        .filter((term) => term.term === "Supplier UOM modified")
        .sort((a, b) => (a.supplier || "").localeCompare(b.supplier || ""))
        .map((item, i) => (
          <DescriptionGroup key={i}>
            <DescriptionTerm>
              <Box as="span" color="black">
                {item.term}
                {item.supplier && (
                  <Box as="span" fontSize="small" color="black">
                    {" "}
                    – {item.supplier}
                  </Box>
                )}
              </Box>
            </DescriptionTerm>
            <DescriptionDetails>
              <Flex as="span" alignItems="center" gap="half">
                <Box as="span" color="midGrey">
                  {item.old}
                </Box>
                <Icon icon="arrowForward" color="grey" size="x2_5" />
                <Box as="span" color="black">
                  {item.new}
                </Box>
              </Flex>
            </DescriptionDetails>
          </DescriptionGroup>
        ));
    }

    // Get random terms based on index
    let selectedTerms = allTerms
      .sort(() => Math.random() - 0.5)
      .slice(0, index % 3 === 0 ? 15 : index % 5 === 0 ? 1 : 5);

    // Sort terms alphabetically by their display text (term + supplier)
    selectedTerms.sort((a, b) => {
      const aText = a.supplier ? `${a.term} – ${a.supplier}` : a.term;
      const bText = b.supplier ? `${b.term} – ${b.supplier}` : b.term;
      return aText.localeCompare(bText);
    });

    return selectedTerms.map((item, i) => (
      <DescriptionGroup key={i}>
        <DescriptionTerm>
          <Box as="span" color="black">
            {item.term}
            {item.supplier && (
              <Box as="span" fontSize="small" color="black">
                {" "}
                – {item.supplier}
              </Box>
            )}
          </Box>
        </DescriptionTerm>
        <DescriptionDetails>
          <Flex as="span" alignItems="center" gap="half">
            <Box as="span" color="midGrey">
              {item.old}
            </Box>
            <Icon icon="arrowForward" color="grey" size="x2_5" />
            <Box as="span" color="black">
              {item.new}
            </Box>
          </Flex>
        </DescriptionDetails>
      </DescriptionGroup>
    ));
  };

  const generateRandomTimestamp = (index: number) => {
    const date = new Date(2025, 0, 29 - index);
    const hours = 15 + index;
    const minutes = (index * 5) % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} at ${formattedHours}:${minutes.toString().padStart(2, "0")}${ampm}`;
  };

  return (
    <ApplicationFrame>
      <ToastContainer />
      <BrandedNavBar
        menuData={{
          primaryMenu: [
            { name: "Dashboard", href: "#" },
            { name: "Projects", href: "#" },
            { name: "Settings", href: "#" },
          ],
          secondaryMenu: [
            { name: "Profile", href: "#" },
            { name: "Logout", href: "#" },
          ],
        }}
      />
      <Page title="200283764 - Ugly gloves, marbled chocolate concrete large 4x48" breadcrumbs={breadcrumbs}>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Details">
            <Box p="x4">
              <Text>Details content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Supplier items">
            <Box p="x4">
              <Text>Supplier items content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Bills of materials">
            <Box p="x4">
              <Text>Bills of materials content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Deviations">
            <Box p="x4">
              <Text>Deviations content goes here</Text>
            </Box>
          </Tab>
          <Tab label="Where used">
            <Box p="x4">
              <Text>Where used content goes here</Text>
            </Box>
          </Tab>
          <Tab label="UOM conversion rates">
            <Box p="x4">
              <Text>UOM conversion rates content goes here</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            <Box my="x2" mt="x4">
              <Flex mx="x1" flexDirection="column" maxWidth="1280px" mb="x2">
                <Text>Event / Modification</Text>
                <Text color="midGrey" fontSize="smaller" lineHeight="smallerText">
                  User, date, and time
                </Text>
              </Flex>
              <Divider m="0" />
            </Box>
            {Array.from({ length: 20 }, (_, index) => (
              <Box key={index} mb="x2">
                <Box mx="x1" maxWidth="1280px">
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    {generateRandomContent(index)}
                  </DescriptionList>
                  <Box mt="x1_5" mb="x2_5">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        {users[index % users.length]}
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        {generateRandomTimestamp(index)}
                      </Box>
                    </Text>
                  </Box>
                </Box>
                <Divider m="0" />
              </Box>
            ))}
            <Pagination currentPage={1} totalPages={10} justifyContent="flex-end" pt="x1" />
          </Tab>
        </Tabs>
      </Page>
    </ApplicationFrame>
  );
};
