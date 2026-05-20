import { isTauri } from './platform';

export async function exportBackupToFile(
  json: string,
  defaultName: string
): Promise<boolean> {
  if (isTauri()) {
    const { save } = await import('@tauri-apps/plugin-dialog');
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');
    const { downloadDir, join } = await import('@tauri-apps/api/path');

    const suggestedPath = await join(await downloadDir(), defaultName);

    const path = await save({
      defaultPath: suggestedPath,
      filters: [{ name: 'JSON backup', extensions: ['json'] }],
    });
    if (!path) return false;

    await writeTextFile(path, json);
    return true;
  }

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = defaultName;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

export async function importBackupFromFile(): Promise<string | null> {
  if (isTauri()) {
    const { open } = await import('@tauri-apps/plugin-dialog');
    const { readTextFile } = await import('@tauri-apps/plugin-fs');

    const path = await open({
      multiple: false,
      filters: [{ name: 'JSON backup', extensions: ['json'] }],
    });
    if (!path || Array.isArray(path)) return null;

    return readTextFile(path);
  }

  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsText(file);
    };
    input.click();
  });
}
