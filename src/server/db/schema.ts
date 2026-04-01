import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", [
  "ELECTED_OFFICIAL",
  "ANONYMOUS",
  "CONSTITUENT",
  "INTERNAL",
]);

export const district = pgTable("district", {
  id: uuid("district_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("district_name").notNull(),
  tagCookie: jsonb("district_tag_cookie"),
});

export const user = pgTable("user", {
  id: uuid("user_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("user_name").notNull(),
  type: userTypeEnum("user_type").notNull(),
  profilePicUrl: text("user_profile_pic_url"),
  position: text("user_position"),
  districtId: uuid("user_district_id").references(() => district.id),
});

export const post = pgTable("post", {
  id: uuid("post_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  creatorId: uuid("post_creator_id")
    .references(() => user.id)
    .notNull(),
  title: text("post_title").notNull(),
  body: text("post_body").notNull(),
  meetingUrl: text("post_meeting_url"),
});

export const tag = pgTable("tag", {
  id: uuid("tag_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("tag_name").notNull(),
  postId: uuid("tag_post_id")
    .references(() => post.id)
    .notNull(),
});

export const comment = pgTable("comment", {
  id: uuid("comment_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  body: text("comment_body").notNull(),
  postId: uuid("comment_post_id")
    .references(() => post.id)
    .notNull(),
  respondingTo: uuid("comment_responding_to").references(
    (): ReturnType<typeof uuid> => comment.id
  ),
});
