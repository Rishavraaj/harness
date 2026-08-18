// import {
//   streamText,
//   UIMessage,
//   convertToModelMessages,
//   createUIMessageStreamResponse,
//   toUIMessageStream,
// } from "ai";
// import { openai } from "@ai-sdk/openai";

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: openai("gpt-4o"),
//     messages: await convertToModelMessages(messages),
//   });

//   return createUIMessageStreamResponse({
//     stream: toUIMessageStream({ stream: result.stream }),
//   });
// }
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
