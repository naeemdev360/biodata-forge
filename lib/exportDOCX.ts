import type { BiodataFormData, CustomizationState } from '@/types/biodata';

/**
 * Sends the rendered biodata HTML (`#biodata-print-target`) to the server,
 * where `html-to-docx` runs (Node-only), then downloads the DOCX.
 */
export async function exportToDOCX(
  formData: BiodataFormData,
  _customization: CustomizationState
): Promise<void> {
  void _customization;

  const target = document.getElementById('biodata-print-target');
  if (!target) throw new Error('Print target not found');

  const res = await fetch('/api/export/docx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html: target.outerHTML }),
  });

  if (!res.ok) throw new Error('DOCX export failed');

  const blob = await res.blob();

  const url = URL.createObjectURL(blob);
  const name = formData.personal.fullName || 'Biodata';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}_Biodata_${date}.docx`;
  link.click();
  URL.revokeObjectURL(url);
}
