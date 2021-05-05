import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import classNames from 'classnames';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

export interface SwitchProps {
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

  onChange: (event: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus: (event: FocusEvent<HTMLInputElement>) => unknown;
  onBlur: (event: FocusEvent<HTMLInputElement>) => unknown;
}

export function Switch({
  variant,
  size,
  className,
  checked,
  onChange,
  onBlur,
  onFocus,
}: SwitchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean | undefined>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        className={classNames(
          'switch',
          {
            [`switch--${variant}`]: variant,
            [`switch--${size}`]: size,
            'switch--checked': isChecked,
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
          checked={checked}
          onChange={(event) => {
            setIsChecked(event.target.checked);
            onChange(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur(event);
          }}
        />

        <span className="switch__track" aria-hidden={true}>
          <span className="switch__thumb" />
        </span>
      </label>
    </>
  );
}
