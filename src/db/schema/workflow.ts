import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./user";

export const workflow = pgTable("workflow", {
  id: text("id").primaryKey(),

  userId: text("userId").references(() => user.id),
  name: text("name"),
  description: text("description"),
  definition: text("definition"),
  executionPlan: text("executionPlan"),
  cron: text("cron"),
  status: text("status"),
  creditsCost: numeric("creditsCost"),
  lastRunAt: timestamp("lastRunAt", { withTimezone: true }),
  lastRunId: text("lastRunId"),
  lastRunStatus: text("lastRunStatus"),
  nextRunAt: timestamp("nextRunAt", { withTimezone: true }),

  // Audit fields
  createdBy: text("createdBy").references(() => user.id),
  updatedBy: text("updatedBy").references(() => user.id),
  isDeleted: boolean("isDeleted").default(false),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const workflowRelations = relations(workflow, ({ one }) => ({
  user: one(user, {
    fields: [workflow.userId],
    references: [user.id],
  }),
  creator: one(user, {
    fields: [workflow.createdBy],
    references: [user.id],
  }),
  updater: one(user, {
    fields: [workflow.updatedBy],
    references: [user.id],
  }),
}));
