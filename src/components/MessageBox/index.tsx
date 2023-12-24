import React, { FunctionComponent, ReactNode } from 'react';

import './style.scss';

interface MessageBoxProps {
  message: ReactNode;
  title: string;
  variant: 'info' | 'error';
}

const MessageBox: FunctionComponent<MessageBoxProps> = ({ variant, title, message }) => (
  <div className={`message-box ${variant}`}>
    <h3>{title}</h3>
    <div>{message}</div>
  </div>
);

export default MessageBox;
