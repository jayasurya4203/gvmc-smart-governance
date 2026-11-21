export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; details?: unknown };

async function parseJson<T>(res: Response): Promise<ApiResponse<T>> {
  return res.json() as Promise<ApiResponse<T>>;
}

export async function apiGet<T>(path: string): Promise<ApiResponse<T>> {
  const res = await fetch(path, { credentials: "include" });
  return parseJson<T>(res);
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  const res = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return parseJson<T>(res);
}

export async function apiPatch<T>(
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  const res = await fetch(path, {
    method: "PATCH",
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return parseJson<T>(res);
}
