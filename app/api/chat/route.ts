import { convertToModelMessages, UIMessage } from "ai";
import { agent } from "../../ai-harness/harness-agent";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const session = await agent.createSession();

  const result = await agent.stream({
    session,
    messages: await convertToModelMessages(messages),
    onEnd: () => {
      session.destroy();
    },
  });

  return result.toUIMessageStreamResponse();
}
