import { Box, Inbox } from "lucide-react";

import { AnalysisSVG } from "@/assets/icons/analysis";
import { HomeSVG } from "@/assets/icons/home";

import { routes } from "./routes";

export const routeIcons = {
  [routes.HOME]: HomeSVG,
  [routes.INBOX]: Inbox,
  [routes.MARKETS]: Box,
  [routes.SCREENING]: AnalysisSVG,
};
