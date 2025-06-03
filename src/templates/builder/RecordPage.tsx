import React from "react";
import {
  Box,
  Flex,
  IconicButton,
  Link,
  Breadcrumbs,
  VerticalDivider,
  Heading2,
  Card,
  Tabs,
  Tab,
} from "../../index";
import { Section, HeaderConfig } from "./types";

interface RecordPageProps {
  headerConfig: HeaderConfig;
  sections: Section[];
  selectedSectionId: string | null;
  containerWidth: string;
  isSidebarOpen: boolean;
  isDetailsSidebarOpen: boolean;
  isCreatingNew: boolean;
  selectedRecord: any;
  onHeaderChange: (changes: Partial<HeaderConfig>) => void;
  onAddSection: () => void;
  onSectionChange: (sectionId: string, changes: Partial<Section>) => void;
  onCloseSidebar: () => void;
  onDetailsEditClick: (record: any) => void;
  onCreateNewClick: () => void;
  onCloseDetailsSidebar: () => void;
  onSaveDetailsChanges: () => void;
}

const RecordPage: React.FC<RecordPageProps> = (props) => {
  const {
    headerConfig,
    sections,
    selectedSectionId,
    containerWidth,
    isSidebarOpen,
    isDetailsSidebarOpen,
    isCreatingNew,
    selectedRecord,
    onHeaderChange,
    onAddSection,
    onSectionChange,
    onCloseSidebar,
    onDetailsEditClick,
    onCreateNewClick,
    onCloseDetailsSidebar,
    onSaveDetailsChanges,
  } = props;

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  const renderHeader = (section: Section) => (
    <Flex justifyContent={section.includeTitle ? "space-between" : "flex-end"} alignItems="center" mb="x2">
      {section.includeTitle && <Heading2 mb="0">{section.title}</Heading2>}
      {section.includeActions &&
        (section.actionType === "groups" ? (
          <Flex gap="x2" alignItems="center" mr="x1">
            <IconicButton icon="add" tooltip="New" onClick={onCreateNewClick}>New</IconicButton>
            <IconicButton icon="print" tooltip="Print">Print</IconicButton>
            <VerticalDivider />
            <IconicButton icon="getApp" tooltip="Import">Import</IconicButton>
            <IconicButton icon="publish" tooltip="Export">Export</IconicButton>
            <VerticalDivider />
            <IconicButton icon="filter" tooltip="Filter">Filter</IconicButton>
          </Flex>
        ) : (
          <IconicButton icon="edit" onClick={() => onSectionChange(section.id, {})}>Edit</IconicButton>
        ))}
    </Flex>
  );

  const renderSection = (section: Section) => {
    const widthProps = section.width === "Centered" ? { maxWidth: section.maxWidth || 1360, mx: "auto" } : {};

    switch (section.type) {
      case "Card":
        return (
          <Card key={section.id} {...widthProps} mb="x3" px="x4" py="x3">
            {renderHeader(section)}
            {section.content}
          </Card>
        );
      case "Tab":
        return (
          <Box key={section.id} {...widthProps} my="x3">
            <Tabs defaultSelectedIndex={0}>
              <Tab label={section.title}>
                <Box pt="x2">
                  {renderHeader(section)}
                  {section.content}
                </Box>
              </Tab>
            </Tabs>
          </Box>
        );
      default:
        return (
          <Box key={section.id} {...widthProps} my="x3" pb="x3">
            {renderHeader(section)}
            {section.content}
          </Box>
        );
    }
  };

  const renderSections = () => {
    const result: React.ReactNode[] = [];
    let i = 0;

    while (i < sections.length) {
      if (sections[i].type === "Tab") {
        // Start a group of Tab sections
        const tabGroup = [];
        let j = i;
        while (j < sections.length && sections[j].type === "Tab") {
          tabGroup.push(sections[j]);
          j++;
        }

        // Get width props from the first tab in the group
        const widthProps = tabGroup[0].width === "Centered" 
          ? { maxWidth: tabGroup[0].maxWidth || 1360, mx: "auto" } 
          : {};

        result.push(
          <Box key={`tab-group-${i}`} {...widthProps} my="x3">
            <Tabs defaultSelectedIndex={0}>
              {tabGroup.map((section) => (
                <Tab key={section.id} label={section.title}>
                  <Box pt="x2">
                    {renderHeader(section)}
                    {section.content}
                  </Box>
                </Tab>
              ))}
            </Tabs>
          </Box>
        );
        i = j;
      } else {
        result.push(renderSection(sections[i]));
        i++;
      }
    }
    return result;
  };

  return (
    <>
      {renderSections()}
    </>
  );
};

export default RecordPage; 