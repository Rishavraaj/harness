import { HarnessAgent } from "@ai-sdk/harness/agent";
import { createCodex } from "@ai-sdk/harness-codex";
import { createVercelSandbox } from "@ai-sdk/sandbox-vercel";
import { tool } from "ai";
import { z } from "zod/v4";

export const agent = new HarnessAgent({
  harness: createCodex({
    reasoningEffort: "high",
    codexConfig: {
      model_verbosity: "low",
    },
  }),
  id: "demo",
  sandbox: createVercelSandbox({
    runtime: "node24",
    ports: [4000],
  }),
  tools: {
    deploy: tool({
      description: "Deploy a service.",
      inputSchema: z.object({ env: z.enum(["staging", "production"]) }),
      execute: async ({ env }) => ({ url: `https://${env}.example.com` }),
    }),
  },
});
