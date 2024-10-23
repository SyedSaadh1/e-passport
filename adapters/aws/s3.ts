import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IUserProfileDocument } from "../../ui/user/UserProfileContainer";

export const {
  S3_BUCKET_NAME: Bucket = '',
  S3_ACCESS_KEY_ID: accessKeyId = '',
  S3_SECRET_ACCESS_KEY: secretAccessKey = '',
  S3_REGION: region = '',
} = process.env;

export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});


export const uploadFile = async (file: File, key: string) => {
  const Body = (await file.arrayBuffer()) as Buffer;
  return await s3.send(new PutObjectCommand({ Bucket, Key: `${key}/${file.name}`, Body }));
}

export const getFiles = async (prefix: string = ''): Promise<IUserProfileDocument[]> => {
  const input = {
    Bucket, // required
    Prefix: prefix,
    MaxKeys: 100
  };
  const command = new ListObjectsCommand(input);
  const response = await s3.send(command);
  const keys = (response?.Contents || []).map(content => content.Key);
  const fileUrls = await Promise.all(
    keys.map(async (Key) => {
      const command = new GetObjectCommand({ Bucket, Key });
      const id = String(Key);
      // const imageUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${id}`
      const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      const [path = '', filename = ''] = id.split('/');
      const [fileType, extension] = String(filename).split('.');
      return {
        imageUrl,
        id,
        fileType,
        extension,
        path,
      }
    })
  );
  return fileUrls
}
