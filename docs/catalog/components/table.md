> Table structures data into a grid making data easier to understand and compare.

```image
src: "/table/basic.png"
```

##### Design

## General/accessibility guidelines

### Proportional sizing

Use proportional sizing rather than absolute to help a table be more accessible as well by allowing the cells to grow to accommodate content when enlarging text.

## Funcionality

### Actions
There are 2 types of actions:
- Row-level actions that allow data manipulation within a single row, and
- Table level actions that allow actions to be performed on multiple rows or the entire table. Table level actions also include actions such as Create, Print, Import/Export.

(More information: Actions component)

```image
src: "/table/actions.png"
```

### Pagination
Pagination allows the content of the table to be broken down into smaller more digestible pieces. (More information: Pagination component)
```image
src: "/table/pagination.png"
```

### Sorting
Sorting improves usability by allowing users to change the order of the rows based on particular criteria.
```image
src: "/table/sorting.png"
```
*Animation coming soon*

### Table customization bar
The content of the table can be customized by
- Applying search criteria
- Applying filters, and
- Manipulating the table view by selecting custom columns and number of rows to be displayed.
(More information: Table customization component, Search component, Table filter component)

```image
src: "/table/customization-bar.png"
```

### Drag and drop
Drag and drop functionality allows rows of to be ordered in a customized way.
```image
src: "/table/drag-and-drop.png"
```
*Animation coming soon*

### Multi-select
Multi-select allows multiple rows to be selected at the same time making batch editing possible.
```image
src: "/table/multi-select.png"
```

### Edit mode
Edit mode allows users to make edits across multiple columns and submit the changes through a single server request.
```image
src: "/table/edit.png"
```

##### Developement

## Accessibility guidelines

#### Headings
- Always use ` <TH> ` tag for headings

#### Rows and columns
- Use ` <TH scope="row"> ` when the heading is for a row
- Use ` <TH scope="col"> ` when the heading is for a column

#### Cell
- Use ` <TD> ` tag for body content

#### Description
- Use ` <Caption> ` to provide a title or description for the table
- Use ` <Summary> ` to provide additional information about the structure of an unusual table. This tag is rarely used and shouldn't duplicate the caption's content.

#### Pagination
- Make sure to use appropriate aria content for pagination, e.g ` aria-label="Go to page 1" ` for navigation links as well as ` aria-label="Current page, page 3" ` and ` aria-current="page" `
- When an option is disabled, use ` aria-disabled="true" ` and ` tabindex"=-1" `
- Wrap in a ` <nav> ` element, e.g ` <nav aria-label="Pagination Navigation"> `
- Make sure pagination is accessible through keyboard navigation

## Related

- Table customization bar component
- Table actions component
- Pagination component
- Dropdown component
- Search component
- Table filter component
