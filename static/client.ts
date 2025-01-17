/// client.ts

///
/// Map the internal client side state to its representation in the DOM.
interface DOMStateFieldMap {
    id: string;
    value: string;
} 

interface CompilerOutput {
  stdout: string,
  stderr: string
}

/// make TS happy
declare const CodeMirror: any;
declare const htmx: any;

class State {
  /// members 
  private static instance: State;
  private compiler: DOMStateFieldMap;
  private program: DOMStateFieldMap;
  private stdin: DOMStateFieldMap;
  private stdout: DOMStateFieldMap;
  private stderr: DOMStateFieldMap;
  private flags: DOMStateFieldMap;

  /// methods
  private constructor() {
    // compiler value & DOM id
    this.compiler = {id: "compiler", value: "generator" };  
    /// program
    this.program = {id: "", value: ""}; 
    /// flags
    this.flags = {id: "", value: ""};
    /// pipes
    this.stdin = {id: "", value: ""};    
    this.stdout = {id: "", value: ""};
    this.stderr = {id: "", value: ""};
  }
  
  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new State();
    }
    return State.instance;
  }
  /// setters
  public setCompiler(compiler: string) { this.compiler.value = compiler; }
  public setProgram(prog: string) 	{ this.program.value = prog; }
  public setFlags(flags: string) 	{ this.flags.value = flags; }
  public setStdin(bytes: string) 	{ this.stdin.value = bytes; }
  public setStdout(bytes: string) 	{ this.stdout.value = bytes; }
  public setStderr(bytes: string) 	{ this.stderr.value = bytes; }
  
  /// getters
  public getCompiler() { return this.compiler.value; }
  public getProgram() 	{ return this.program.value; }
  public getFlags() 	{ return this.flags.value; }
  public getStdin() 	{ return this.stdin.value; }
  public getStdout() 	{ return this.stdout.value; }
  public getStderr() 	{ return this.stderr.value; }
 
  public run = () => {
    console.log(`Running: ${this.compiler.value} with program: ${this.program.value}`); 
  }
}

//// Factory
const getState = () => {
  return State.getInstance() ;
}

//// Listeners
document.addEventListener("DOMContentLoaded", () => {
  const appState = getState();
  console.log(appState);
});

//////////////////// EDITOR //////////////////////////
const editor = CodeMirror(document.getElementById('editor'), {
  mode: 'javascript',
  theme: 'dracula',
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
});

// Update the Program State on editor change
editor.on('change', () => {
  const updatedText = editor.getValue();
  let state = getState();
  state.setProgram(updatedText);
});

// Update editor text
const setEditorText = (value) => {
  let state = getState(); 
  state.setProgram(value); 
  editor.setValue(value);
  editor.refresh();
  console.log("Editor:", editor.getValue());
  console.log("State: ", state); 
}

/// clear listener 
document.getElementById('clear-button')?.addEventListener('click', () => {
  editor.setValue('');  
});

// Font size dropdown listener
document.getElementById('dropdown-font')?.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement;
  editor.getWrapperElement().style.fontSize = target.value;
  editor.refresh();
});

window.addEventListener('resize', () => editor.refresh()); 

//////////////////// COMPILER //////////////////////////

function setCompiler(value) {
  getState().setCompiler(value); 
  const programDropdown = document.getElementById('dropdown-program');
  
  htmx.ajax('GET', '/program-defaults', {
    target: '#dropdown-program',
    swap: 'innerHTML',
    values: { cc: value }
  });
  editor.setValue('');
  editor.refresh();
  return value;
}

//////////////////// STDIN //////////////////////////

document.getElementById('textarea-stdin')?.addEventListener('change', (e) => {
  const target = e.target as HTMLTextAreaElement; 
  getState().setStdin(target.value);
});

//////////////////// FLAGS //////////////////////////
document.getElementById('textarea-compiler-flags')?.addEventListener('change', (e) => {
  const target = e.target as HTMLTextAreaElement;
  getState().setFlags(target.value);
});

