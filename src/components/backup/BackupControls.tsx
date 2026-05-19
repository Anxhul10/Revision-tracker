import { useRef } from 'react';
import { Button } from '../ui/Button';

interface BackupControlsProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

export function BackupControls({ onExport, onImport }: BackupControlsProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImport(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onExport}>
        Export JSON
      </Button>
      <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>
        Import JSON
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
