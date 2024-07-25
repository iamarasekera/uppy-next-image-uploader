import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function GET() {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
  });

  try {
    const data = await s3Client.send(command);
    const images = data.Contents?.map(item => ({
      key: item.Key,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
    })) || [];
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing objects:', error);
    return NextResponse.json({ error: 'Error listing objects' }, { status: 500 });
  }
}