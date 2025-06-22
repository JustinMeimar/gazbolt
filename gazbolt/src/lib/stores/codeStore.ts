import { writable } from 'svelte/store';
import { get } from 'svelte/store';

// Program State
export const code = writable('');
export const stdout = writable('');
export const stderr = writable('');
export const stdin = writable('');
export const exitStatus = writable(0);

export const selectedConfig = writable(Object());
export const selectedToolchain = writable(Object());
export const selectedProgram = writable(Object());

// Todo: move to utils.
export function stringToB64(str: string): string {
 try {
   return btoa(str);
 } catch (error) {
   console.error('Base64 encoding failed:', error);
   return 'Unable to encode string to base64.';
 }
}

export function b64ToString(b64: string): string {
 try {
   return atob(b64);
 } catch (error) {
   console.error('Base64 decoding failed:', error);
   return 'Unable to decode base64 to string.';
 }
}

// Run the current code on selected config and toolchain.
export async function runCode() {
  const configValue     = get(selectedConfig);
  const toolchain  = get(selectedToolchain);

  try {
    const base = 'http://127.0.0.1:5001';
    const url = new URL(`/config/${configValue.name}/run`, base).toString();    
    
    const payload = {
        'test_contents':  stringToB64(get(code)),
        'toolchain_name': Object.keys(toolchain)[0],
        'stdin':          stringToB64(get(stdin))
    };
    console.log("TC:", toolchain);
    console.log("REQUEST PAYLOAD: ", payload);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json_res = await response.json();
    console.log("RESULT: ", json_res);
    stderr.set(b64ToString(json_res.results.stderr));
    stdout.set(b64ToString(json_res.results.stdout));
    exitStatus.set(json_res.results.exit_status)

  } catch (error) {
    console.log('Error running config: ', error)
  } 
}

export function clearOutputs() {
  code.set('');
  stdin.set('');
  stdout.set('');
  stderr.set('');
}


