import { isTauri } from './platform';

/** Open a URL in the system default browser (desktop) or a new tab (web). */
export async function openExternalLink(url: string): Promise<void> {
  if (isTauri()) {
    const { open } = await import('@tauri-apps/plugin-shell');
    await open(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
