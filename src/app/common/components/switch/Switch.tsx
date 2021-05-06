import { usePropState } from 'app/common/hooks/usePropState';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import classNames from 'classnames';
import { ComponentType, InputHTMLAttributes, ReactNode, useState } from 'react';

export type SwitchProps = {
  /**
   * The visual variant of the switch
   */
  variant?: ColorVariant;

  /**
   * The size of the switch
   */
  size?: ControlSize;

  className?: string;

  /**
   * The content to be shown on the thumb
   */
  thumbChildren?: ComponentType<{ isChecked: boolean }> | ReactNode;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange' | 'onFocus' | 'onBlur'
>;

export function Switch({
  id,
  variant,
  size,
  className,
  checked,
  defaultChecked,
  disabled,
  thumbChildren: ThumbChildren,
  onChange,
  onBlur,
  onFocus,
}: SwitchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isCheckedInternal, setIsChecked] = usePropState(checked ?? defaultChecked);
  const isChecked = checked ?? isCheckedInternal;

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
          id={id}
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

        <span className="switch__thumb" aria-hidden={true}>
          {isComponentType(ThumbChildren) ? (
            <ThumbChildren isChecked={isChecked ?? false} />
          ) : (
            ThumbChildren
          )}
        </span>
      </label>
    </>
  );
}

function isComponentType<T>(
  component: ComponentType<T> | ReactNode
): component is ComponentType<T> {
  return typeof component === 'function';
}
