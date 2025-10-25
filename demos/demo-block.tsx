import React from "react";

import './index.css';

interface DemoBlockProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const DemoBlock: React.FC<DemoBlockProps> = (props) => {
  return (
    <>
      <div className="demo-block-header">{props.title}</div>
      <div className="demo-block-content" style={props.style}>{props.children}</div>
    </>
  );
}

export default DemoBlock;
