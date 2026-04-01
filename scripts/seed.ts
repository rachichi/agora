import { config } from "dotenv";
config({ path: ".env.local" });

import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  prepare: false,
});

const MEETING_MINUTES_URL =
  "https://www.nyc.gov/assets/brooklyncb4/downloads/pdf/minutes/2025/december-2025-minutes.pdf";

async function seed() {
  console.log("Seeding...");

  const [district] = await sql`
    INSERT INTO district (district_name)
    VALUES ('Brooklyn Community Board 4')
    RETURNING district_id
  `;
  console.log("Created district:", district.district_id);

  const [celestina] = await sql`
    INSERT INTO "user" (user_name, user_type, user_profile_pic_url, user_position, user_district_id)
    VALUES (
      'Celestina Leon',
      'ELECTED_OFFICIAL',
      '/avatars/celestinaleon.jpg',
      'District Manager',
      ${district.district_id}
    )
    RETURNING user_id
  `;
  console.log("Created user:", celestina.user_id);

  const posts = [
    {
      slug: "ebike-red-light-summons",
      title: "Should e-bike and bicycle riders receive criminal court summonses or traffic tickets for running red lights?",
      snippet: "NYPD recently began issuing criminal court summonses to cyclists and e-bike riders for running red lights. We want to hear from you before we finalize our recommendation to the city.",
      body: [
        "NYPD recently began issuing criminal court summonses (instead of just traffic violations) to cyclists and e-bike riders for running red lights.",
        "Previously, such infractions were adjudicated in traffic court (similar to car drivers).",
        "We want to hear from you before we finalize our recommendation to the city.",
        "Do you think cyclists and e-bike riders should face criminal summonses or traffic tickets for running red lights? And who do you think should be held responsible when delivery riders behave recklessly?",
      ],
      neighborhoods: "Bushwick (11221, 11237), Williamsburg (11206)",
      communityBoardCode: "BK-04",
      validZipCodes: ["11206", "11221", "11237"],
      tags: ["PUBLIC SAFETY", "TRANSPORTATION"],
    },
    {
      slug: "broadway-cannabis-dispensary",
      title: "Should a new cannabis dispensary open at 1271 Broadway?",
      snippet: "Adult-use retailer proposed for 1271 Broadway, hours 10am–9pm. Concerns raised about proximity to shelters and transitional housing. We want to hear from you before we finalize our decision.",
      body: [
        "Adult-use retailer, hours 10am–9pm.",
        "Location concerns: Proximity to shelters and transitional housing; committee members raised issues about access by minors, safety, and potential advertising near shelters.",
        "Applicant's response: Committed to security, ID scanning, and limiting advertising.",
        "Arguments in favor: Provides legal, regulated alternative to illegal sales; contributes to economic development in corridors lacking businesses.",
        "We want to hear from you before we finalize our decision.",
        "Do you support a cannabis dispensary at this location? What conditions, if any, would make you more comfortable with it?",
      ],
      neighborhoods: "Bushwick (11221, 11237)",
      communityBoardCode: "BK-04",
      validZipCodes: ["11221", "11237"],
      tags: ["CANNABIS", "PUBLIC SAFETY", "ECONOMIC DEVELOPMENT"],
    },
    {
      slug: "emerald-dispensary-permanent",
      title: "The Emerald Dispensary (not the same as the Broadway location) has operated on 85 Suydam for two years. Should their temporary license become permanent?",
      snippet: "Moving from provisional to permanent license with strong community support. Issue: proposed hours of 9am–2am and proximity to sensitive community sites. We want to hear from you before we finalize our decision.",
      body: [
        "Moving from provisional to permanent license; operating for two years with strong community support.",
        "Issue: Very long hours (9am–2am); need for cautious consideration because of proximity to sensitive community sites (shelters, youth centers).",
        "We want to hear from you before we finalize our decision.",
        "Do you support making the 85 Suydam Emerald Dispensary's license permanent? And what do you think about the proposed operating hours of 9am to 2am?",
      ],
      neighborhoods: "Bushwick (11221, 11237)",
      communityBoardCode: "BK-04",
      validZipCodes: ["11221", "11237"],
      tags: ["CANNABIS", "LICENSING"],
    },
    {
      slug: "industrial-plan-bushwick",
      title: "The city's new Citywide Industrial Plan puts most of Bushwick's industrial land in a category that could allow nightlife, housing, and non-industrial development. Is that the right call?",
      snippet: "The City Council passed a comprehensive citywide industrial plan in 2024. The plan affects industrial zones across the city, including several in Bushwick. We want to hear from you before we finalize our recommendation.",
      body: [
        "The City Council passed a comprehensive citywide industrial plan in 2024, with the final version reportedly to be released the day after the board meeting.",
        "The plan affects industrial zones across the city, including several in Bushwick and neighboring districts. These zones would allow new uses (nightlife, housing, non-industrial uses), subject to conditions.",
        "We want to hear from you before we finalize our recommendation to the city.",
        "Do you think Bushwick's industrial land should be protected from nightlife, housing, and non-industrial development?",
      ],
      neighborhoods: "Bushwick (11221, 11237), East Williamsburg (11206)",
      communityBoardCode: "BK-04",
      validZipCodes: ["11206", "11221", "11237"],
      tags: ["ZONING", "INDUSTRIAL", "JOBS", "HOUSING"],
    },
    {
      slug: "cathedral-of-joy",
      title: "The Cathedral of Joy at Evergreen and George Knoll (the old Rheingold Brewery cafeteria, currently a church) may be sold. What should happen to the space?",
      snippet: "The congregation is shrinking and potentially selling the space, currently zoned M3-1 industrial. Concern that loss of this site would further erode remaining industrial spaces in Bushwick.",
      body: [
        "Congregation is shrinking and potentially selling the space, which is currently zoned for heavy/intensive (M3-1) industrial use.",
        "Concern that loss of this site to non-industrial or residential development would further erode remaining industrial spaces in Bushwick.",
        "We want to hear from you before we finalize our recommendation to the city.",
        "What do you think should happen to the Cathedral of Joy building if the congregation sells? Should the community fight to preserve it for a particular usage, and if so, what kind?",
      ],
      neighborhoods: "Bushwick (11221, 11237)",
      communityBoardCode: "BK-04",
      validZipCodes: ["11221", "11237"],
      tags: ["HOUSING", "ZONING", "COMMUNITY SPACE"],
    },
  ];

  for (const p of posts) {
    const [created] = await sql`
      INSERT INTO post (
        post_slug, post_creator_id, post_title, post_snippet, post_body,
        post_neighborhoods, post_community_board_code, post_valid_zip_codes,
        post_source_label, post_source_url
      ) VALUES (
        ${p.slug}, ${celestina.user_id}, ${p.title}, ${p.snippet},
        ${JSON.stringify(p.body)}::jsonb, ${p.neighborhoods},
        ${p.communityBoardCode}, ${JSON.stringify(p.validZipCodes)}::jsonb,
        'Read our meeting minutes here', ${MEETING_MINUTES_URL}
      )
      RETURNING post_id, post_slug
    `;
    console.log("Created post:", created.post_slug);

    for (const tagName of p.tags) {
      await sql`
        INSERT INTO tag (tag_name, tag_post_id)
        VALUES (${tagName}, ${created.post_id})
      `;
    }
    console.log("  Tags:", p.tags.join(", "));
  }

  console.log("\nSeed complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
