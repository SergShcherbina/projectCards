import { Fragment, useRef } from 'react'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Button } from '../../button'
import { TextFieldProps } from '../../text-field'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'onChangeValue' | 'value' | 'itemRef'>

export const ControlledImageInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...fieldProps
}: Props<T>) => {
  const {
    field: { onChange },
  } = useController({ control, name, defaultValue, rules, shouldUnregister })
  const uploadInputRef = useRef(null)

  return (
    <Fragment>
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChange}
        {...fieldProps}
      />
      <Button onClick={() => {}} variant="secondaryWithIcon" fullWidth={true}>
        Upload
      </Button>
    </Fragment>
  )
}
