import { appRouter } from "./router";
import { createTRPCContext } from "./init";

export function createServerCaller() {
  return appRouter.createCaller(createTRPCContext());
}
