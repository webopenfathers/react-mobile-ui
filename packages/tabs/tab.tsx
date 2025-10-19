import React from 'react';

export interface TabProps {
  key: string;
  title: string;
  children?: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return children ? (children as React.ReactElement) : null;
};

export default Tab;

Tab.displayName = 'Tab';
