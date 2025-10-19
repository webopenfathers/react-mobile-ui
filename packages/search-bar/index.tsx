import React from 'react';
import Input, { type InputRef } from '@/input';

import { SearchOutline } from 'antd-mobile-icons';

import './styles/index.scss';

type TStyle = Partial<
  Record<'--color' | '--background' | '--search-background' | '--border-radius' | '--placeholder-color', string>
>;

export type SearchBarRef = InputRef;

export interface SearchBarProps {
  /** 输入内容 */
  value?: string;
  /** 提示文本 */
  placeholder?: string;
  /** 搜索框前缀图标 */
  icon?: React.ReactNode;
  /** 输入的最大字符数 */
  maxLength?: number;
  /** 是否显示清除图标，可点击清除文本框 */
  clearable?: boolean;
  /** 禁止输入 */
  disabled?: boolean;
  style?: React.CSSProperties & TStyle;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 点击取消按钮时触发事件 */
  onCancel?: () => void;
  /** 输入框回车键触发事件 */
  onSearch?: (val: string) => void;
  /** 输入框内容变化时触发事件 */
  onChange?: (val: string) => void;
  /** 点击清除图标时触发事件 */
  onClear?: () => void;
}

const classPrefix = 'ygm-search-bar';

const SearchBar = React.forwardRef<SearchBarRef, SearchBarProps>(
  (
    {
      value = '',
      icon = <SearchOutline />,
      clearable = true,
      cancelText = '取消',
      style,
      onSearch,
      placeholder,
      disabled,
      maxLength,
      onClear,
      showCancel,
      onCancel,
      onChange,
    },
    ref
  ) => {
    const [valueK, setValue] = React.useState<string>(value ?? '');
    const inputRef = React.useRef<SearchBarRef>(null);
    const composingRef = React.useRef<boolean>(false);

    React.useImperativeHandle(ref, () => ({
      clear: () => inputRef.current?.clear(),
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      setValue: (val: string) => inputRef.current?.setValue(val),
    }));

    const handleInputChange = (value: string) => {
      setValue(value);
      onChange?.(value);
    };

    const onEnterPress = () => {
      if (!composingRef.current) {
        inputRef.current?.blur();
        onSearch?.(valueK);
      }
    };

    return (
      <div className={classPrefix} style={style}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-content-icon`}>{icon}</div>
          <Input
            ref={inputRef}
            className={`${classPrefix}-content-input`}
            style={{ '--placeholder-color': style?.['--placeholder-color'] }}
            placeholder={placeholder}
            value={valueK}
            disabled={disabled}
            maxLength={maxLength}
            clearable={clearable}
            type="search"
            onChange={handleInputChange}
            onClear={onClear}
            onEnterPress={onEnterPress}
            onCompositionStart={() => {
              composingRef.current = true;
            }}
            onCompositionEnd={() => {
              composingRef.current = false;
            }}
          />
        </div>
        {showCancel && (
          <div className={`${classPrefix}-content-cancel`} role="button" onClick={onCancel}>
            {cancelText}
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
