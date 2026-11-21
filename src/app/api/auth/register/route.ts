import { prisma } from "@/lib/db";
import type { UserRole } from "@/types";
import {
  createSessionToken,
  hashPassword,
  setSessionCookie,
} from "@/lib/auth";
import { jsonError, jsonOk, zodError } from "@/lib/api-utils";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const { email, password, name, phone, role } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return jsonError("Email already registered", 409);

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone,
        role: role ?? "CITIZEN",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        wardId: true,
      },
    });

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role as UserRole,
      name: user.name,
    });
    await setSessionCookie(token);

    return jsonOk({ user }, 201);
  } catch (e) {
    console.error(e);
    return jsonError("Registration failed", 500);
  }
}
