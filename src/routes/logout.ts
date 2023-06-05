import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { 
  getSessionFromRequest,
  hashSessionId,
} from "../utils/session";
import { SessionAuthorizationFailedError } from "../types/errors";
import DatabaseController from "../database/DatabaseController";
import { DeleteSession, FindSessionInformationById } from "../models/session";

const logoutRouter = Router();

logoutRouter.delete("/", asyncWrapper(async (req, res) => {
  const sessionId = getSessionFromRequest(req);
  if (sessionId === undefined) {
    throw new SessionAuthorizationFailedError('No session ID in header');
  }

  const hashedId = hashSessionId(sessionId);

  const sessions = await DatabaseController.query(
    FindSessionInformationById,
    { id : hashedId }
  );

  if (sessions.length != 1) {
    throw new SessionAuthorizationFailedError('Session not found');
  }

  await DatabaseController.query(
    DeleteSession,
    { id: hashedId }
  );

  res.sendStatus(204);
}));

export default logoutRouter;