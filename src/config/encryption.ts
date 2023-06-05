import { BinaryToTextEncoding } from "crypto"

export const PASSWORD_ENCRYPTION = {
  COST_FACTOR: 10
}

export const SESSION_ID_ENCRYPTION = {
  BYTE_LENGTH: 16,
  ENCODING: 'hex' as BufferEncoding,
  HASH: 'sha256',
  HASH_ENCODING: 'hex' as BinaryToTextEncoding
}