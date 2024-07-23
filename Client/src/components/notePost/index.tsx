import { Card, CardBody, CardHeader, Chip, LinkIcon, Popover, PopoverContent, PopoverTrigger, Spacer, Tooltip } from '@nextui-org/react'
import React from 'react'
import Button from '../button'
import Link from '../link'

type Props = {
    title: string,
    content: string,
    categoryName: string,
    createdAt: string,
    link?: string
}

const NotePost = ({
    title,
    content,
    categoryName,
    createdAt
}: Props) => {
  return (
    <Card className='hover:bg-primary-50'>
        <CardBody title={title} className='flex flex-row justify-between w-full'>
            <div className='flex items-center w-full'>
                <Chip color='default' variant='dot' className='border-1'>{categoryName}</Chip>
                <Spacer x={2}/>
                <span>{title}</span>
                <p className='text-gray-500 hidden lg:block'>
                    {content.length > 0 ? ": " : ""}
                    {content.length > 27 ? content.substring(0, 27) + "..." : content}
                </p>
            </div>
            <span className='text-sm self-center hidden md:block'>{createdAt}</span>
            <Spacer x={2}/>
            <LinkIcon/>
        </CardBody>
    </Card>
  )
}

export default NotePost
