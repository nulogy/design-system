import React from 'react';
import { Modal } from '../../../../';
import type { Styles } from 'react-modal';

type ExtendedModalProps = React.ComponentProps<typeof Modal> & {
  style?: Styles;
};

const ExtendedModal: React.FC<ExtendedModalProps> = ({ children, ...props }) => {
  return (
    <Modal {...props}>
      {children}
    </Modal>
  );
};

export default ExtendedModal; 