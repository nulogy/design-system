# Transfer materials — lot selection modal (design spec)

## Overview

The Transfer Materials modal allows a Production Manager to select which jobs — and, where applicable,
which individual lot codes — should have their subcomponent WIP transferred to the destination job.

The modal is divided into two sections: **Current work order** jobs and **Different work order** jobs.
Each eligible job is displayed as a collapsible card. The user opts jobs in one at a time using a
job-level checkbox, then fine-tunes lot-level selection within each job's subcomponent table.

---

## Layout

```
┌─ Modal ─────────────────────────────────────────────────────────────┐
│ Title: Transfer materials                                            │
├──────────────────────────────────────────────────────────────────────┤
│ [▼ What makes a job eligible to transfer?]   ← collapsible accordion │
│                                                                      │
│ Select the jobs and lots from which you would like to transfer       │
│ eligible subcomponents.                                              │
│                                                                      │
│ Current work order:                                                  │
│ ┌─ Job card ──────────────────────────────────────────────────────┐ │
│ │ [☐] [▲] Job 1042  •  Actual start: …  •  Actual end: …         │ │
│ │ ─────────────────────────────────────────────────────────────── │ │
│ │ [Subcomponent table — visible when card is expanded]            │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ ┌─ Job card ──────────────────────────────────────────────────────┐ │
│ │  …                                                              │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│ Different work order:                                                │
│ ┌─ Job card ──────────────────────────────────────────────────────┐ │
│ │ [☐] [▲] Job 998  •  …  •  Work order WO-2025-0088              │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [Transfer materials]  [Cancel]                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Job cards

### Structure

Each card contains:

- **Job-level checkbox** — opts the job in or out of the transfer.
- **Expand/collapse toggle** (up/down arrow icon button) — shows or hides the subcomponent table.
- **Job metadata** — displayed inline: job number (bold), actual start, actual end (or "In progress").
  For different-WO jobs, work order code is appended.
- **Divider** — separates the header row from the table below.
- **Subcomponent table** — visible only when the card is expanded (animated open/close).

### Default state

All cards start **collapsed and unchecked**. All lot-level checkboxes start **unchecked**.

### Expand/collapse animation

Opening and closing uses a max-height CSS transition with an S-curve easing
(`cubic-bezier(0.37, 0, 0.63, 1)`, 350 ms). The divider and table animate together as one unit.

---

## Job-level checkbox

| State | Appearance | Behaviour |
|---|---|---|
| Unchecked | Empty checkbox | Job is not included in the transfer. Subcomponent lot checkboxes are **disabled** and show their current (preserved) selection state. |
| Checked | Filled checkbox | Job is included. Subcomponent lot checkboxes become **enabled** in whatever selection state they were last in. |

**Checking** a job automatically expands the card if it was collapsed.

**Unchecking** a job disables the lot-level checkboxes but **preserves their selection state**.
Re-checking the job re-enables them exactly as they were left.

The job-level checkbox is **always binary** (checked or unchecked). It never enters an
indeterminate state — lot-level selection granularity is not surfaced here.

The **Transfer materials** button in the modal footer is enabled as soon as at least one job is checked.

---

## Subcomponent table

### Columns

| Column | Notes |
|---|---|
| *(Checkbox)* | Only present when the job has individually selectable lots. No header checkbox. |
| **Eligible subcomponents** | SKU code and description. Displays a validation error icon when applicable (see Submit validation). |
| **Lot code** | Header has an info icon (ⓘ) with a tooltip (see below). |
| **Expiry date** | — |
| **Quantity** | Right-aligned. |

### Column visibility rules

- The **checkbox column** is only rendered when the job contains at least one subcomponent with
  multiple job-tracked lots (i.e. lots that can be individually selected). For jobs where all
  subcomponents are pallet or pallet-FIFO tracked, the checkbox column is hidden entirely.

### Row types

#### 1. Collapsed subcomponent row (pallet / pallet-FIFO, or single-lot job-tracked)

One row per subcomponent. No individual lot detail is shown because the lot cannot be
individually selected.

| Field | Value |
|---|---|
| Eligible subcomponents | `SKU-CODE — Description` (medium weight) |
| Lot code | `--` |
| Expiry date | `--` |
| Quantity | Subcomponent total (summed across all pallet lots; or the single lot quantity) |
| Checkbox | — (none) |

#### 2. Expanded subcomponent — summary row (multi-lot job-tracked)

One summary row per subcomponent, followed by individual lot rows below it.

| Field | Value |
|---|---|
| Eligible subcomponents | `SKU-CODE — Description` (medium weight) |
| Lot code | `--` |
| Expiry date | `--` |
| Quantity | Subcomponent total |
| Checkbox | — (none) |

#### 3. Expanded subcomponent — lot row (multi-lot job-tracked)

One row per individual lot, appearing directly below the summary row.

| Field | Value |
|---|---|
| Eligible subcomponents | *(blank)* |
| Lot code | Lot code value |
| Expiry date | Expiry date, or `--` if none |
| Quantity | *(blank — quantity belongs to the summary row)* |
| Checkbox | Present and interactive (see Lot-level checkboxes below) |

### Dividers

- **Light divider** (`lightGrey`) between lot rows of the same subcomponent.
- **Dark divider** (`grey`) between different subcomponents.
- Dividers span the full width of the table (no horizontal padding).

---

## Lot-level checkboxes

Lot-level checkboxes appear only on lot rows of multi-lot job-tracked subcomponents.

| Job state | Checkbox state | Interactive? |
|---|---|---|
| Unchecked | Reflects preserved selection state (disabled) | No |
| Checked | Reflects current selection state | Yes |

**Default selection:** All lot checkboxes start **unchecked**. When a job is first checked, the
lot checkboxes become enabled but remain unchecked — the user must explicitly select the lots
they want to transfer.

**Selection memory:** If the user checks a job, makes lot selections, then unchecks the job,
the lot selection state is preserved. Re-checking the job restores the lot checkboxes to exactly
the state they were left in.

### Lot code column — info tooltip

The **Lot code** column header displays an ⓘ icon. Hovering it shows a tooltip:

> *"Uncheck any lot codes which have been fully consumed to prevent them from being transferred
> to the job."*

---

## Submit validation

Validation runs when the user clicks **Transfer materials**.

For each checked job, every subcomponent with individually selectable lots must have at least one
lot selected. If any subcomponent has zero lots selected, the submit is blocked and two things
happen simultaneously:

1. **Danger toast** — displayed at the bottom of the modal:
   > *"One or more subcomponents have no lots selected. Please select at least one lot per
   > subcomponent before transferring."*

2. **Inline error icon** — a red error icon (⚠) appears next to the subcomponent name in the
   "Eligible subcomponents" cell of the affected summary row. Hovering it shows a tooltip:
   > *"At least one lot must be selected to transfer this subcomponent."*

**Clearing errors:** All inline error icons clear as soon as the user changes any lot selection.
The user must attempt to submit again for errors to re-appear.

Subcomponents with no individually selectable lots (pallet, pallet-FIFO, single-lot job-tracked)
are not subject to this validation — they are always included when their job is checked.

---

## Different work order section

Jobs from a different work order follow the same card structure with one addition: the work order
code is appended to the job metadata line (e.g. `• Work order WO-2025-0088`).

**Business rule:** Different-WO jobs only ever contain pallet or pallet-FIFO subcomponents
(job-tracked subcomponents are excluded server-side for cross-WO transfers). As a result,
different-WO job cards never show the checkbox column and all subcomponent rows are collapsed.

---

## Eligibility accordion

A collapsible info section at the top of the modal explains which jobs are eligible for transfer.
It is collapsed by default. The trigger is a full-width row with a down/up arrow icon.

---

## Track-by policy reference

| Track-by policy | Individual lot selection? | Lot code / expiry shown? | Checkbox column? | Subject to submit validation? |
|---|---|---|---|---|
| Pallet | No | No (`--`) | No | No |
| Pallet-FIFO | No | No (`--`) | No | No |
| Job — single lot | No | Yes | No | No |
| Job — multiple lots | Yes | Yes | Yes | Yes |
