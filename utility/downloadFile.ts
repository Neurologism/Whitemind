const downloaded: Set<string> = new Set();

// launch a download of a file from a uri without opening a new tab
export function downloadFile(uri: string) {
  if (downloaded.has(uri)) return;
  downloaded.add(uri);

  const link = document.createElement('a');
  link.href = uri;
  link.download = uri.split('/').pop() || 'export';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
