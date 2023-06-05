import { RowDataPacket } from "mysql2";
import { QueryModel } from "../database/DatabaseController";

export const CreateSession: QueryModel<
  {id: string, user_id: number, fcm_token: string}
> = {
  sql: `INSERT INTO session (id, user_id, fcm_token) 
        VALUES (:id, :user_id, :fcm_token)`
}

interface SessionInformation extends RowDataPacket {
  id: string,
  user_id: number,
  fcm_token: string
}
export const FindSessionInformationById: QueryModel<
  {id: string},
  SessionInformation
> = {
  sql: `SELECT id, user_id, fcm_token FROM session
        WHERE id=:id`
}
export const FindSessionInformationByUserId: QueryModel<
  {user_id: number},
  SessionInformation
> = {
  sql: `SELECT id, user_id, fcm_token FROM session
        WHERE user_id=:user_id`
}

export const DeleteSession: QueryModel<
  {id: string}
> = {
  sql: `DELETE FROM session WHERE id=:id`
}