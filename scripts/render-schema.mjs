import { readFile, writeFile } from "node:fs/promises";

const sourceUrl = new URL("../prisma/schema.prisma", import.meta.url);
const targetUrl = new URL("../prisma/schema.postgres.prisma", import.meta.url);

const source = await readFile(sourceUrl, "utf8");
const postgresSchema = source.replace(
  'provider = "sqlite"',
  'provider = "postgresql"',
);

if (postgresSchema === source) {
  throw new Error('No sqlite provider found in prisma/schema.prisma');
}

await writeFile(targetUrl, postgresSchema);
console.log("Generated prisma/schema.postgres.prisma");
