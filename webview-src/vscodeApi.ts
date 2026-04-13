import { OutgoingMessage } from "./types";

declare global {
  interface Window {
    acquireVsCodeApi: () => { postMessage: (message: OutgoingMessage) => void };
  }
}

const vscodeApi = window.acquireVsCodeApi();

export const postToExtension = (message: OutgoingMessage): void => {
  vscodeApi.postMessage(message);
};
