import { writable } from 'svelte/store';

// Create stores for all state values
export const code = writable('// Your code here\nconsole.log("Hello, Gazbolt!");');
export const stdout = writable('');
export const stderr = writable('');
export const stdin = writable('');

// Configuration options
export const selectedConfig = writable('Default');
export const selectedToolchain = writable('TypeScript');
export const selectedProgram = writable('Main');

// Function to run the code
export function runCode() {
  const configValue = get(selectedConfig);
  const toolchainValue = get(selectedToolchain);
  const programValue = get(selectedProgram);
  const codeValue = get(code);
  const stdinValue = get(stdin);
  
  // Mock implementation - in a real app you'd send this to a backend
  let output = `Running ${programValue} with ${toolchainValue} (${configValue})...\n`;
  
  try {
    output += `Output from execution:\n${codeValue}\n\nStdin provided:\n${stdinValue || "None"}`;
    stdout.set(output);
    stderr.set('');
  } catch (error) {
    stderr.set(`Error: ${error}`);
  }
}

// Function to clear all outputs
export function clearOutputs() {
  code.set('');
  stdin.set('');
  stdout.set('');
  stderr.set('');
}

// Import get to access store values directly in functions
import { get } from 'svelte/store';
