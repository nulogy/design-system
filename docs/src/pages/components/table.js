import React from "react";
import { Helmet } from "react-helmet";
import { Box, SectionTitle, Title } from "@nulogy/components";
import {
  DocText as Text, Layout, Intro, DocSection, Image,
} from "../../components";
import basic from "../../images/tables/basic.png";
import actions from "../../images/tables/actions.png";
import dragAndDrop from "../../images/tables/drag-and-drop.png";
import edit from "../../images/tables/edit.png";
import multiselect from "../../images/tables/multi-select.png";
import pagination from "../../images/tables/pagination.png";
import sorting from "../../images/tables/sorting.png";
import expandableRowExpanded from "../../images/tables/expandable-row-expanded.png";
import expandableRowCollapsed from "../../images/tables/expandable-row-collapsed.png";

export default () => (
  <Layout>
    <Helmet>
      <title>Table</title>
    </Helmet>
    <Box
      bg="whiteGrey" p={ 5 } borderRadius={ 1 }
      mb={ 6 }
    >
      <Title mb={ 0 }>Table</Title>
      <Intro>Tables structure data into a grid making it easier to understand and compare.</Intro>
    </Box>
    <DocSection>
      <Image src={ basic } alt="Table" />
    </DocSection>
    <DocSection>
      <SectionTitle>Actions</SectionTitle>
      <Text>There are 2 types of actions:</Text>
      <Text mb={ 0 }><strong>Row</strong> actions allow data manipulation within a single row</Text>
      <Text><strong>Table</strong> actions allow actions to be performed on multiple rows or the entire table, e.g Create, Print and Import/Export.</Text>
      <Image src={ actions } alt="Spacing example" style={ { width: "100%" } } />
    </DocSection>
    <DocSection>
      <SectionTitle>Pagination</SectionTitle>
      <Text>Pagination breaks the content of a table into smaller more digestable peices.</Text>
      <Image src={ pagination } alt="Pagination example" style={ { width: "100%" } } />
    </DocSection>
    <DocSection>
      <SectionTitle>Sorting</SectionTitle>
      <Text>Sorting allows users to sort columns in ascending or descending order based on headings.</Text>
      <Image src={ sorting } alt="Sorting example" style={ { width: "100%" } } />
    </DocSection>
    <DocSection>
      <SectionTitle>Table customization bar</SectionTitle>
      <Text>The content of the table can be customized by applying search criteria, applying filters, hiding and showing specific columns, and changing the number of rows displayed per page.</Text>
      <Image src={ actions } alt="Customization bar example" style={ { width: "100%" } } />
    </DocSection>
    <DocSection>
      <SectionTitle>Drag and Drop</SectionTitle>
      <Text>Drag and drop functionality allows users to change a row’s order.</Text>
      <Image src={ dragAndDrop } alt="Drag and drop example" style={ { width: "100%" } } />
    </DocSection>
    <DocSection>
      <SectionTitle>Expandable rows</SectionTitle>
      <Text>Rows of the table can expand and collapse allowing non-essential information to reside in the collapsible portion of the row.</Text>
      <Image src={ expandableRowCollapsed } alt="Expandable example - collapsed row" style={ { width: "100%", marginBottom: "8px" } } />
      <Text fontSize="small">Collapsed rows</Text>
      <Image src={ expandableRowExpanded } alt="Expandable example - expanded row" style={ { width: "100%", marginBottom: "8px" } } />
      <Text fontSize="small">Expanded row</Text>
    </DocSection>
    <DocSection>
      <SectionTitle>Multi-select</SectionTitle>
      <Text>Multi-select allows multiple rows to be selected at the same time for batch editing.</Text>
      <Image src={ multiselect } alt="Multiselect example" style={ { width: "100%" } } />
    </DocSection>
    <DocSection>
      <SectionTitle>Edit Mode</SectionTitle>
      <Text>Edit mode allows users to make edits across multiple columns and submit all the changes at once through a single server request.</Text>
      <Image src={ edit } alt="Edit mode example" style={ { width: "100%" } } />
    </DocSection>
  </Layout>
);
