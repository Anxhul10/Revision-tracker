import { isTauri } from './platform';

/** Open a URL in the system browser (desktop) or a new tab (web). */
export async function openExternalLink(url: string): Promise<void> {
  if (isTauri()) {
    const { openUrl } = await import('@tauri-apps/plugin-opener');
    await openUrl(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
