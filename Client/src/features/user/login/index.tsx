
import { useForm } from 'react-hook-form'
import { Input } from '../../../components/input'
import Link from '../../../components/link'
import Button from '../../../components/button'
import { login, useLoginMutation } from '../../../app/services/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Paths } from '../../../../paths'
import ErrorMessage from '../../../components/errorMessage'
import { isErrorType } from '../../../utils/isErrorType'

type Login = {
    login: string
    password: string
}

type Props = {
    setSelected: (value: string) => void
}

const Login = ({setSelected}: Props) => {

    const navigate = useNavigate()
    const [loginUser, { isLoading }] = useLoginMutation()
    const [error, setError] = useState('')

    const onSubmit = async (data: Login) => {
        try {
            await loginUser(data).unwrap()
            setError('')
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
       } = useForm<Login>({
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
        <Button radius='md' isLoading={isLoading} type='submit' color='primary'>Login</Button>
        <ErrorMessage message={error}/>
        <p className="text-center text-small">
            Don't have an account?{" "}
            <Link underline='always' size='sm' className='cursor-pointer' onClick={() => setSelected("register")}>Create new</Link>{"."}
        </p>
    </form>
  )
}

export default Login
