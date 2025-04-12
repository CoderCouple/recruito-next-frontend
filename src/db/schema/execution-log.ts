import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { executionPhases } from "./execution-phase";
import { user } from "./user";

export const executionLogs = pgTable("execution_log", {
  id: text("id").primaryKey(),

  executionPhaseId: text("executionPhaseId").references(
    () => executionPhases.id
  ),

  logLevel: text("logLevel"),
  message: text("message"),
  timestamp: timestamp("timestamp", { withTimezone: true }),

  // Meta fields
  createdBy: text("createdBy").references(() => user.id),
  updatedBy: text("updatedBy").references(() => user.id),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  isDeleted: boolean("isDeleted").default(false),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export const executionLogRelations = relations(executionLogs, ({ one }) => ({
  executionPhase: one(executionPhases, {
    fields: [executionLogs.executionPhaseId],
    references: [executionPhases.id],
  }),
  creator: one(user, {
    fields: [executionLogs.createdBy],
    references: [user.id],
  }),
  updater: one(user, {
    fields: [executionLogs.updatedBy],
    references: [user.id],
  }),
}));
