import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../../app/services/auth'
import { Input } from '../../../components/input'
import Button from '../../../components/button'
import ErrorMessage from '../../../components/errorMessage'
import Link from '../../../components/link'
import { isErrorType } from '../../../utils/isErrorType'
import { Paths } from '../../../../paths'
import { useCreateCategoryMutation } from '../../../app/services/category'

type Register = {
    email: string
    password: string
    confirmPassword: string
    login: string
}

type Props = {
    setSelected: (value: string) => void
}

const Register = ({setSelected}: Props) => {
    const navigate = useNavigate()
    const [registerUser, { isLoading }] = useRegisterMutation()
    const [createCategory] = useCreateCategoryMutation()
    const [error, setError] = useState('')

    const onSubmit = async (data: Register) => {
        try {
            if (data.password !== data.confirmPassword)
                throw { data: { error: 'Passwords are not equal.' }}

            setError('')
            await registerUser(data).unwrap()
            await createCategory({ name: "Default"}).unwrap()
            navigate(Paths.home)
        } catch (error) {
            const maybeError = isErrorType(error)
            if (maybeError)
                setError(error.data.error)
            else
                setError('Unknown error')
        }
    }

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<Register>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
          login: '',
          password: ''
        }
    })

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
            name='email'
            label='Email'
            type='email'
            required="Required field"
            control={control}
        />
        <Input
            name='login'
            label='Login'
            type='text'
            required="Required field"
            control={control}
        />
        <Input
            control={control}
            name='password'
            label='Password'
            type='Password'
            required='Required field'
        />
        <Input
            control={control}
            name='confirmPassword'
            label='Confirm password'
            type='Password'
            required='Required field'
        />
        <Button radius='md' isLoading={isLoading} type='submit' color='primary'>Register</Button>
        <ErrorMessage message={error}/>
        <p className="text-center text-small">
            Already have an account?{" "}
            <Link underline='always' size='sm' className='cursor-pointer' onClick={() => setSelected("login")}>Sign in</Link>{"."}
        </p>
    </form>
  )
}

export default Register
