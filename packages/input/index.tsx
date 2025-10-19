import React from 'react';
import cx from 'classnames';

import { CloseCircleFill } from 'antd-mobile-icons';

import './styles/index.scss';

type TStyle = Partial<Record<'--color' | '--placeholder-color', string>>;

export interface InputRef {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  setValue: (val: string) => void;
}

export interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  /** 是否显示清除icon */
  clearable?: boolean;
  style?: React.CSSProperties & TStyle;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  pattern?: string;
  name?: string;
  autoComplete?: 'on' | 'off';
  autoCapitalize?: 'on' | 'off';
  autoCorrect?: 'on' | 'off';
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  type?: React.HTMLInputTypeAttribute;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (val: string) => void;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const classPrefix = `ygm-input`;

const Input = React.forwardRef<InputRef, InputProps>(
  (
    {
      autoComplete = 'off',
      autoCapitalize = 'off',
      autoCorrect = 'off',
      value = '',
      id = 'ygm-input',
      type = 'text',
      onEnterPress,
      onKeyDown,
      clearable,
      readOnly,
      disabled,
      style,
      placeholder,
      maxLength,
      onChange,
      onClear,
      onBlur,
      onFocus,
      onCompositionStart,
      onCompositionEnd,
      autoFocus,
      minLength,
      inputMode,
      name,
      onKeyUp,
      onClick,
    },
    ref
  ) => {
    const [valueK, setValue] = React.useState<string>(value!);
    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => ({
      clear: () => {
        setValue('');
      },
      focus: () => {
        nativeInputRef.current?.focus();
      },
      blur: () => {
        nativeInputRef.current?.blur();
      },
      setValue: (val: string) => {
        setValue(val);
      },
    }));

    const handleKeydown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnterPress && e.code === 'Enter') {
          onEnterPress(e);
        }
        onKeyDown?.(e);
      },
      [onEnterPress, onKeyDown]
    );

    const showClearable = React.useMemo(() => {
      if (!clearable || !valueK || readOnly) return false;
      return true;
    }, [clearable, readOnly, valueK]);

    return (
      <div className={cx(classPrefix, { [`${classPrefix}-disabled`]: disabled })}>
        <input
          ref={nativeInputRef}
          id={id}
          style={style}
          className={`${classPrefix}-element`}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={valueK}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          inputMode={inputMode}
          type={type}
          name={name}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onKeyDown={handleKeydown}
          onKeyUp={onKeyUp}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          onClick={onClick}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {showClearable && (
          <div
            className={`${classPrefix}-clear`}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              setValue('');
              onClear?.();
            }}
          >
            <CloseCircleFill />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
