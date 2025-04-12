import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./user";

export const credential = pgTable("credential", {
  id: text("id").primaryKey(),
  userId: text("userId").references(() => user.id),

  name: text("name"),
  value: text("value"),

  createdBy: text("createdBy").references(() => user.id),
  updatedBy: text("updatedBy").references(() => user.id),
  isDeleted: boolean("isDeleted").default(false),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const credentialRelations = relations(credential, ({ one }) => ({
  user: one(user, {
    fields: [credential.userId],
    references: [user.id],
  }),
  creator: one(user, {
    fields: [credential.createdBy],
    references: [user.id],
  }),
  updater: one(user, {
    fields: [credential.updatedBy],
    references: [user.id],
  }),
}));
