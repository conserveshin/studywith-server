import { Request } from "express";
import crypto from "crypto";
import { SESSION_ID_ENCRYPTION } from "../config/encryption";

export const getSessionFromRequest = (req: Request) => {
  return req.headers.authorization?.split('Basic ')[1];
};

export const hashSessionId = (sessionId: string) => {
  return crypto.createHash(SESSION_ID_ENCRYPTION.HASH)
    .update(sessionId)
    .digest(SESSION_ID_ENCRYPTION.HASH_ENCODING);
}