import { Button as NextButton } from '@nextui-org/react'
import React from 'react'

type Props = {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset" | undefined
    radius?: "none" | "sm" | "md" | "lg" | "full" | undefined
    variant?: "flat" | "solid" | "bordered" | "light" | "faded" | "shadow" | "ghost" | undefined,
    fullWidth?: boolean
    isLoading?: boolean,
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined,
    className?: string
    onClick?: () => void
}

const Button = ({
    children,
    type,
    radius = "full",
    variant,
    fullWidth,
    isLoading,
    color,
    className,
    onClick
}: Props) => {
  return (
    <NextButton
        type={type}
        radius={radius}
        variant={variant}
        fullWidth={fullWidth}
        isLoading={isLoading}
        color={color}
        onClick={onClick}
        className={className}
    >
        {children}
    </NextButton>
  )
}

export default Button
