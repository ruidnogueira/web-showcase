import { usePropState } from 'app/common/hooks/usePropState';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import classNames from 'classnames';
import { AriaAttributes, ChangeEvent, FocusEvent, useState } from 'react';

export interface SwitchProps extends AriaAttributes {
  /**
   * Specifies the visual variant
   */
  variant?: ColorVariant;

  /**
   * Specifies the size
   */
  size?: ControlSize;

  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => unknown;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => unknown;
}

export function Switch({
  variant,
  size,
  className,
  checked,
  defaultChecked,
  onChange,
  onBlur,
  onFocus,
  ...props
}: SwitchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isCheckedInternal, setIsChecked] = usePropState(checked ?? defaultChecked);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        {...props}
        className={classNames(
          'switch',
          {
            [`switch--${variant}`]: variant,
            [`switch--${size}`]: size,
            'switch--checked': checked ?? isCheckedInternal,
            'switch--focus': isFocused,
          },
          className
        )}
        onMouseDown={(event) => {
          // prevent checkbox blur on repeated clicks
          event.preventDefault();
        }}
      >
        <input
          type="checkbox"
          className="switch__input"
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={(event) => {
            setIsChecked(event.target.checked);
            onChange?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
        />

        <span className="switch__thumb" aria-hidden={true} />
      </label>
    </>
  );
}
