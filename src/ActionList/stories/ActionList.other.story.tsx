import React, { useState } from "react";
import {
  ActionList,
  ActionListButton,
  ActionListLabel,
  ActionListMenu,
  ActionListGroup,
  ActionListItem,
  ActionListCheckbox,
  ActionListDivider,
  ActionSubList,
  ActionSubListButton,
  ActionSubListMenu,
  ActionListRadioGroup,
  ActionListRadioItem,
} from "..";

export default {
  title: "Components/ActionList/Other",
  component: ActionList,
};

export const Default = () => {
  const [checkedItem, setCheckedItem] = useState<string | null>("1");
  const [radioItem, setRadioItem] = useState<string | null>("1");

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100vh" }}>
      <ActionList>
        <ActionListButton>Action List</ActionListButton>
        <ActionListMenu>
          <ActionListLabel>Action List Menu Label</ActionListLabel>
          <ActionListItem href="/">Action List Menu Item</ActionListItem>
          <ActionListItem renderAsFragment>
            <div style={{ backgroundColor: "coral", color: "white", padding: "10px", borderRadius: "10px" }}>
              Action List Menu Item
            </div>
          </ActionListItem>

          <ActionListDivider />

          <ActionListGroup title="Group title">
            <ActionListItem onClick={() => alert("clicked")}> Action List Menu Item within a group</ActionListItem>
            <ActionListItem>Action List Menu Item within a group</ActionListItem>
          </ActionListGroup>

          <ActionListDivider />

          <ActionListGroup title="Checkboxes">
            <ActionListCheckbox checked={checkedItem === "1"} onClick={() => setCheckedItem("1")}>
              Checkbox 1
            </ActionListCheckbox>
            <ActionListCheckbox checked={checkedItem === "2"} onClick={() => setCheckedItem("2")}>
              Checkbox 2
            </ActionListCheckbox>
          </ActionListGroup>

          <ActionListDivider />

          <ActionSubList>
            <ActionSubListButton>Action list sub menu</ActionSubListButton>

            <ActionSubListMenu>
              <ActionListLabel>Action List Menu Label</ActionListLabel>
              <ActionListItem href="/">Action List Menu Item</ActionListItem>
              <ActionListItem renderAsFragment>
                <div style={{ backgroundColor: "coral", color: "white", padding: "10px", borderRadius: "10px" }}>
                  Action List Menu Item
                </div>
              </ActionListItem>

              <ActionListDivider />

              <ActionListGroup title="Group title">
                <ActionListItem onClick={() => alert("clicked")}> Action List Menu Item within a group</ActionListItem>
                <ActionListItem>Action List Menu Item within a group</ActionListItem>
              </ActionListGroup>

              <ActionListDivider />

              <ActionListGroup title="Checkboxes">
                <ActionListCheckbox checked={checkedItem === "1"} onClick={() => setCheckedItem("1")}>
                  Checkbox 1
                </ActionListCheckbox>
                <ActionListCheckbox checked={checkedItem === "2"} onClick={() => setCheckedItem("2")}>
                  Checkbox 2
                </ActionListCheckbox>
              </ActionListGroup>

              <ActionListDivider />

              <ActionListGroup title="Radio buttons">
                <ActionListRadioGroup value={radioItem}>
                  <ActionListRadioItem value="1" onClick={() => setRadioItem("1")}>
                    Radio button 1
                  </ActionListRadioItem>
                  <ActionListRadioItem value="2" onClick={() => setRadioItem("2")}>
                    Radio button 2
                  </ActionListRadioItem>
                </ActionListRadioGroup>
              </ActionListGroup>
            </ActionSubListMenu>
          </ActionSubList>

          <ActionListDivider />

          <ActionListGroup title="Radio buttons">
            <ActionListRadioGroup value={radioItem}>
              <ActionListRadioItem value="1" onClick={() => setRadioItem("1")}>
                Radio button 1
              </ActionListRadioItem>
              <ActionListRadioItem value="2" onClick={() => setRadioItem("2")}>
                Radio button 2
              </ActionListRadioItem>
            </ActionListRadioGroup>
          </ActionListGroup>
        </ActionListMenu>
      </ActionList>
    </div>
  );
};
