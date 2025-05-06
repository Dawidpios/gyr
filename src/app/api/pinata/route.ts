import { NextRequest, NextResponse } from "next/server";

import pinata from "@components/lib/pinata";

export async function POST(request: NextRequest) {
  try {
    console.log('PINATA_API_KEY=', process.env.PINATA_JWT);
    console.log('PINATA_SECRET_API_KEY=', process.env.PINATA_GATEWAY_URL);
    const data = await request.formData()
    const file : File | null = data.get('file') as unknown as File
    const { cid } = await pinata.upload.public.file(file)
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json({ url }, { status: 200 })
  } catch(e) {
    console.log(e)
    return NextResponse.json({error: "Server Error"}, {status: 500})
  }
}

