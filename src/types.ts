/// A type for each compiler/interpreter gazbolt supports. 
/// Shared between frontend and backend. Gazbolt depends on
/// dragon-runner and a config to run the executable.
export type Compiler = {
  id: number;
  name: string;
  configPath: string; 	// Path to DragonRunner config
  iconPath?: string;	// Path to icon PNG for frontend
}

