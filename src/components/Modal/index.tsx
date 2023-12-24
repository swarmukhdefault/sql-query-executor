import React, { FunctionComponent, ReactNode } from 'react';

import './style.scss';

interface ModalProps {
  children: ReactNode;
  className?: string;
  id?: string;
  visible: boolean;
  width?: number;
}

const Modal: FunctionComponent<ModalProps> = ({ id, visible, children, width, className }) =>
  visible && (
    <div className='modal-backdrop'>
      <div id={id} className={`modal-body ${className}`} style={{ minWidth: `${width}px` }}>
        {children}
      </div>
    </div>
  );

Modal.defaultProps = {
  className: '',
  id: 'modal-id',
  width: 240
};

export default Modal;
