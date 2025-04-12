import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./user";

export const userPurchases = pgTable("user_purchase", {
  id: text("id").primaryKey(),
  userId: text("userId").references(() => user.id),
  stripeId: text("stripeId"),
  description: text("description"),
  amount: integer("amount"),
  currency: text("currency"),
  date: timestamp("date", { withTimezone: true }),

  createdBy: text("createdBy").references(() => user.id),
  updatedBy: text("updatedBy").references(() => user.id),
  isDeleted: boolean("isDeleted").default(false),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const userPurchaseRelations = relations(userPurchases, ({ one }) => ({
  user: one(user, {
    fields: [userPurchases.userId],
    references: [user.id],
  }),
  creator: one(user, {
    fields: [userPurchases.createdBy],
    references: [user.id],
  }),
  updater: one(user, {
    fields: [userPurchases.updatedBy],
    references: [user.id],
  }),
}));
