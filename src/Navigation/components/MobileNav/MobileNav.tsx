import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import { NavigationProps } from "../../Navigation";
import UserMenuComponent from "../UserMenu/UserMenu"; // Import UserMenu components
import {
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuRoot,
 NavigationMenuTrigger,
} from "../shared/components";
import NavigationMenuContent from "../shared/NavigationMenuContent"; // Use the standard content
import { MenuItem, MenuItems, UserMenuItem as UserMenuItemType } from "../../types";
import { AppSwitcherConfig, NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { Divider } from "../../../index";

type MobileNavProps = Omit<NavigationProps, "breakpoint"> & {
 // Make userMenu required or handle its absence
 userMenu: NonNullable<NavigationProps["userMenu"]>;
 appSwitcher: AppSwitcherConfig; // Ensure appSwitcher type is correct
 primaryNavigation?: MenuItems;
};

// Wrapper for the mobile menu content styling
const MobileMenuContentWrapper = styled(NavigationMenuContent)`
 position: absolute;
 top: calc(100% + ${(props) => props.theme.space.x1}); // Adjust spacing as needed
 right: 0;
 width: 90vw; // Example width
 max-width: 350px; // Example max-width
 padding: 0; // Remove padding, handle inside
 overflow: hidden; // Hide overflow
`;

const MobileMenuInnerContent = styled.div(({ theme }) => ({
 padding: theme.space.x2, // Apply padding here
}));

// Main MobileNav component
export default function MobileNav({ primaryNavigation = [], appSwitcher, userMenu }: MobileNavProps) {
 return (
  <NavigationMenuRoot
   style={{
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    padding: "12px 16px",
    backgroundColor: "white",
    borderBottom: "1px solid #E4E7EB",
   }}
  >
   {/* Left side: App Switcher and Logo */}
   <NavigationMenuList style={{ gap: 0 }}>
    <NulogyAppSwitcher config={appSwitcher} />
    <NavigationMenu.Item>
     <NavigationMenuLink
      style={{
       marginRight: "16px",
       marginLeft: "8px",
       padding: 0, // Remove default padding if logo handles it
       display: "flex",
       alignItems: "center",
      }}
      href="/"
     >
      <Logo />
     </NavigationMenuLink>
    </NavigationMenu.Item>
   </NavigationMenuList>

   {/* Right side: Hamburger Menu */}
   <NavigationMenuList>
    <NavigationMenu.Item>
     {/* Hamburger Trigger */}
     <NavigationMenuTrigger
      style={{
       padding: "8px",
       borderRadius: 9999,
      }}
     >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#434D59" />
      </svg>
     </NavigationMenuTrigger>

     {/* Hamburger Content (Dropdown) */}
     <MobileMenuContentWrapper>
      {/* Use the UserMenu Header */}
      <UserMenuComponent.Header {...userMenu.header} />
      <MobileMenuInnerContent>
       {/* Sub should be direct child of Content */}
       <NavigationMenu.Sub orientation="vertical">
        {/* Radix List wraps all menu items */}
        <NavigationMenu.List style={{ listStyle: "none", padding: 0, margin: 0 }}>
         {/* Render Primary Navigation */}
         {primaryNavigation.map((item) => (
          <MobileMenuItem menuItem={item} key={item.key} />
         ))}

         <NavigationMenu.Item>
          <Divider my="x3" />
         </NavigationMenu.Item>

         {/* Render User Menu Items */}
         {userMenu.menuItems.map((item) => (
          // Use the UserMenuComponent.Item for consistency if possible,
          // or adapt MobileMenuItem to render UserMenuItemType
          <UserMenuComponent.Item key={item.key} item={item} />
          // Alternatively: <MobileMenuItem menuItem={item as any} key={item.key} />
          // Needs adjustment if UserMenuItem structure differs significantly
         ))}
        </NavigationMenu.List>
       </NavigationMenu.Sub>
      </MobileMenuInnerContent>
     </MobileMenuContentWrapper>
    </NavigationMenu.Item>
   </NavigationMenuList>
  </NavigationMenuRoot>
 );
}

// --- Mobile Menu Item Rendering Logic ---

// Styled components for mobile menu items
const MobileLink = styled(NavigationMenu.Link)(({ theme }) => ({
 display: "block",
 color: theme.colors.darkGrey,
 fontFamily: theme.fonts.body,
 fontSize: theme.fontSizes.small, // Consistent font size
 textDecoration: "none",
 fontWeight: theme.fontWeights.medium,
 lineHeight: theme.lineHeights.smallTextBase, // Consistent line height
 padding: `${theme.space.x1_5} 0`, // Consistent padding
 "&:hover, &:focus": {
  backgroundColor: theme.colors.lightBlue,
  outline: "none",
 },
}));

const MobileTrigger = styled(NavigationMenu.Trigger)(({ theme }) => ({
 background: "none",
 border: "none",
 outline: "none",
 userSelect: "none",
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 width: "100%",
 color: theme.colors.darkGrey,
 fontFamily: theme.fonts.body,
 fontSize: theme.fontSizes.small, // Consistent font size
 fontWeight: theme.fontWeights.medium,
 lineHeight: theme.lineHeights.smallTextBase, // Consistent line height
 padding: `${theme.space.x1_5} 0`, // Consistent padding
 textAlign: "left",
 "&:hover, &:focus": {
  backgroundColor: theme.colors.lightBlue,
  outline: "none",
 },
}));

const MobileSubMenuContent = styled(NavigationMenu.Content)(({ theme }) => ({
 // Basic styling for nested content, adjust as needed
 paddingLeft: theme.space.x2, // Indent sub-menu
}));

const MobileSubMenuList = styled(NavigationMenu.List)({
 listStyle: "none",
 padding: 0,
 margin: 0,
});

// Section Header Styling (Not part of Radix structure, render carefully)
const SectionHeader = styled.p(({ theme }) => ({
 color: theme.colors.darkGrey, // Use theme color
 fontFamily: theme.fonts.body,
 fontSize: theme.fontSizes.small, // Use theme size
 fontStyle: "normal",
 fontWeight: theme.fontWeights.bold, // Make it bold
 lineHeight: theme.lineHeights.smallTextBase,
 margin: `${theme.space.x2} 0 ${theme.space.x1} 0`, // Add some margin
 padding: `0`, // No extra padding needed
}));

// Recursive component to render menu items respecting Radix structure
const MobileMenuItem = ({ menuItem }: { menuItem: MenuItem | UserMenuItemType }) => {
 // Need to handle both MenuItem and UserMenuItemType or adapt UserMenu.Item
 const isButtonWithItems = menuItem.type === "button" && !!menuItem.items && menuItem.items.length > 0;

 return (
  // Each item must be wrapped in RadixNavigationMenu.Item
  <NavigationMenu.Item style={{ padding: `0 16px` }}>
   {menuItem.type === "link" && (
    <MobileLink {...menuItem.props}>
     {menuItem.label}
    </MobileLink>
   )}
   {menuItem.type === "button" && !isButtonWithItems && (
    // Simple button (trigger without content)
    <MobileTrigger {...menuItem.props}>
     {menuItem.label}
    </MobileTrigger>
   )}
   {isButtonWithItems && (
    // Button with a submenu
    <>
     <MobileTrigger {...menuItem.props}>
      {menuItem.label}
      {/* Basic caret indicator */}
      <span>▼</span>
     </MobileTrigger>
     {/* Nested Content -> Sub -> List */}
     <MobileSubMenuContent>
      <NavigationMenu.Sub orientation="vertical">
       <MobileSubMenuList>
        {menuItem.items?.map((subItem) => (
         <MobileMenuItem key={subItem.key} menuItem={subItem} />
        ))}
       </MobileSubMenuList>
      </NavigationMenu.Sub>
     </MobileSubMenuContent>
    </>
   )}
   {menuItem.type === "custom" && menuItem.render()}
   {/* Handle UserMenuItem specific types if necessary */}
   {menuItem.type === "render" && (menuItem as UserMenuItemType).render()}
  </NavigationMenu.Item>
 );
};