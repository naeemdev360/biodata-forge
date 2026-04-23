import type { BiodataFormData, CustomizationState } from '@/types/biodata';

export async function exportToPDF(
  formData: BiodataFormData,
  _customization: CustomizationState
): Promise<void> {
  const target = document.getElementById('biodata-print-wrapper');
  if (!target) throw new Error('Print target not found');

  const name = formData.personal.fullName || 'Biodata';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const prevTitle = document.title;
  document.title = `${name}_Biodata_${date}`;

  window.print();

  document.title = prevTitle;
}
