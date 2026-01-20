import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { writeFile } from "fs/promises";
import path from "path";

/* ===================== GET ===================== */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("party");
    const collection = db.collection("Welfare");

    const docs = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const items = docs.map((doc) => ({
      _id: doc._id.toString(),
      ...(doc as Omit<typeof doc, '_id'>),
    }));

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch welfare items" },
      { status: 500 }
    );
  }
}

/* ===================== POST (CREATE) ===================== */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    /* --------UPLOAD ICON IMAGE---------- */
    let iconUrl = "";
    const iconFile = formData.get("icon") as File;

    if (iconFile && iconFile.name) {
      const bytes = await iconFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${iconFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      iconUrl = `/uploads/${fileName}`;
    }

    /* --------TEXT FIELDS---------- */
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";

    if (!title || !iconUrl) {
      return NextResponse.json(
        { error: "Title and icon are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("party");
    const collection = db.collection("Welfare");

    const result = await collection.insertOne({
      title,
      description,
      icon: iconUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newItem = {
      _id: result.insertedId.toString(),
      title,
      description,
      icon: iconUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: "Failed to create welfare item" },
      { status: 500 }
    );
  }
}

/* ===================== PUT (UPDATE) ===================== */
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    /* --------FETCH EXISTING ITEM---------- */
    const client = await clientPromise;
    const db = client.db("party");
    const collection = db.collection("Welfare");

    const existingItem = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    /* --------HANDLE IMAGE UPLOAD---------- */
    let iconUrl = existingItem.icon;
    const iconFile = formData.get("icon") as File;

    if (iconFile && iconFile.name) {
      const bytes = await iconFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${iconFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      iconUrl = `/uploads/${fileName}`;
    }

    /* --------TEXT FIELDS---------- */
    const title = (formData.get("title") as string) || existingItem.title;
    const description = (formData.get("description") as string) || existingItem.description;

    const updateData: Record<string, unknown> = {
      title,
      description,
      icon: iconUrl,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    const updatedItem = {
      _id: id,
      title,
      description,
      icon: iconUrl,
      createdAt: existingItem.createdAt,
      updatedAt: new Date(),
    };

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update welfare item" },
      { status: 500 }
    );
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(req: NextRequest) {
  try {
    const ids = req.nextUrl.searchParams.get("ids");

    if (!ids) {
      return NextResponse.json(
        { error: "IDs are required" },
        { status: 400 }
      );
    }

    const idArray = ids.split(",").map((id) => new ObjectId(id));

    const client = await clientPromise;
    const db = client.db("party");
    const collection = db.collection("Welfare");

    const result = await collection.deleteMany({
      _id: { $in: idArray },
    });

    return NextResponse.json(
      {
        message: "Items deleted successfully",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete welfare items" },
      { status: 500 }
    );
  }
}
