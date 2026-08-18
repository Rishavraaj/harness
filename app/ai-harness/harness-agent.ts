import { HarnessAgent } from "@ai-sdk/harness/agent";
import { claudeCode } from "@ai-sdk/harness-claude-code";
import { createVercelSandbox } from "@ai-sdk/sandbox-vercel";

export const agent = new HarnessAgent({
  harness: claudeCode,
  sandbox: createVercelSandbox({
    runtime: "node24",
    ports: [4000],
  }),
  instructions:
    "You are a careful coding assistant. Prefer small changes and explain tradeoffs.",
});

const session = await agent.createSession();

let exitCode = 0;
try {
  const result = await agent.generate({
    session,
    prompt: "Create a short TODO.md for this repository.",
  });

  console.log(result.text);
} catch (err) {
  exitCode = 1;
  console.error(err);
} finally {
  await session.destroy();
  process.exit(exitCode);
}
