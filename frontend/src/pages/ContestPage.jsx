import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContest, getProblem, createSubmission, getSubmission } from "../services/api.js";
import ProblemPanel from "../components/ProblemPanel.jsx";
import EditorPanel from "../components/EditorPanel.jsx";
import SubmissionStatus from "../components/SubmissionStatus.jsx";
import Leaderboard from "../components/Leaderboard.jsx";
import { LANGUAGES } from "../utils/language.js";
import toast from "react-hot-toast";

export default function ContestPage() {
  const { contestId = "" } = useParams();
  const username = useMemo(() => sessionStorage.getItem("shodha_username") || "", []);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [language, setLanguage] = useState(LANGUAGES[0].value);
  const [code, setCode] = useState("");
  const [activeSubmissionId, setActiveSubmissionId] = useState(null);

  useEffect(() => {
    if (!username) {
      toast.error("No username found. Please join again.");
      setTimeout(() => (location.href = "/"), 1200);
    }
  }, [username]);

  const { data: contest } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => getContest(contestId),
    enabled: !!contestId,
  });

  useEffect(() => {
    if (contest && contest.problems?.length && !selectedProblemId)
      setSelectedProblemId(contest.problems[0].id);
  }, [contest, selectedProblemId]);

  const { data: problem } = useQuery({
    queryKey: ["problem", contestId, selectedProblemId],
    queryFn: () => getProblem(contestId, selectedProblemId),
    enabled: !!contestId && !!selectedProblemId,
  });

  const { data: submission, refetch: refetchSubmission } = useQuery({
    queryKey: ["submission", activeSubmissionId],
    queryFn: () => getSubmission(activeSubmissionId),
    enabled: !!activeSubmissionId,
    refetchInterval: activeSubmissionId ? 2500 : false,
  });

  useEffect(() => {
    if (!submission) return;
    const terminal = ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error", "Compilation Error", "System Error"].includes(submission.status);
    if (terminal) setTimeout(() => setActiveSubmissionId(null), 500);
  }, [submission]);

  async function handleSubmit() {
    if (!contest || !selectedProblemId) return;
    if (!code.trim()) return toast.error("Write some code before submitting!");
    try {
      const res = await createSubmission({
        contestId: contest.id,
        problemId: selectedProblemId,
        username,
        language,
        code,
      });
      setActiveSubmissionId(res.submissionId);
      toast.loading("Submitted. Judging started…", { id: "judge" });
      setTimeout(() => refetchSubmission(), 300);
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "Submission failed");
    }
  }

  useEffect(() => {
    if (!submission) return;
    if (submission.status === "Running")
      toast.loading("Running against tests…", { id: "judge" });
    else {
      toast.dismiss("judge");
      submission.status === "Accepted"
        ? toast.success("✅ Accepted")
        : toast.error(submission.status);
    }
  }, [submission]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 p-4 md:p-6">
      <header className="flex items-center justify-between mb-5 border-b border-gray-700 pb-3">
        <div>
          <h1 className="text-2xl font-bold text-white">{contest?.name ?? "Contest Arena"}</h1>
          <p className="text-sm text-gray-400">
            Signed in as <span className="font-medium text-blue-400">{username}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => location.assign("/")}
            className="bg-gray-800 hover:bg-gray-700 text-sm px-3 py-1.5 rounded-md text-gray-300 border border-gray-700"
          >
            Exit
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Problems List */}
        <div className="lg:col-span-1 bg-gray-900 rounded-xl p-4 shadow-md border border-gray-800">
          <h2 className="font-semibold text-lg mb-3 text-blue-400">Problems</h2>
          <ul className="space-y-2">
            {contest?.problems?.map((p) => (
              <li key={p.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    p.id === selectedProblemId
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedProblemId(p.id)}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-gray-800 pt-3">
            {problem ? (
              <ProblemPanel problem={problem} />
            ) : (
              <p className="text-gray-500 text-sm">Loading problem...</p>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl shadow-md border border-gray-800 flex flex-col">
          <div className="flex-1 p-3">
            <EditorPanel language={language} code={code} setCode={setCode} />
          </div>
          <div className="flex justify-between items-center border-t border-gray-800 p-3">
            <SubmissionStatus submission={submission} />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md text-white font-medium text-sm transition"
            >
              Submit Code
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-1 bg-gray-900 rounded-xl p-4 shadow-md border border-gray-800">
          <Leaderboard contestId={contestId} />
        </div>
      </div>
    </div>
  );
}
