import { RowDataPacket } from "mysql2"
import { QueryModel } from "../database/DatabaseController"

interface UserCredential extends RowDataPacket {
  id: number,
  password: string
}
export const FindUserCredential: QueryModel<
  {username: string},
  UserCredential
> = {
  sql: "SELECT id, password FROM user WHERE username=:username;"
}

interface UserInformation extends RowDataPacket {
  username: string,
  address: string,
  major: string,
  image: number,
  theme: number
}
export const FindUserInformation: QueryModel<
  {id: number},
  UserInformation
> = {
  sql: `SELECT username, address, major, image, theme FROM user
        WHERE id=:id;`
}