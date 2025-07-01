
export function getBackendUrl(): string {
   
  if (import.meta.env.VITE_BACKEND_URI || import.meta.env.BACKEND_URI) {
    return import.meta.env.VITE_BACKEND_URI || import.meta.env.BACKEND_URI;
  } 
  const port = import.meta.env.VITE_PORT || import.meta.env.PORT;
  if (port) {
    return `http://127.0.0.1:${port}`;
  }
  return 'http://127.0.0.1:5001';
}

