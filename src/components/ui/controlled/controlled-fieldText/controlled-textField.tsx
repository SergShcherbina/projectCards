import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '../../text-field'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'onChangeValue' | 'value' | 'itemRef'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...fieldProps
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, defaultValue, rules, shouldUnregister })

  return <TextField {...fieldProps} onChangeValue={onChange} value={value} />
}
