export default function ProblemPanel({ problem }) {
  if (!problem) return <div>Loading problem…</div>;
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{problem.title}</h3>
      <pre className="whitespace-pre-wrap text-sm">{problem.statement}</pre>
      {problem.constraints && (<>
        <h4 className="font-medium">Constraints</h4>
        <pre className="whitespace-pre-wrap text-sm">{problem.constraints}</pre>
      </>)}
      {!!(problem.samples && problem.samples.length) && (<>
        <h4 className="font-medium">Samples</h4>
        <div className="grid gap-2">
          {problem.samples.map((s,i)=>(
            <div key={i} className="border rounded p-2">
              <p className="text-xs text-gray-500">Input</p>
              <pre className="text-sm">{s.input}</pre>
              <p className="text-xs text-gray-500 mt-2">Output</p>
              <pre className="text-sm">{s.output}</pre>
            </div>
          ))}
        </div>
      </>)}
    </div>
  );
}
