import { writable } from "svelte/store";
import { get } from "svelte/store";
import { getBackendUrl } from "$lib/api/optionsApi";

// Program State
export const code = writable("");
export const stdout = writable("");
export const stderr = writable("");
export const stdin = writable("");
export const exitStatus = writable(0);
export const hideStdin = writable(true);
export const selectedConfig = writable(Object());
export const selectedToolchain = writable(Object());
export const selectedProgram = writable(Object());
export const isServerConnected = writable(false);

// Check if the backend server is reachable
export async function checkServerConnection(): Promise<boolean> {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    const connected = response.ok;
    isServerConnected.set(connected);
    return connected;
  } catch (error) {
    console.log("Server connection check failed:", error);
    isServerConnected.set(false);
    return false;
  }
}

// Todo: move to utils.
export function stringToB64(str: string): string {
  try {
    return btoa(str);
  } catch (error) {
    console.error("Base64 encoding failed:", error);
    return "Unable to encode string to base64.";
  }
}

export function b64ToString(b64: string): string {
  try {
    return atob(b64);
  } catch (error) {
    console.error("Base64 decoding failed:", error);
    return "Unable to decode base64 to string.";
  }
}

// Run the current code on selected config and toolchain.
export async function runCode() {
  console.log("RUnning code...")
  const configValue = get(selectedConfig);
  const toolchain = get(selectedToolchain);

  // Check server connection before proceeding
  const connected = await checkServerConnection();
  if (!connected) {
    console.log("Cannot run code: server is unreachable");
    return;
  }

  try {
    const backendUrl = getBackendUrl();
    const url = new URL(
      `/config/${configValue.name}/run`,
      backendUrl,
    ).toString();

    const payload = {
      test_contents: stringToB64(get(code)),
      toolchain_name: Object.keys(toolchain)[0],
      stdin: stringToB64(get(stdin)),
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json_res = await response.json();
    console.log(json_res);
    stderr.set(b64ToString(json_res.results.stderr));
    stdout.set(b64ToString(json_res.results.stdout));
    exitStatus.set(json_res.results.exit_status);
  } catch (error) {
    console.log("Error running config: ", error);
  }
}

export function clearOutputs() {
  code.set("");
  stdin.set("");
  stdout.set("");
  stderr.set("");
}

