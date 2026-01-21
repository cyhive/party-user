import { NextResponse } from 'next/server';
import clientPromise from '../../admin/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('party');
        const collection = db.collection('Gallery');

        const items = await collection.find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery items' },
            { status: 500 }
        );
    }
}
