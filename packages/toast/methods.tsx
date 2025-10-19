import ReactDOM from 'react-dom/client';
import { default as Toast, type ToastProps } from './toast';

export type ToastShowProps = ToastProps;

/**
 * 通过show方法调用创建并显示Toast
 * @param p 提示内容
 */
export const show = (p: ToastShowProps | string) => {
  // 归一：统一参数格式--无论传递什么类型的参数都放在一个对象中{ content: p }
  const props = typeof p === 'string' ? { content: p } : p;

  // 创建容器
  const container = document.createElement('div');
  // 追加到body
  document.body.appendChild(container);

  // 创建react根节点，并将其挂载到指定的 container DOM 容器中，用于渲染 React 应用。
  const root = ReactDOM.createRoot(container);

  // 卸载
  const unmount = () => {
    document.body.removeChild(container);
    root.unmount();
  };

  // 渲染
  {/* @ts-ignore */ }
  root.render(<Toast {...props} unmount={unmount} />);
};
