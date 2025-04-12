import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./user";
import { workflow } from "./workflow";

export const workflowExecution = pgTable("workflow_execution", {
  id: text("id").primaryKey(),
  workflowId: text("workflowId").references(() => user.id),
  userId: text("userId").references(() => user.id),

  trigger: text("trigger"),
  status: text("status"),

  creditsConsumed: numeric("creditsConsumed"),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  startedAt: timestamp("startedAt", { withTimezone: true }),
  completedAt: timestamp("completedAt", { withTimezone: true }),

  // Meta columns
  createdBy: text("createdBy").references(() => user.id),
  updatedBy: text("updatedBy").references(() => user.id),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  isDeleted: boolean("isDeleted").default(false),
});

export const workflowExecutionRelations = relations(
  workflowExecution,
  ({ one }) => ({
    workflow: one(workflow, {
      fields: [workflowExecution.workflowId],
      references: [workflow.id],
    }),
    user: one(user, {
      fields: [workflowExecution.userId],
      references: [user.id],
    }),
    creator: one(user, {
      fields: [workflowExecution.createdBy],
      references: [user.id],
    }),
    updater: one(user, {
      fields: [workflowExecution.updatedBy],
      references: [user.id],
    }),
  })
);
