import React from "react";
import {
  ApplicationFrame,
  Card,
  CardSet,
  DescriptionDetails,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
  Icon,
  Link,
  Page,
  StatusIndicator,
  Tooltip,
  TopBar,
} from "../index";
import { Heading4, Text } from "../Type";
import TruncatedText from "../TruncatedText/TruncatedText";
import { menuItems } from "../TopBar/stories/fixtures";

export default {
  title: "Components/Card",
};

export const _Card = () => <Card>I am a card.</Card>;

export const CustomCard = () => (
  <Card bg="black" color="white" borderRadius="small" p="x1">
    I am a custom card.
  </Card>
);

CustomCard.story = {
  name: "Custom card",
};

export const Cardset = () => (
  <CardSet>
    <Card>I am a 1st card in a cardset.</Card>
    <Card>I am a 2nd card in a cardset.</Card>
    <Card>I am a 3rd card in a cardset.</Card>
  </CardSet>
);

function AdvancedCard() {
  return (
    <Card>
      <Heading4>POLI-2304</Heading4>
      <DescriptionList>
        <DescriptionGroup>
          <DescriptionTerm>Customer</DescriptionTerm>
          <DescriptionDetails>Nulogy</DescriptionDetails>
        </DescriptionGroup>
        <DescriptionGroup>
          <DescriptionTerm>
            <Text display="inline-flex" alignItems="center">
              Order number
              <Tooltip tooltip="The unique identifier assigned to this order when it was placed by the customer.">
                <Icon icon="info" size="x3" paddingLeft="half" />
              </Tooltip>
            </Text>
          </DescriptionTerm>
          <DescriptionDetails>
            <Link href="/customer-details">P12-90381-2039</Link>
          </DescriptionDetails>
        </DescriptionGroup>
        <DescriptionGroup>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <StatusIndicator type="success">Paid</StatusIndicator>
          </DescriptionDetails>
        </DescriptionGroup>
        <DescriptionGroup>
          <DescriptionTerm>Amount</DescriptionTerm>
          <DescriptionDetails>$202.12</DescriptionDetails>
        </DescriptionGroup>
        <DescriptionGroup>
          <DescriptionTerm>Notes</DescriptionTerm>
          <DescriptionDetails>
            <TruncatedText fontSize="small" maxCharacters={200}>
              Due to severe weather disruptions and unforeseen logistical challenges, this shipment has been
              significantly delayed. The warehouse manager reported that mechanical issues with the transport vehicles
              coupled with a shortage of available staff, have extended processing times at the loading dock.
              Additionally, mandatory safety inspections and inventory verifications required extra time, further
              postponing the dispatch schedule. His detailed notes also mention that alternate transportation
              arrangements are being evaluated and urge all stakeholders to stay in close communication for updated
              delivery timelines.
            </TruncatedText>
          </DescriptionDetails>
        </DescriptionGroup>
      </DescriptionList>
    </Card>
  );
}

export const AdvancedUsage = () => {
  return (
    <ApplicationFrame
      navBar={
        <TopBar.Root>
          <TopBar.BackLink href="/cycle-counts">Cycle counts</TopBar.BackLink>
          <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
          <TopBar.Menu>
            {menuItems.map((props) => (
              <TopBar.MenuItem key={props.title}>
                <TopBar.MenuItemLink {...props} />
              </TopBar.MenuItem>
            ))}
          </TopBar.Menu>
        </TopBar.Root>
      }
    >
      <Page fullHeight>
        <CardSet>
          {[...Array(10)].map((_, i) => (
            <AdvancedCard key={i} />
          ))}
        </CardSet>
      </Page>
    </ApplicationFrame>
  );
};

AdvancedUsage.parameters = {
  layout: "fullscreen",
};
