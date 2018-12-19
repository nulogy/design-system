> Table structures data into a grid making data easier to understand and compare.

```image
src: "/table/basic.png"
```

##### Design

## Anatomy
```image
src: "/table/anatomy.png"
```

## General/accessibility guidelines

### Proportional sizing

Use proportional sizing rather than absolute to help a table be more accessible as well by allowing the cells to grow to accommodate content when enlarging text.

## Additional funcionality

### Pagination
Pagination allows content of table to be broken down into smaller more digestable pieces. (More information: Pagination component)
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
The table can be customized by
- applying search criteria
- applying filters
- and customizing the table view by selecting columns and number of rows to be dispalyed
(More information: Table customization component)

```image
src: "/table/customization-bar.png"
```

### Drag and drop
Drag and drop funcionality allows rows of to be order in customized way.
```image
src: "/table/drag-and-drop.png"
```
*Animation coming soon*

### Multi-select
Multi-select allows multiple row to be selected at the same time making batch editing possible.
```image
src: "/table/multi-select.png"
```

### Edit mode
Edit mode allows users to make edits across multiple collumns and submit the changes through a single server request.
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

- Table customization bar
- Table actions
- Pagination
- Dropdown component
