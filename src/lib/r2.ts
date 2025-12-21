// lib/r2.ts
import { S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  endpoint: process.env.CF_R2_ENDPOINT,
  region: 'auto', // R2 tidak butuh region khusus
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
  },
})