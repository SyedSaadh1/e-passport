'use server'
import dbClient from "../../prisma/dbClient";
import { IUploadDocuments } from "./form/types";


export async function UsersDocs(values: IUploadDocuments) {
  console.log(":: USERDOCS REGISTER USER ::", values);
}