import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
  text,
  jsonb,
  boolean,
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
  slug: text("post_slug").notNull().unique(),
  creatorId: uuid("post_creator_id")
    .references(() => user.id)
    .notNull(),
  title: text("post_title").notNull(),
  snippet: text("post_snippet").notNull(),
  body: jsonb("post_body").$type<string[]>().notNull(),
  neighborhoods: text("post_neighborhoods").notNull(),
  communityBoardCode: text("post_community_board_code").notNull(),
  validZipCodes: jsonb("post_valid_zip_codes").$type<string[]>().notNull(),
  meetingUrl: text("post_meeting_url"),
  sourceLabel: text("post_source_label"),
  sourceUrl: text("post_source_url"),
});

export const tag = pgTable("tag", {
  id: uuid("tag_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("tag_name").notNull(),
  postId: uuid("tag_post_id")
    .references(() => post.id)
    .notNull(),
});

export const verifiedRespondent = pgTable("verified_respondent", {
  id: uuid("respondent_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  email: text("email").notNull(),
  addressHash: text("address_hash").notNull(),
  zip: text("zip").notNull(),
  communityBoardCode: text("community_board_code").notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
});

export const comment = pgTable("comment", {
  id: uuid("comment_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  body: text("comment_body").notNull(),
  postId: uuid("comment_post_id")
    .references(() => post.id)
    .notNull(),
  respondingTo: uuid("comment_responding_to"),
  respondentId: uuid("comment_respondent_id").references(
    () => verifiedRespondent.id
  ),
});

export const notifyInterest = pgTable("notify_interest", {
  id: uuid("interest_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  email: text("email").notNull(),
  zip: text("zip").notNull(),
  communityBoardCode: text("community_board_code").notNull(),
});
