import { Router } from "express";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import asyncWrapper from "../utils/asyncWrapper";
import { isAnyUndefined } from "../utils/inputcheck";
import { 
  InvalidParameterError, 
  LoginFailedError, 
  NotFoundError 
} from "../types/errors";
import DatabaseController from "../database/DatabaseController";
import { 
  FindUserCredential, 
  FindUserInformation 
} from "../models/user";
import { 
  CreateSession, 
  DeleteSession, 
  FindSessionInformationByUserId 
} from "../models/session";
import { SESSION_ID_ENCRYPTION } from "../config/encryption";
import { hashSessionId } from "../utils/session";

const loginRouter = Router();

loginRouter.post ("/", asyncWrapper(async (req, res) => {
  if (isAnyUndefined(
    req.body.username, req.body.password, req.body.fcmToken
  )) {
    throw new InvalidParameterError("Invalid request body");
  }

  const userCredentials = await DatabaseController.query(
    FindUserCredential,
    { username: req.body.username }
  );

  if (userCredentials.length != 1) {
    throw new LoginFailedError();
  }

  const userCredential = userCredentials[0];

  if (!bcrypt.compareSync(req.body.password, userCredential.password)) {
    throw new LoginFailedError();
  }

  const sessions = await DatabaseController.query(
    FindSessionInformationByUserId,
    {user_id: userCredential.id}
  );

  if(sessions.length > 0) {
    sessions.forEach(async (session) =>
      await DatabaseController.query(
        DeleteSession, {id: session.id}
      )
    );
  }

  const newSessionId 
    = crypto.randomBytes(SESSION_ID_ENCRYPTION.BYTE_LENGTH)
      .toString(SESSION_ID_ENCRYPTION.ENCODING);
  
  const newSessionIdHash = hashSessionId(newSessionId);

  await DatabaseController.transact(async (query) => {
    await query(
      CreateSession,
      {
        id: newSessionIdHash,
        user_id: userCredential.id, 
        fcm_token: req.body.fcmToken
      }
    );

    const userinfos = await query(
      FindUserInformation, {id: userCredential.id}
    );

    if (userinfos.length != 1) {
      throw new NotFoundError("user not found");
    }
  
    res.status(200).json({
      sessionId: newSessionId,
      user: {
        id: userCredential.id,
        username: userinfos[0].username,
        address: userinfos[0].address,
        major: userinfos[0].major,
        image: userinfos[0].image
      },
      theme: userinfos[0].theme
    });
  });
}));

export default loginRouter;