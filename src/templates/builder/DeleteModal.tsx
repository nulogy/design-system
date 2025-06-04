import React from "react";
import { Modal, Text, ButtonGroup, DangerButton, QuietButton } from "../../index";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName?: string;
  itemType?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  itemType = "record",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      title={title}
      footerContent={
        <ButtonGroup>
          <DangerButton onClick={onConfirm}>Delete</DangerButton>
          <QuietButton onClick={onClose}>Cancel</QuietButton>
        </ButtonGroup>
      }
    >
      <Text>
        Are you sure you want to delete {itemName ? `${itemType} ${itemName}` : `this ${itemType}`}? This action cannot be undone.
      </Text>
    </Modal>
  );
};

export default DeleteModal; 