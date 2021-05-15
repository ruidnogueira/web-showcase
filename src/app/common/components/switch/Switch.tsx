import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import classNames from 'classnames';
import { AriaAttributes, ChangeEvent, ComponentType, FocusEvent, ReactNode, useState } from 'react';

export type SwitchProps = {
  /**
   * The visual variant of the switch
   */
  variant?: ColorVariant;

  /**
   * The size of the switch
   */
  size?: ControlSize;

  id?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;

  /**
   * The content to be shown on the thumb
   */
  thumbChildren?: ComponentType<{ isChecked: boolean }> | ReactNode;

  onChange?: (isChecked: boolean, event: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => unknown;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => unknown;
} & Pick<AriaAttributes, 'aria-labelledby'>;

export function Switch({
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
  ...props
}: SwitchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isCheckedInternal, setIsChecked] = useState(defaultChecked);
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
          {...props}
          type="checkbox"
          className="switch__input"
          defaultChecked={defaultChecked}
          checked={checked}
          disabled={disabled}
          onChange={(event) => {
            setIsChecked(event.target.checked);
            onChange?.(event.target.checked, event);
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
