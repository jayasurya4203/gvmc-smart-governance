import { prisma } from "@/lib/db";
import type { UserRole } from "@/types";
import {
  createSessionToken,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { jsonError, jsonOk, zodError } from "@/lib/api-utils";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return jsonError("Invalid email or password", 401);
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role as UserRole,
      name: user.name,
    });
    await setSessionCookie(token);

    return jsonOk({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        wardId: user.wardId,
      },
    });
  } catch (e) {
    console.error(e);
    return jsonError("Login failed", 500);
  }
}
