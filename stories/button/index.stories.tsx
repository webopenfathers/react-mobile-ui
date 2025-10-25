import React from "react";

import { Meta } from "@storybook/react";
import Button from "@/button";
import Space from "@/space";
import DemoWap from '../../demos/demo-wrap';
import DemoBlock from '../../demos/demo-block';


const ButtonStory: Meta = {
  title: "通用/Button按钮",
  component: Button,
}



export const Basic = () => {
  return <DemoWap>
    <DemoBlock title="填充模式">
      <Space wrap>
        <Button color="primary" fill="solid">Solid</Button>
        <Button color="primary" fill="outline">Outline</Button>
        <Button color="primary" fill="none">None</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="按钮颜色">
      <Space wrap>
        <Button >Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
        <Button color="danger">Danger</Button>
        <Button color="warning">Warning</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="块级按钮">

      <Button block size="large" color="primary">Block Button</Button>

    </DemoBlock>


    <DemoBlock title="按钮尺寸">
      <Space wrap>
        <Button >Default</Button>
        <Button color="primary" size="small">small</Button>
        <Button color="primary" size="middle">middle</Button>
        <Button color="primary" size="large">large</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="按钮形状">
      <Space wrap>
        <Button color="primary" shape="default">default</Button>
        <Button color="primary" shape="rounded">rounded</Button>
        <Button color="primary" shape="rectangular">rectangular</Button>
      </Space>
    </DemoBlock>
  </DemoWap >
}


Basic.storyName = "基础用法"

export default ButtonStory;
