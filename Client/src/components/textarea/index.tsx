import { input, Textarea as NextTextarea } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";

type Props = {
    name: string,
    placeholder?: string,
    control: Control<any>,
    required?: string,
    autoFocus?: boolean,
    onValueChanged?: (value: string) => void
}

const Textarea = ({
    name,
    control,
    required,
    placeholder,
    autoFocus
}: Props) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors }
    } = useController({
        name,
        control
    })
  return (
    <NextTextarea
        placeholder={placeholder}
        name={field.name}
        value={field.value}
        isInvalid={invalid}
        onChange={field.onChange}
        onBlur={field.onBlur}
        errorMessage={`${errors[name]?.message ?? ''}`}
        autoComplete='false'
        classNames={{
            input: "min-h-96"
        }}
        size="lg"
        autoFocus={autoFocus}
    />
  )
}

export default Textarea
