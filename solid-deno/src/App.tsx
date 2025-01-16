
import { createSignal, createEffect } from "solid-js";
import { render } from "solid-js/web";
import { EditorState }  from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createEditorState, createEditorView } from './editor.js'
function App() {
  const [state, setState] = createSignal({ cc: "generator" });
  const [editorValue, setEditorValue] = createSignal("");
  const [fontSize, setFontSize] = createSignal("18px");

  createEffect(() => {
    let initState = createEditorState("function foo() {\n console.log(123); }}");
    createEditorView(initState, document.getElementById("editor-body")); 
  });

  const handleClear = () => setEditorValue("");

  return (
    <div>
      <header>
        <nav>
          <img src="/public/gazprea-logo-solana.png" width="40px" />
          <h1>GazBolt</h1>
        </nav>
      </header>
      <div class="main-wrapper">
	<div id="settings" class="container">
          <label for="stdin-checkbox">Standard Input</label>
          <input
            type="checkbox"
            class="checkbox"
            id="stdin-checkbox"
            onclick={() =>
              document
                .getElementById("textarea-stdin")
                .classList.toggle("hidden")
            }
          />

          <label for="compiler-flags-checkbox">Compiler Options</label>
          <input
            type="checkbox"
            class="checkbox"
            id="compiler-flags-checkbox"
            onclick={() =>
              document
                .getElementById("textarea-compiler-flags")
                .classList.toggle("hidden")
            }
          />
          <select
            id="compiler"
            class="dropdown"
            name="compiler"
            onchange={(e) => setState({ cc: e.target.value })}
          >
            <option value="generator">Generator</option>
            <option value="gcc">GCC</option>
            <option value="clang">Clang</option>
          </select>
        </div>
        <div id="main-container" style="display: flex">
	        <div id="left">
            <div id="editor" class="container">
              <div id="editor-options">
                <select
                  id="dropdown-program"
                  name="compiler"
                  class="dropdown"
                  onchange={(e) => setEditorValue(e.target.value)}
                >
                  <option value="Program A">Program A</option>
                  <option value="Program B">Program B</option>
                </select>
                <select
                  id="dropdown-font"
                  name="choices"
                  class="dropdown"
                  value={fontSize()}
                  onchange={(e) => setFontSize(e.target.value)}
                >
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="22px">22px</option>
                  <option value="24px">24px</option>
                  <option value="26px">26px</option>
                </select>
                <button id="clear-button" class="button" onclick={handleClear}>
                  Clear
                </button>
                <textarea
                  id="textarea-compiler-flags"
                  class="hidden"
                  rows="1"
                  placeholder="Compiler Flags"
                ></textarea>
              </div>
              <div id="editor-body">
              </div>
            </div>
          </div>
          <div id="right">
            <textarea
              id="textarea-stdin"
              class="container hidden"
              rows="4"
              placeholder="Standard Input..."
            ></textarea>
            <textarea
              id="output-textarea"
              class="container"
              rows="4"
              readonly
              placeholder="Stdout will appear here..."
            ></textarea>
            <textarea
              id="output-stderr"
              class="container"
              rows="4"
              readonly
              placeholder="Stderr will appear here..."
            ></textarea>
          </div>
        </div>
      </div>
      <footer>
        <p>© 2024 GazBolt</p>
      </footer>
    </div>
  );
}

export default App
