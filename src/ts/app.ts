import * as hljs from "highlight.js";
import * as CodeMirror from "codemirror";
import "../../node_modules/codemirror/mode/clike/clike";

const editorDom = document.getElementById("editor") as HTMLTextAreaElement;
const codeDom = document.getElementById("code") as HTMLElement;
const languageSelect = document.getElementById("language-select") as HTMLSelectElement;
const sizeSelect = document.getElementById("size-select") as HTMLSelectElement;
languageSelect.addEventListener("change", ev => {
    editor.setOption("mode", `text/x-${languageSelect.value}`);
    codeDom.className = languageSelect.value;
    console.log(`mode change to ${languageSelect.value}`)
})
sizeSelect.addEventListener("change", ev => {
    codeDom.style.fontSize = sizeSelect.value;
})
const editor = CodeMirror.fromTextArea(editorDom, {
    lineNumbers: true,
    mode: `text/x-${languageSelect.value}`,
    theme: "darcula",
    extraKeys: {
        Tab: function (cm) {
            const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
        }
    }
});
editor.setSize("100%", "100%");
editor.on('change', () => {
    codeDom.innerText = editor.getValue();
    hljs.highlightBlock(codeDom);
});

declare module "codemirror" {
    interface Editor {
        replaceSelection(text: string): void;
    }
}