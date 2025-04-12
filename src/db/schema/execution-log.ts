import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { executionPhases } from "./execution-phase";
import { users } from "./user";

export const executionLogs = pgTable("execution_log", {
  id: text("id").primaryKey(),

  executionPhaseId: text("executionPhaseId").references(
    () => executionPhases.id
  ),

  logLevel: text("logLevel"),
  message: text("message"),
  timestamp: timestamp("timestamp", { withTimezone: true }),

  // Meta fields
  createdBy: text("createdBy").references(() => users.id),
  updatedBy: text("updatedBy").references(() => users.id),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  isDeleted: boolean("isDeleted").default(false),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export const executionLogRelations = relations(executionLogs, ({ one }) => ({
  executionPhase: one(executionPhases, {
    fields: [executionLogs.executionPhaseId],
    references: [executionPhases.id],
  }),
  creator: one(users, {
    fields: [executionLogs.createdBy],
    references: [users.id],
  }),
  updater: one(users, {
    fields: [executionLogs.updatedBy],
    references: [users.id],
  }),
}));
