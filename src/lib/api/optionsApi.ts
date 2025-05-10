// Get backend URI from environment variables
const getBackendUri = () => {
  return import.meta.env.BACKEND_URI || '';
};

// Default fallback options in case API fails
const defaultOptions = {
  configs: ['Default', 'Debug', 'Release', 'Performance'],
  toolchains: ['TypeScript', 'JavaScript', 'Rust', 'Python', 'Go'],
  programs: ['Main', 'Test', 'Benchmark', 'Example']
};

/**
 * Fetch all options from the backend API
 * @returns {Promise<Object>} Object containing configs, toolchains, and programs arrays
 */
export async function fetchOptions() {
  try {
    const backendUri = getBackendUri();
    const options = {};
    
    // Fetch configs
    const configsResponse = await fetch(`${backendUri}/configs`);
    options.configs = await configsResponse.json();
    
    // Fetch toolchains
    const toolchainsResponse = await fetch(`${backendUri}/toolchains`);
    options.toolchains = await toolchainsResponse.json();
    
    // Fetch programs
    const programsResponse = await fetch(`${backendUri}/programs`);
    options.programs = await programsResponse.json();
    
    return options;
  } catch (error) {
    console.error('Failed to fetch options from API:', error);
    
    // Return default options if API call fails
    return defaultOptions;
  }
}

/**
 * Fetch a specific option type from the backend API
 * @param {string} optionType - Type of option to fetch (configs, toolchains, or programs)
 * @returns {Promise<Array>} Array of options
 */
export async function fetchOptionType(optionType) {
  try {
    const backendUri = getBackendUri();
    const response = await fetch(`${backendUri}/${optionType}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${optionType} from API:`, error);
    
    // Return default options for the requested type
    return defaultOptions[optionType] || [];
  }
}
