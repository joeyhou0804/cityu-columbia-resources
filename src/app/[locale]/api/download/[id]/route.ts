import { NextRequest, NextResponse } from 'next/server';
import { getResourceById, incrementDownloadCount } from '@/lib/resources';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resource = getResourceById(params.id);
    
    if (!resource || resource.type !== 'pdf' || !resource.file) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Increment download count
    await incrementDownloadCount(params.id);

    // Get file path
    const filePath = join(process.cwd(), 'public', resource.file);
    
    try {
      const fileBuffer = await readFile(filePath);
      
      return new Response(new Uint8Array(fileBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${params.id}.pdf"`,
        },
      });
    } catch (fileError) {
      return NextResponse.json(
        { error: 'File not found' }, 
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}