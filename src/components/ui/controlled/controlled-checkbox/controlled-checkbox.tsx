import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../../checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onChange' | 'checked' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <Checkbox
      {...{
        ...checkboxProps,
        onChange,
        checked: value,
        id: name,
      }}
    />
  )
}
