import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface AddModeModalProps {
  open: boolean;
  onClose: () => void;
  onSelectNormal: () => void;
  onSelectTheory: () => void;
}

export function AddModeModal({
  open,
  onClose,
  onSelectNormal,
  onSelectTheory,
}: AddModeModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Add">
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          variant="secondary"
          className="h-24 flex-col items-start px-4 text-left"
          onClick={onSelectNormal}
        >
          <span className="text-base text-gray-100">Normal Mode</span>
          <span className="text-xs font-normal text-gray-500">Add a coding question</span>
        </Button>
        <Button
          variant="secondary"
          className="h-24 flex-col items-start px-4 text-left"
          onClick={onSelectTheory}
        >
          <span className="text-base text-gray-100">Theory Mode</span>
          <span className="text-xs font-normal text-gray-500">Add notes for revision</span>
        </Button>
      </div>
    </Modal>
  );
}
