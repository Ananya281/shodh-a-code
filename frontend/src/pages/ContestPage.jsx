import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContest, getProblem, createSubmission, getSubmission } from "../lib/api.js";
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

  useEffect(() => { if (!username) { toast.error("No username found. Please join again."); setTimeout(()=>location.href="/",1200);} }, [username]);

  const { data: contest } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => getContest(contestId),
    enabled: !!contestId,
  });

  useEffect(() => {
    if (contest && contest.problems?.length && !selectedProblemId) setSelectedProblemId(contest.problems[0].id);
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
    const terminal = ["Accepted","Wrong Answer","Time Limit Exceeded","Runtime Error","Compilation Error","System Error"].includes(submission.status);
    if (terminal) setTimeout(() => setActiveSubmissionId(null), 500);
  }, [submission]);

  async function handleSubmit() {
    if (!contest || !selectedProblemId) return;
    if (!code.trim()) return toast.error("Write some code before submitting!");
    try {
      const res = await createSubmission({ contestId: contest.id, problemId: selectedProblemId, username, language, code });
      setActiveSubmissionId(res.submissionId);
      toast.loading("Submitted. Judging started…", { id: "judge" });
      setTimeout(() => refetchSubmission(), 300);
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "Submission failed");
    }
  }

  useEffect(() => {
    if (!submission) return;
    if (submission.status === "Running") toast.loading("Running against tests…", { id: "judge" });
    else { toast.dismiss("judge"); submission.status === "Accepted" ? toast.success("Accepted ✅") : toast.error(submission.status); }
  }, [submission]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{contest?.name ?? "Contest"}</h1>
          <p className="text-sm text-gray-500">Signed in as <b>{username}</b></p>
        </div>
        <div className="flex gap-2">
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="border rounded px-2 py-1">
            {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
          <button onClick={()=>location.assign("/")} className="border rounded px-3 py-1 hover:bg-gray-100">Exit</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-xl shadow p-3">
            <h2 className="font-medium mb-2">Problems</h2>
            <ul className="space-y-1">
              {contest?.problems?.map(p => (
                <li key={p.id}>
                  <button className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${p.id===selectedProblemId?"bg-gray-200":""}`} onClick={()=>setSelectedProblemId(p.id)}>
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-4"><ProblemPanel problem={problem} /></div>
        </div>

        <div className="lg:col-span-1">
          <EditorPanel language={language} code={code} setCode={setCode} />
          <div className="mt-3 flex gap-2">
            <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded-lg">Submit</button>
            <SubmissionStatus submission={submission} />
          </div>
        </div>

        <div className="lg:col-span-1"><Leaderboard contestId={contestId} /></div>
      </div>
    </div>
  );
}
