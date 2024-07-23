import { Card, CardBody, Input, Tab, Tabs } from '@nextui-org/react'
import React, { useState } from 'react'
import Login from '../../features/user/login'
import Register from '../../features/user/register'

const Authorization = () => {
  const [selected, setSelected] = useState('login')


  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <Card className='max-w-full w-[350px]'>
        <CardBody className="overflow-hidden">
          <Tabs
            size='md'
            fullWidth
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
          >
            <Tab title='Log in' key="login">
              <Login setSelected={setSelected}/>
            </Tab>
            <Tab title='Register' key="register">
              <Register setSelected={setSelected}/>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}

export default Authorization
