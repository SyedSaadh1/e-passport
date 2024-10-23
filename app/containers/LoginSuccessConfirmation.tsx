// Please check your email. 
'use client'
import React, { PropsWithChildren } from 'react';
import { Button, Dialog, DialogPanel, TextInput } from '@tremor/react';

export function LoginSuccessConfirmation({
  isOpen,
  onClose
}: PropsWithChildren<{
  isOpen: boolean,
  onClose(isOpen: boolean): void
}>) {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} static={true}>
        <DialogPanel>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Please check your email
            </h3>
            <p className="mt-4 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
              A sign-in link has been sent to your email address for successful login.
            </p>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}