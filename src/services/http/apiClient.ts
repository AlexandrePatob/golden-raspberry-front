export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export async function get<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
  signal?: AbortSignal,
): Promise<T> {
  const url = new URL(path, baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
  })
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new ApiError(`Não foi possível carregar os dados (${response.status}).`, response.status)
  return response.json() as Promise<T>
}
