import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status });
}

export function zodError(error: ZodError) {
  return jsonError("Validation failed", 400, error.flatten());
}
