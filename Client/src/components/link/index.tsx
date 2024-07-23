import { Link as NextLink } from "@nextui-org/react";
import React from 'react'

type Props = {
    children: React.ReactNode
    isBlock?: boolean
    className?: string
    color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
    underline?: "none" | "hover" | "always" | "active" | "focus" | undefined
    size?: "sm" | "md" | "lg" | undefined
    onClick?: () => void
}

const Link = ({
    children,
    isBlock,
    className,
    color,
    underline = "none",
    size,
    onClick
}: Props) => {
  return (
    <NextLink
        isBlock={isBlock}
        className={className}
        onClick={onClick}
        color={color}
        underline={underline}
        size={size}
    >
        {children}
    </NextLink>
  )
}

export default Link
