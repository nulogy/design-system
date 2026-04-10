import { setProjectAnnotations } from "@storybook/react-vite";
import { MotionGlobalConfig } from "framer-motion";
import { beforeAll } from "vitest";
import * as previewAnnotations from "./preview";

// Skip framer-motion animations in tests so assertions don't race against WAAPI transitions
MotionGlobalConfig.skipAnimations = true;

// Apply Storybook's global decorators/parameters (NDSProvider, etc.) to all story tests
const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);
