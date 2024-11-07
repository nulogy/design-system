import React from "react";
import { Box } from "../Box";
import { Button } from "../Button";
import { FormSection, Form } from "../Form";
import { Input } from "../Input";
import { BottomSheet } from "./BottomSheet";

export default {
  title: "Components/BottomSheet",
};

export const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box>
      <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>

      <BottomSheet isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <Form>
          <FormSection title="Personal Information">
            <Input id="name" labelText="Name" />
            <Input
              id="birthdate"
              placeholder="DD-MM-YYYY"
              labelText="Date of birth"
              requirementText="(Optional)"
              helpText="Enter a date below"
            />
            <Input id="birthplace" labelText="Place of birth" requirementText="(Optional)" />
          </FormSection>
          <FormSection title="General Information">
            <Input id="gender" labelText="Gender" />
            <Input id="occupation" labelText="Occupation" />
          </FormSection>
          <FormSection title="Personal Information">
            <Input id="name" labelText="Name" />
            <Input
              id="birthdate"
              placeholder="DD-MM-YYYY"
              labelText="Date of birth"
              requirementText="(Optional)"
              helpText="Enter a date below"
            />
            <Input id="birthplace" labelText="Place of birth" requirementText="(Optional)" />
          </FormSection>
          <FormSection title="General Information">
            <Input id="gender" labelText="Gender" />
            <Input id="occupation" labelText="Occupation" />
          </FormSection>
        </Form>
      </BottomSheet>
    </Box>
  );
};
