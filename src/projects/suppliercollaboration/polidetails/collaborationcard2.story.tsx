import React from "react";
import { Text } from "../../..";
import { 
  CollaborationCard2, 
  CollaborationCard2Header, 
  CollaborationCard2Body, 
  CollaborationCard2Footer 
} from "./components/CollaborationCard2";

export default {
  title: "Projects/Supplier Collaboration/POLI details/CollaborationCard2",
  parameters: {
    layout: "fullscreen",
  },
};

export const DefaultCollaborationCard2 = () => {
  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      {/* Awaiting You */}
      <CollaborationCard2 type="awaitingYou">
        <CollaborationCard2Header 
          title="Customer's latest request" 
          meta="by John D. on January 24, 2025"
          icon="edit"
        />
        <CollaborationCard2Body>
          <Text>This card is awaiting your response</Text>
        </CollaborationCard2Body>
        <CollaborationCard2Footer 
          primaryAction="Update proposal"
          onPrimaryAction={() => console.log("Primary action clicked")}
        />
      </CollaborationCard2>

      {/* Awaiting Other Party */}
      <CollaborationCard2 type="awaitingOtherParty">
        <CollaborationCard2Header 
          title="Your latest proposal" 
          meta="by Nick S. on January 23, 2025"
        />
        <CollaborationCard2Body>
          <Text>This card is awaiting the other party's response</Text>
        </CollaborationCard2Body>
        <CollaborationCard2Footer 
          meta="Awaiting customer response"
        />
      </CollaborationCard2>

      {/* Edit Mode */}
      <CollaborationCard2 type="edit">
        <CollaborationCard2Header 
          title="Edit proposal" 
          meta="by Nick S. on January 23, 2025"
        />
        <CollaborationCard2Body>
          <Text>This card is in edit mode</Text>
        </CollaborationCard2Body>
        <CollaborationCard2Footer 
          primaryAction="Submit"
          secondaryAction="Cancel"
          onPrimaryAction={() => console.log("Submit clicked")}
          onSecondaryAction={() => console.log("Cancel clicked")}
        />
      </CollaborationCard2>

      {/* Read Only */}
      <CollaborationCard2 type="readOnly">
        <CollaborationCard2Header 
          title="Customer's original request" 
          meta="by John D. on January 21, 2025"
        />
        <CollaborationCard2Body>
          <Text>This card is read-only</Text>
        </CollaborationCard2Body>
      </CollaborationCard2>

      {/* Label */}
      <CollaborationCard2 type="label">
        <CollaborationCard2Header 
          title="Column Headers" 
        />
        <CollaborationCard2Body>
          <Text>Quantity</Text>
          <Text>UOM</Text>
          <Text>Production due date</Text>
          <Text>Unit price</Text>
          <Text>Currency</Text>
          <Text>Change reason</Text>
          <Text>Change note</Text>
        </CollaborationCard2Body>
      </CollaborationCard2>
    </div>
  );
};

DefaultCollaborationCard2.storyName = "Default"; 