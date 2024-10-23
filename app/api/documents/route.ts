import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "../../../adapters/aws/s3";
import { getServerSession } from "next-auth";
import { getLoggedInUser, getUserDetailsByEmail } from "../../../services/users.service";

export async function GET() {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ error: 'User Session is required' }, { status: 403 })
  }
  return NextResponse.json({ user });
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ error: 'User Session is required' }, { status: 403 })
  }
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const response = await Promise.all(
    files.map(async (file) => {
      // // not sure why I have to override the types here
      // const Body = (await file.arrayBuffer()) as Buffer;
      // return await s3.send(new PutObjectCommand({ Bucket, Key: `epassport/${file.name}`, Body }));
      return await uploadFile(file, user?.ePassportUserId);
    })
  );

  return NextResponse.json(response);
}