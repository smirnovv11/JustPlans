
import { CircularProgress } from "@nextui-org/react"
import { useGetCurrentUserQuery } from "../../app/services/auth"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../../paths"

const Auth = ({children}: {children: JSX.Element}) => {

    const { data, isLoading } = useGetCurrentUserQuery()
    const navigate = useNavigate()


    if (isLoading) {
        return (
            <CircularProgress
                className="w-screen h-screen items-center justify-center"
                label="Loading"
                size="lg"
                color="default"
                strokeWidth={4}
            />
        )
    } else if (!isLoading && !data) {
        navigate(Paths.auth)
        return <></>
    }
    return children
}

export default Auth
