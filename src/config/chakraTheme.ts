import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./chakra-component/styles";
// import { breakpoints } from './chakra-component/breakpooint';
import { buttonStyles } from "./chakra-component/button";
import { badgeStyles } from "./chakra-component/badge";
import { linkStyles } from "./chakra-component/link";
import { drawerStyles } from "./chakra-component/drawerStyles";
import { CardComponent } from "./chakra-component/CardComponent";
import { CardBodyComponent } from "./chakra-component/CardBodyComponent";
import { CardHeaderComponent } from "./chakra-component/CardHeader";
import { MainPanelComponent } from "./chakra-component/MainPanel";
import { PanelContentComponent } from "./chakra-component/PanelContent";
import { PanelContainerComponent } from "./chakra-component/PanelContainer";

export const theme = extendTheme(
  // { breakpoints }, // Breakpoints
  globalStyles,
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
);