import { Button } from '../ui/Button';

interface BackupControlsProps {
  onExport: () => void;
  onImport: () => void;
}

export function BackupControls({ onExport, onImport }: BackupControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onExport}>
        Export JSON
      </Button>
      <Button variant="ghost" size="sm" onClick={onImport}>
        Import JSON
      </Button>
    </div>
  );
}
