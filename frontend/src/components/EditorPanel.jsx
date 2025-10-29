import Editor from "@monaco-editor/react";

export default function EditorPanel({ language, code, setCode }) {
  const monacoLang = language === "cpp" ? "cpp" : language === "python" ? "python" : "java";
  const placeholder = {
    java: `import java.util.*; public class Main { public static void main(String[] args) { /* read stdin, print */ } }`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){ ios::sync_with_stdio(false); cin.tie(nullptr); /* read stdin */ return 0; }`,
    python: `# read from stdin\n# print to stdout`,
  }[language];

  return (
    <div className="bg-white rounded-xl shadow p-2">
      <Editor
        height="480px"
        defaultLanguage={monacoLang}
        language={monacoLang}
        value={code || placeholder}
        onChange={v => setCode(v || "")}
        options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: "on", automaticLayout: true }}
      />
    </div>
  );
}
