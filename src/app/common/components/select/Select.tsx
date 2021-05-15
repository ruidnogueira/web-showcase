import RcSelect, { Option as RcOption, SelectProps as RcSelectProps } from 'rc-select';
import { DefaultValueType } from 'rc-select/lib/interface/generator';
import { OptionProps as RcSelectOptionprops } from 'rc-select/lib/Option';
import classNames from 'classnames';
import { ChevronDown } from 'react-feather';
import { ColorVariant, ControlSize } from 'app/core/models/styles.model';
import { useTheme } from 'app/core/providers/ThemeProvider';

export type SelectValue = DefaultValueType;
export type SelectOptionProps = RcSelectOptionprops;

export interface SelectProps<Value extends SelectValue> extends RcSelectProps<Value> {
  /**
   * The visual variant of the select
   */
  variant?: ColorVariant;

  /**
   * The size of the select
   */
  size?: ControlSize;
}

export function Select<Value extends SelectValue>({
  className,
  dropdownClassName,
  size,
  variant,
  menuItemSelectedIcon = null,
  virtual = false,
  ...props
}: SelectProps<Value>) {
  const { theme } = useTheme();

  return (
    <RcSelect<Value>
      {...props}
      prefixCls="select"
      className={classNames(
        { [`select--${variant}`]: variant, [`select--${size}`]: size },
        className
      )}
      dropdownClassName={classNames(
        { [`select-dropdown--${size}`]: size },
        `theme--${theme}`,
        dropdownClassName
      )}
      virtual={virtual}
      menuItemSelectedIcon={menuItemSelectedIcon}
      inputIcon={<ChevronDown />}
    />
  );
}

Select.Option = RcOption;
