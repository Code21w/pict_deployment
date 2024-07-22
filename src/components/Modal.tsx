'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { Button } from '@/components/ui/button';
import { Title } from '@radix-ui/react-toast';

interface ModalProps {
  button: ReactNode;
  title: string;
  content: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ button, title, content }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{button}</button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        {content}
        {/* <DialogFooter> */}
        {/* <button type='submit'>Save changes</button> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
