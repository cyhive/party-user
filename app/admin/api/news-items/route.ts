import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

/* ===================== GET ===================== */
export async function GET() {
  const client = await clientPromise;
  const db = client.db("party");
  const collection = db.collection("News");

  const items = await collection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(items);
}

/* ===================== POST ===================== */
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const images: string[] = [];
  const files = formData.getAll("images") as File[];

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    images.push(`data:${file.type};base64,${base64}`);
  }

  const item = {
    title,
    description: description || "",
    images,
    createdAt: new Date(),
  };

  const client = await clientPromise;
  const db = client.db("party");
  const collection = db.collection("News");

  const result = await collection.insertOne(item);

  return NextResponse.json(
    { ...item, _id: result.insertedId },
    { status: 201 }
  );
}

/* ===================== PUT ===================== */
export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const existingImages = JSON.parse(
    (formData.get("existingImages") as string) || "[]"
  );
  const removedImages = JSON.parse(
    (formData.get("removedImages") as string) || "[]"
  );

  const keepImages = existingImages.filter(
    (img: string) => !removedImages.includes(img)
  );

  const newImages: string[] = [];
  const files = formData.getAll("images") as File[];

  for (const file of files) {
    if (file.size > 0) {
      const buffer = await file.arrayBuffer();
      newImages.push(
        `data:${file.type};base64,${Buffer.from(buffer).toString("base64")}`
      );
    }
  }

  const updated = {
    title,
    description: description || "",
    images: [...keepImages, ...newImages],
    updatedAt: new Date(),
  };

  const client = await clientPromise;
  const db = client.db("party");
  const collection = db.collection("News");

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updated }
  );

  return NextResponse.json({ _id: id, ...updated });
}

/* ===================== DELETE ===================== */
export async function DELETE(request: NextRequest) {
  const ids =
    request.nextUrl.searchParams.get("ids")?.split(",") || [];

  const client = await clientPromise;
  const db = client.db("party");
  const collection = db.collection("News");

  await collection.deleteMany({
    _id: { $in: ids.map((id) => new ObjectId(id)) },
  });

  return NextResponse.json({ success: true });
}
