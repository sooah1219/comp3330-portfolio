// src/lib/db.js
import { neon } from "@neondatabase/serverless";
import "server-only";

const { NEON_DB_URL } = process.env;
if (!NEON_DB_URL) {
  throw new Error('NEON_DB_URL is missing (tip: include "?sslmode=require").');
}

const sql = neon(NEON_DB_URL);

// ---------- Helpers ----------
function mapProject(row) {
  const srcImg =
    typeof row.img === "string" && row.img.trim()
      ? row.img
      : typeof row.image === "string" && row.image.trim()
      ? row.image
      : null;

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: srcImg,
    link: row.link,
    keywords: row.keywords ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getProjectImageColumns() {
  const rows = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'projects'
      AND column_name IN ('img', 'image')
  `;
  const names = rows.map((r) => r.column_name);
  return {
    hasImg: names.includes("img"),
    hasImage: names.includes("image"),
  };
}

// ---------- Schema / Migration ----------
export async function ensureProjectsTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

  // Create with modern columns if not exists
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text NOT NULL,
      img text,
      link text,
      keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  // Backfill/augment for legacy schemas
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS img text`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS link text`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS keywords jsonb NOT NULL DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now()`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now()`;

  // If both img and image exist, sync missing values both ways once
  const { hasImg, hasImage } = await getProjectImageColumns();
  if (hasImg && hasImage) {
    await sql`
      UPDATE projects
      SET img = COALESCE(img, NULLIF(image, ''))
      WHERE (img IS NULL OR img = '') AND (image IS NOT NULL AND image <> '')
    `;
    await sql`
      UPDATE projects
      SET image = COALESCE(image, NULLIF(img, ''))
      WHERE (image IS NULL OR image = '') AND (img IS NOT NULL AND img <> '')
    `;
  }
}

// ---------- Queries ----------
export async function fetchProjects() {
  await ensureProjectsTable();
  const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
  return rows.map(mapProject);
}

export async function getProjectById(id) {
  await ensureProjectsTable();
  const rows = await sql`SELECT * FROM projects WHERE id = ${id} LIMIT 1`;
  return rows[0] ? mapProject(rows[0]) : null;
}

export async function insertProject(data) {
  await ensureProjectsTable();
  const { hasImg, hasImage } = await getProjectImageColumns();
  const imgValue = data.image ?? data.img ?? null;
  const keywordsJson = JSON.stringify(data.keywords || []);

  let rows;
  if (hasImg && hasImage) {
    rows = await sql`
      INSERT INTO projects (title, description, img, image, link, keywords)
      VALUES (${data.title}, ${data.description}, ${imgValue}, ${imgValue}, ${data.link}, ${keywordsJson}::jsonb)
      RETURNING *
    `;
  } else if (hasImg) {
    rows = await sql`
      INSERT INTO projects (title, description, img, link, keywords)
      VALUES (${data.title}, ${data.description}, ${imgValue}, ${data.link}, ${keywordsJson}::jsonb)
      RETURNING *
    `;
  } else {
    rows = await sql`
      INSERT INTO projects (title, description, image, link, keywords)
      VALUES (${data.title}, ${data.description}, ${imgValue}, ${data.link}, ${keywordsJson}::jsonb)
      RETURNING *
    `;
  }

  return mapProject(rows[0]);
}

export async function updateProject(id, updates) {
  await ensureProjectsTable();
  const { hasImg, hasImage } = await getProjectImageColumns();

  const keywordsJson =
    typeof updates.keywords === "undefined"
      ? null
      : JSON.stringify(updates.keywords || []);

  const imageValue = updates.image ?? updates.img ?? null;

  let rows;
  if (hasImg && hasImage) {
    rows = await sql`
      UPDATE projects
      SET
        title = COALESCE(${updates.title}, title),
        description = COALESCE(${updates.description}, description),
        link = COALESCE(${updates.link}, link),
        keywords = COALESCE(${keywordsJson}::jsonb, keywords),
        img = COALESCE(${imageValue}, img),
        image = COALESCE(${imageValue}, image),
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
  } else if (hasImg) {
    rows = await sql`
      UPDATE projects
      SET
        title = COALESCE(${updates.title}, title),
        description = COALESCE(${updates.description}, description),
        link = COALESCE(${updates.link}, link),
        keywords = COALESCE(${keywordsJson}::jsonb, keywords),
        img = COALESCE(${imageValue}, img),
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
  } else {
    rows = await sql`
      UPDATE projects
      SET
        title = COALESCE(${updates.title}, title),
        description = COALESCE(${updates.description}, description),
        link = COALESCE(${updates.link}, link),
        keywords = COALESCE(${keywordsJson}::jsonb, keywords),
        image = COALESCE(${imageValue}, image),
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
  }

  return rows[0] ? mapProject(rows[0]) : null;
}

export async function deleteProject(id) {
  await ensureProjectsTable();
  const rows = await sql`DELETE FROM projects WHERE id = ${id} RETURNING *`;
  return rows[0] ? mapProject(rows[0]) : null;
}

// ---------- Seed ----------
export const seedProjectsData = [
  {
    title: "Rental Marketplace App",
    description:
      "A mobile-first marketplace app where users can list, browse, and rent items from each other",
    img: "/images/lendItOut.png",
    link: "#",
    keywords: ["TypeScript", "SCSS", "Node.js", "Express", "Prisma", "MongoDB"],
  },
  {
    title: "Gamified Skilled Trades Pathway App",
    description:
      "A mobile app that helps high-school students explore skilled trades through an interactive AI mentor, real-world apprenticeship simulations, and a badge-based progression system.",
    img: "/images/forge.png",
    link: "#",
    keywords: [
      "React Native",
      "Tailwind CSS",
      "TypeScript",
      "Hono",
      "Bun",
      "Drizzle ORM",
      "Neon DB",
    ],
  },
  {
    title: "Expense Tracker",
    description:
      "A personal expense tracker that lets users log spending, attach receipt images, and keep purchase history organized in one place.",
    img: "/images/expense.png",
    link: "#",
    keywords: [
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Hono",
      "Bun",
      "Drizzle ORM",
      "Neon DB",
    ],
  },
];

export async function seedInitialProjects() {
  await ensureProjectsTable();
  const { hasImg, hasImage } = await getProjectImageColumns();

  for (const p of seedProjectsData) {
    const imgValue = p.img ?? p.image ?? null;
    const keywordsJson = JSON.stringify(p.keywords || []);

    if (hasImg && hasImage) {
      await sql`
        INSERT INTO projects (title, description, img, image, link, keywords)
        VALUES (${p.title}, ${p.description}, ${imgValue}, ${imgValue}, ${p.link}, ${keywordsJson}::jsonb)
        ON CONFLICT DO NOTHING
      `;
    } else if (hasImg) {
      await sql`
        INSERT INTO projects (title, description, img, link, keywords)
        VALUES (${p.title}, ${p.description}, ${imgValue}, ${p.link}, ${keywordsJson}::jsonb)
        ON CONFLICT DO NOTHING
      `;
    } else {
      await sql`
        INSERT INTO projects (title, description, image, link, keywords)
        VALUES (${p.title}, ${p.description}, ${imgValue}, ${p.link}, ${keywordsJson}::jsonb)
        ON CONFLICT DO NOTHING
      `;
    }
  }
}

// ---- HERO single-row helpers ----
const HERO_PLACEHOLDER_AVATAR = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

const defaultHeroContent = {
  avatar: HERO_PLACEHOLDER_AVATAR,
  fullName: "Your Name",
  shortDescription: "Short hero tagline (<=120 chars).",
  longDescription:
    "This is a longer description that explains your focus, stack, or mission.",
};

function mapHeroRow(row) {
  return {
    id: row.id,
    avatar: row.avatar || defaultHeroContent.avatar,
    fullName: row.fullName || defaultHeroContent.fullName,
    shortDescription:
      row.shortDescription || defaultHeroContent.shortDescription,
    longDescription: row.longDescription || defaultHeroContent.longDescription,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function ensureHeroTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  await sql`
    CREATE TABLE IF NOT EXISTS hero (
      id uuid PRIMARY KEY,
      avatar text NOT NULL DEFAULT '',
      full_name text NOT NULL,
      short_description text NOT NULL CHECK (char_length(short_description) <= 120),
      long_description text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM hero`;
  if (Number(count) === 0) {
    await seedHeroTable();
  }
}

async function seedHeroTable() {
  await sql`
    INSERT INTO hero (id, avatar, full_name, short_description, long_description)
    VALUES (
      gen_random_uuid(),
      ${defaultHeroContent.avatar},
      ${defaultHeroContent.fullName},
      ${defaultHeroContent.shortDescription},
      ${defaultHeroContent.longDescription}
    )
  `;
}

export async function getHero() {
  await ensureHeroTable();
  const rows = await sql`
    SELECT
      id,
      avatar,
      full_name       AS "fullName",
      short_description AS "shortDescription",
      long_description  AS "longDescription",
      created_at      AS "createdAt",
      updated_at      AS "updatedAt"
    FROM hero
    ORDER BY created_at ASC
    LIMIT 1
  `;
  return rows[0] ? mapHeroRow(rows[0]) : mapHeroRow({});
}

export async function upsertHero(updates = {}) {
  await ensureHeroTable();
  const current = await getHero();

  // merge defaults → current → updates
  const merged = {
    ...defaultHeroContent,
    ...current,
    ...updates,
  };

  const fullName = String(merged.fullName || "")
    .trim()
    .slice(0, 200);
  const shortDescription = String(merged.shortDescription || "")
    .trim()
    .slice(0, 120);
  const longDescription = String(merged.longDescription || "")
    .trim()
    .slice(0, 5000);

  // avatar must be data URL or empty
  const avatar =
    typeof merged.avatar === "string" && merged.avatar.startsWith("data:")
      ? merged.avatar
      : defaultHeroContent.avatar;

  // if no row, insert; else update
  const rows = await sql`SELECT id FROM hero LIMIT 1`;
  if (rows.length === 0) {
    const ins = await sql`
      INSERT INTO hero (id, avatar, full_name, short_description, long_description)
      VALUES (
        gen_random_uuid(),
        ${avatar},
        ${fullName},
        ${shortDescription},
        ${longDescription}
      )
      RETURNING
        id,
        avatar,
        full_name       AS "fullName",
        short_description AS "shortDescription",
        long_description  AS "longDescription",
        created_at      AS "createdAt",
        updated_at      AS "updatedAt"
    `;
    return mapHeroRow(ins[0]);
  } else {
    const rowId = rows[0].id;
    const upd = await sql`
      UPDATE hero
      SET
        avatar            = ${avatar},
        full_name         = ${fullName},
        short_description = ${shortDescription},
        long_description  = ${longDescription},
        updated_at        = now()
      WHERE id = ${rowId}
      RETURNING
        id,
        avatar,
        full_name       AS "fullName",
        short_description AS "shortDescription",
        long_description  AS "longDescription",
        created_at      AS "createdAt",
        updated_at      AS "updatedAt"
    `;
    return mapHeroRow(upd[0]);
  }
}

export { defaultHeroContent, HERO_PLACEHOLDER_AVATAR };
