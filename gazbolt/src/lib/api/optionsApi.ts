import { checkServerConnection } from "$lib/stores/codeStore";

export function getBackendUrl(): string {
  const uri = import.meta.env.VITE_BACKEND_URI; 
  if (uri) {
    return uri;
  }
  return "http://0.0.0.0:8001";
}

export async function fetchConfigs() {
  const connected = await checkServerConnection();
  if (!connected) {
    console.log("Cannot fetch configs: server is unreachable");
    return [];
  }
  try {
    const backendUrl = getBackendUrl();
    const configsResponse = await fetch(`${backendUrl}/configs`);
    return await configsResponse.json();
  } catch (error) {
    console.error("Failed to fetch options from API:", error);
    return [];
  }
}

export async function fetchToolChains(configName: string) {
  const connected = await checkServerConnection();
  if (!connected) {
    console.log("Cannot fetch toolchains: server is unreachable");
    return [];
  }
  try {
    const backendUrl = getBackendUrl();
    const toolchainsResponse = await fetch(
      `${backendUrl}/config/${configName}/toolchains`,
    );
    return await toolchainsResponse.json();
  } catch (error) {
    console.error("Failed to fetch options from API:", error);
    return [];
  }
}

export async function fetchTests(configName: string) {
  const connected = await checkServerConnection();
  if (!connected) {
    console.log("Cannot fetch tests: server is unreachable");
    return [];
  }
  try {
    const backendUrl = getBackendUrl();
    const toolchainsResponse = await fetch(
      `${backendUrl}/config/${configName}/tests`,
    );
    return await toolchainsResponse.json();
  } catch (error) {
    console.error("Failed to fetch options from API:", error);
    return [];
  }
}

