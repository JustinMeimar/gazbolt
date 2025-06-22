import { get } from 'svelte/store';

// Get backend URI from environment variables
const getBackendUri = () => {
  return import.meta.env.BACKEND_URI || 'http://127.0.0.1:5001';
};

import { selectedConfig } from '$lib/stores/codeStore';

export async function fetchConfigs() {
  try {
    const backendUri = getBackendUri();
    const configsResponse = await fetch(`${backendUri}/configs`);
    return await configsResponse.json();
  } catch (error) {
    console.error('Failed to fetch options from API:', error);
    return [];
  }
}

export async function fetchToolChains(configName: string) {
  try {
    const backendUri = getBackendUri();
    const toolchainsResponse = await fetch(`${backendUri}/config/${configName}/toolchains`);
    return await toolchainsResponse.json();
  } catch (error) {
    console.error('Failed to fetch options from API:', error);
    return [];
  }
}

export async function fetchTests(configName: string) {
  try {
    const backendUri = getBackendUri();
    const toolchainsResponse = await fetch(`${backendUri}/config/${configName}/tests`);
    return await toolchainsResponse.json();
  } catch (error) {
    console.error('Failed to fetch options from API:', error);
    return [];
  }
}

