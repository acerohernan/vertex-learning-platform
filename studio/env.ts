export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-12'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "qa2b382s",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  console.log("ENV VARIABLES", process.env);
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
