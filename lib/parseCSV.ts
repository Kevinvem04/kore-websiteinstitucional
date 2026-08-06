export function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"' && row[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(s => s.trim());
}

export function parseClientsCSV(csvContent: string): any[] {
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  const headers = parseCSVRow(lines[0]);
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);
    const obj: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      let val = values[index] || '';
      
      // Conversões específicas da nossa classe Client
      if (header === 'images') {
        const imgs = val.split(',').map(s => s.trim()).filter(Boolean);
        if (imgs.length > 0) {
          obj.mainImage = imgs[0];
          obj.gallery = imgs.slice(1);
        }
      } else if (header === 'tags') {
        obj.tags = val.split(',').map(s => s.trim()).filter(Boolean);
      } else if (header === 'mainImageWidth' || header === 'mainImageHeight') {
        obj[header] = parseInt(val, 10) || 0;
      } else {
        obj[header] = val;
      }
    });
    
    data.push(obj);
  }
  
  return data;
}
