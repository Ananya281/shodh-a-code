export default function ProblemPanel({ problem }) {
  if (!problem)
    return (
      <div className="text-gray-500 text-sm bg-gray-900 border border-gray-800 p-3 rounded-lg animate-pulse">
        Loading problem…
      </div>
    );

  return (
    <div className="space-y-4 text-gray-200">
      <h3 className="text-lg font-bold text-blue-400">{problem.title}</h3>

      {problem.description && (
        <pre className="whitespace-pre-wrap text-sm bg-gray-800 p-3 rounded-md border border-gray-700 text-gray-300">
          {problem.description}
        </pre>
      )}

      {problem.constraints && (
        <div>
          <h4 className="font-semibold text-gray-300 mb-1">Constraints</h4>
          <pre className="whitespace-pre-wrap text-sm bg-gray-800 p-3 rounded-md border border-gray-700 text-gray-400">
            {problem.constraints}
          </pre>
        </div>
      )}

      {problem.samples?.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-300 mb-2">Samples</h4>
          <div className="grid gap-3">
            {problem.samples.map((s, i) => (
              <div
                key={i}
                className="border border-gray-700 rounded-md bg-gray-800 p-3"
              >
                <p className="text-xs text-blue-400 font-medium">Input</p>
                <pre className="text-sm text-gray-300 bg-gray-900 p-2 rounded mt-1">
                  {s.input}
                </pre>
                <p className="text-xs text-green-400 font-medium mt-3">
                  Output
                </p>
                <pre className="text-sm text-gray-300 bg-gray-900 p-2 rounded mt-1">
                  {s.output}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
