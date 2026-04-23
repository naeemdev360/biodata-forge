import { NextRequest, NextResponse } from 'next/server';

const MAX_HTML_BYTES = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('html' in body) ||
    typeof (body as { html: unknown }).html !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing html string' }, { status: 400 });
  }

  const html = (body as { html: string }).html;
  if (html.length > MAX_HTML_BYTES) {
    return NextResponse.json({ error: 'HTML too large' }, { status: 413 });
  }

  const htmlDoc = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Biodata</title></head>
<body>${html}</body>
</html>`;

  const { default: HTMLtoDOCX } = await import('html-to-docx');
  const fileBuffer = await HTMLtoDOCX(htmlDoc, null, {
    orientation: 'portrait',
    margins: { top: 720, right: 720, bottom: 720, left: 720 },
    pageSize: { width: 12240, height: 15840 },
  });

  let data: Uint8Array;
  if (fileBuffer instanceof Blob) {
    data = new Uint8Array(await fileBuffer.arrayBuffer());
  } else if (Buffer.isBuffer(fileBuffer)) {
    data = new Uint8Array(fileBuffer);
  } else {
    data = new Uint8Array(fileBuffer as ArrayBuffer);
  }

  const arrayBuffer = data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength
  ) as ArrayBuffer;

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename="biodata.docx"',
    },
  });
}
