import { readFileSync } from 'fs'
import { resolve } from 'path'
import { EnvFile, NodeEnv } from '@/constants/common/env'

const getEnvFileName = (): string => {
  const nodeEnv = process.env.NODE_ENV
  if (nodeEnv === NodeEnv.PRODUCTION) {
    return EnvFile.PRODUCTION
  }
  if (nodeEnv === NodeEnv.STAGING) {
    return EnvFile.STAGING
  }
  return EnvFile.DEVELOPMENT
}

const extractKeysFromFile = (filename: string): string[] => {
  const path = resolve(process.cwd(), filename)

  try {
    const content = readFileSync(path, 'utf-8')
    return parseEnvKeys(content)
  } catch {
    if (filename === EnvFile.EXAMPLE) {
      throw new Error('.env.example file not found.')
    }
    const envFile = getEnvFileName()
    throw new Error(`${envFile} file not found. Please copy .env.example to ${envFile} and fill in the values.`)
  }
}

const parseEnvKeys = (content: string): string[] => {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.match(/^([A-Z_][A-Z0-9_]*)=/)?.[1])
    .filter((key): key is string => key !== undefined)
}

export const validateEnv = () => {
  const envFile = getEnvFileName()

  try {
    const requiredKeys = extractKeysFromFile(EnvFile.EXAMPLE)

    if (requiredKeys.length === 0) {
      return
    }

    const existingKeys = extractKeysFromFile(envFile)
    const missingKeys = requiredKeys.filter((key) => !existingKeys.includes(key))

    if (missingKeys.length === 0) {
      return
    }

    const missing = missingKeys.join(', ')
    const message = `Missing required environment variables in ${envFile}: ${missing}`
    console.error(message)
    throw new Error(message)
  } catch (e) {
    console.warn(`Env validation skipped: ${e instanceof Error ? e.message : 'file not found'} (values already baked at build time)`)
    return
  }
}
