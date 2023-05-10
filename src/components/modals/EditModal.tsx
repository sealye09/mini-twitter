import React, { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useEditModal from '@/hooks/useEditModal';
import Modal from './Modal';

interface EditModalProps {}

const EditModal: FC<EditModalProps> = ({}) => {
  const editStore = useEditModal();

  return (
    <Modal
      title='Profile'
      id='edit'
      actionLabel='Change'
      body={<div>body</div>}
      isOpen={editStore.isOpen}
      onClose={editStore.onClose}
      onSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default EditModal;
