import { Input as NextInput } from '@nextui-org/react'
import React from 'react'
import { Control, useController } from 'react-hook-form'

type Props = {
    name: string,
    label?: string,
    placeholder?: string,
    type?: string,
    control: Control<any>,
    required?: string,
    endContent?: JSX.Element,
    weight?: string,
    size?: "sm" | "lg" | "md" | undefined
    onValueChanged?: (value: string) => void
}

export const Input = ({
    name,
    label,
    placeholder,
    type,
    control,
    required = '',
    weight,
    size,
    onValueChanged
}: Props) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors }
    } = useController({
        name,
        control,
        rules: {
            required
        }
    })
    return (
        <NextInput
            id={name}
            type={type}
            label={label}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ''}`}
            autoComplete='false'
            onValueChange={onValueChanged}
            classNames={{input: `${weight}`}}
            size={size}
        >
            
        </NextInput>
    )
}