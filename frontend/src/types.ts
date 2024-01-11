import { Stack } from "./lib/stacks";

export enum EditorTheme {
  ESPRESSO = "espresso",
  COBALT = "cobalt",
}

export interface Settings {
  openAiApiKey: string | null;
  openAiBaseURL: string | null;
  screenshotOneApiKey: string | null;
  isImageGenerationEnabled: boolean;
  editorTheme: EditorTheme;
  generatedCodeConfig: Stack;
  // Only relevant for hosted version
  isTermOfServiceAccepted: boolean;
  accessCode: string | null;
}

export enum AppState {
  INITIAL = "INITIAL",
  CODING = "CODING",
  CODE_READY = "CODE_READY",
}

export interface CodeGenerationParams {
  generationType: "create" | "update";
  image: string;
  resultImage?: string;
  history?: string[];
  isImportedFromCode?: boolean;
  authToken?: string;
}

export type FullGenerationSettings = CodeGenerationParams & Settings;
