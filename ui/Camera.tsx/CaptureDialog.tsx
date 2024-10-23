// 'use client';
import { Button, Dialog, DialogPanel } from '@tremor/react';
import { RiCloseLine } from '@remixicon/react';
import Capture from './Capture';
import { useCameraContext } from './CameraProvider';


const CaptureDialog = () => {
  const { isOpen = false, closeDialog } = useCameraContext();

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      static={true}
      className="z-[100]"
    >
      <DialogPanel className="sm:max-w-md">
        <div className="absolute right-0 top-0 pr-3 pt-3">
          <Button
            type="button"
            variant='light'
            onClick={closeDialog}
            aria-label="Close"
          >
            <RiCloseLine
              className="h-5 w-5 shrink-0"
              aria-hidden={true}
            />
          </Button>
        </div>

        {isOpen && <Capture  />}
      </DialogPanel>
    </Dialog>
  );
}

export default CaptureDialog;


