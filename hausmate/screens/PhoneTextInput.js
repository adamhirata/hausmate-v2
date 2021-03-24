//thanks to @catamphetamine on github for this tutorial

import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'

function PhoneTextInput(
  { placeholder, autoComplete, autoFocus, value, onChange },
  ref
) {
  // Instead of `onChangeText` it could use `onChange` and get `value` from `nativeEvent.text`.
  const onChangeText = useCallback(
    (value) => {
      onChange({
        preventDefault() {
          this.defaultPrevented = true
        },
        target: { value },
      })
    },
    [onChange]
  )
  return (
    <TextInput
      ref={ref}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoCompleteType={autoComplete}
      keyboardType="phone-pad"
      onChangeText={onChangeText}
      value={value}
    />
  )
}

PhoneTextInput = React.forwardRef(PhoneTextInput)

PhoneTextInput.propTypes = {
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default PhoneTextInput
