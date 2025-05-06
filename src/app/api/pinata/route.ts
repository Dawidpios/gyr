import { NextRequest, NextResponse } from "next/server";

import pinata from "@components/lib/pinata";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const options = {
      pinataMetadata: {
        name: file.name || "uploaded_file",
      },
    };

    const { IpfsHash: cid } = await pinata.pinFileToIPFS(file, options);
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
