import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "./preview";

// Apply Storybook's global decorators/parameters (NDSProvider, etc.) to all story tests
const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);
