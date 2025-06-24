import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

const secretCache = new Map<string, string>()

export class GcpUtils {
  public async getSecret(
    secretName: string,
    projectId: string,
    credServiceAccount?: string
  ) {
    // Cek cache terlebih dahulu
    if (secretCache.has(secretName)) {
      console.log(`Retrieving ${secretName} from cache`)
      return secretCache.get(secretName)!
    }

    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        'Only on production environment is allowed to access secrets'
      )
    }
    const client = new SecretManagerServiceClient(
      credServiceAccount
        ? { credentials: JSON.parse(credServiceAccount) }
        : undefined
    )
    const name = `projects/${projectId}/secrets/${secretName}/versions/latest`
    console.log('Accessing secret:', name)

    const [version] = await client.accessSecretVersion({ name })
    const payload = version.payload?.data?.toString()

    if (!payload) {
      throw new Error('Failed to load secret payload', {
        cause: name,
      })
    }
    console.log(
      `Successfully loaded ${secretName} from Secret Manager`
    )

    // Simpan ke cache sebelum mengembalikan
    secretCache.set(secretName, payload)
    return payload
  }
}
