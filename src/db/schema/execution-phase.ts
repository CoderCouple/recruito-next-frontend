import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./user";
import { workflowExecution } from "./workflow-execution";

export const executionPhases = pgTable("execution_phase", {
  id: text("id").primaryKey(),

  userId: text("userId").references(() => user.id),
  workflowExecutionId: text("workflowExecutionId").references(
    () => workflowExecution.id
  ),

  status: text("status"),
  number: integer("number"),
  node: text("node"),
  name: text("name"),

  startedAt: timestamp("startedAt", { withTimezone: true }),
  completedAt: timestamp("completedAt", { withTimezone: true }),

  inputs: text("inputs"), // could be JSON later
  outputs: text("outputs"), // could be JSON later

  creditsConsumed: numeric("creditsConsumed"),

  // Meta fields
  createdBy: text("createdBy").references(() => user.id),
  updatedBy: text("updatedBy").references(() => user.id),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  isDeleted: boolean("isDeleted").default(false),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export const executionPhaseRelations = relations(
  executionPhases,
  ({ one }) => ({
    user: one(user, {
      fields: [executionPhases.userId],
      references: [user.id],
    }),
    creator: one(user, {
      fields: [executionPhases.createdBy],
      references: [user.id],
    }),
    updater: one(user, {
      fields: [executionPhases.updatedBy],
      references: [user.id],
    }),
    workflowExecution: one(workflowExecution, {
      fields: [executionPhases.workflowExecutionId],
      references: [workflowExecution.id],
    }),
  })
);
