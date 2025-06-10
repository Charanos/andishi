import clientPromise from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { startProjectFormSchema } from '@/lib/formSchema';

// This handler receives form submissions from the Start Project form
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = startProjectFormSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('projects');
    const result = await collection.insertOne({ ...parsed.data, createdAt: new Date() });

    return NextResponse.json({ success: true, message: 'Form submitted and saved to database', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit form', error: error instanceof Error ? error.message : error });
  }
}

