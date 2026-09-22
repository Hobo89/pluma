# Pluma: Cursor handoff

Prepared 22 September 2026. These are implementation instructions, not completed fixes.

## Start in the real website repository

1. Open the actual Pluma website source repository in Cursor. The ChatGPT reference workspace is not a verified production checkout.
2. Copy this entire folder into `docs/pluma-launch-handoff/` in that repository. Keep the relative file structure.
3. Paste the contents of [CURSOR_PROMPT.md](CURSOR_PROMPT.md) into the coding agent conversation.
4. Complete the **Answer** fields in [HUMAN_REVIEW_REQUIRED.md](HUMAN_REVIEW_REQUIRED.md) when decisions are available. Independent fixes can proceed immediately.

No original PDF, local hero prototype or absolute Mac file path is required to start. The historical comparison and audit are included in `reference/`. Ask for missing source material only if a specific decision depends on it.

## Files and their roles

| File | Role |
|---|---|
| `CURSOR_PROMPT.md` | Starting instructions and execution boundaries |
| `MASTER_CODING_AGENT_BRIEF.md` | Detailed work packages P1–P7, copy, design tokens and acceptance checks |
| `HUMAN_REVIEW_REQUIRED.md` | Decisions H01–H10; unanswered entries are not approved policy |
| `PATCH_COMPLETION_REPORT.template.md` | Required evidence and remaining-work format |
| `reference/PLUMA_LAUNCH_AUDIT.md` | Dated visitor-experience observations |
| `reference/PREVIOUS_REPORT_COMPARISON.md` | All 24 historical findings and original IDs |

The master brief specifies the correction. Reference reports describe the earlier evidence; they are not instructions to repeat obsolete fixes. Recheck each finding in the actual checkout. Keep existing fixes when they already meet the acceptance checks.

## Expected delivery

A reviewable code patch, a working local preview where the environment permits it, and `PATCH_COMPLETION_REPORT.md` with actual evidence. No automatic deployment, purchases, bookings or messages. A code patch can be ready while public launch still awaits human decisions.

For a new agent session, supply the same starting prompt and the latest completion report. The next agent should resume from verified results, not restart the audit.
