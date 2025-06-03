// app/api/upload/route.ts
import ImageKit from 'imagekit';
import { NextRequest, NextResponse } from 'next/server';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Файл не надано' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: '/profiles',
    });

    return NextResponse.json({ url: response.url });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження зображення' }, { status: 500 });
  }
}
