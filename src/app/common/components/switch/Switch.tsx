import { usePropState } from 'app/common/hooks/usePropState';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import classNames from 'classnames';
import { ChangeEvent, FocusEvent, HTMLAttributes, ReactNode, useState } from 'react';

export interface SwitchProps {
  /**
   * The visual variant of the switch
   */
  variant?: ColorVariant;

  /**
   * The size of the switch
   */
  size?: ControlSize;

  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;

  inputProps: HTMLAttributes<HTMLInputElement>;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => unknown;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => unknown;

  /**
   * The content to be shown on the thumb
   */
  // thumbChildren: ReactNode; // TODO GET PROPS
}

export function Switch({
  variant,
  size,
  className,
  checked,
  defaultChecked,
  disabled,
  onChange,
  onBlur,
  onFocus,
}: SwitchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isCheckedInternal, setIsChecked] = usePropState(checked ?? defaultChecked);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        className={classNames(
          'switch',
          {
            [`switch--${variant}`]: variant,
            [`switch--${size}`]: size,
            'switch--checked': checked ?? isCheckedInternal,
            'switch--focus': isFocused,
            'switch--disabled': disabled,
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
          disabled={disabled}
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

        <span className="switch__thumb" aria-hidden={true}></span>
      </label>
    </>
  );
}
