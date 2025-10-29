import Editor from "@monaco-editor/react";

export default function EditorPanel({ language, code, setCode }) {
  const monacoLang =
    language === "cpp" ? "cpp" : language === "python" ? "python" : "java";

  const placeholder = {
    java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        /* read stdin, print */\n    }\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    /* read stdin */\n    return 0;\n}`,
    python: `# read from stdin\n# print to stdout`,
  }[language];

  return (
    <div className="bg-[#0b0f19] border border-gray-800 rounded-xl shadow-md p-2">
      <div className="flex items-center justify-between mb-2 px-2">
        <h2 className="text-sm text-gray-400 font-medium">
          💻 Code Editor ({language.toUpperCase()})
        </h2>
        <span className="text-xs text-gray-500">
          Auto-save enabled • Syntax highlighting
        </span>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-700">
        <Editor
          height="480px"
          defaultLanguage={monacoLang}
          language={monacoLang}
          value={code || placeholder}
          theme="vs-dark"
          onChange={(v) => setCode(v || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            formatOnType: true,
            formatOnPaste: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
