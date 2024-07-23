import {
    Select,
    SelectItem,
    Skeleton,
    Spacer,
    Spinner,
  } from "@nextui-org/react"
  import { useGetAllCategoriesQuery } from "../../app/services/category"
  import Button from "../button"
  import Link from "../link"
  import { useState } from "react"
  import CategoryModal from "./categoryModal"
  import { Control, useController } from "react-hook-form"
  
  type Props = {
      name: string,
      control: Control<any>,
      selected: string,
      required?: string
  }
  
  const CategoryBar = ({
      name,
      control,
      selected,
      required
  }: Props) => {
    const { data, isLoading, refetch } = useGetAllCategoriesQuery()
    const [categories, setCategories] = useState(data)
    const [isModal, setModal] = useState(false)
  
    const {
      field,
      fieldState: { invalid },
      formState: { errors }
    } = useController({
      name,
      control,
      rules: {
          required
      },
      defaultValue: selected
    })
  
    return (
      <div className="sm:ml-3 w-full self-start flex items-center">
        <span className="sm:mr-1 sm:block hidden">Category: </span>
        <Spacer className="hidden sm:block"/>
        {
          !isLoading ? (
            <Select
              className="lg:w-1/3 sm:w-1/2 w-4/6 max-w-full"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={`${errors[name]?.message ?? ''}`}
              defaultSelectedKeys={[selected]} // Передаем массив со значением по умолчанию
            >
              {data && data.length > 0 ? (
                data.map(el => (
                  <SelectItem key={el.id} value={el.id}>{el.name}</SelectItem> // Устанавливаем value для каждого SelectItem
                ))
              ) : (
                <></>
              )}
            </Select>
          ) : (
            <Skeleton className="rounded-lg lg:w-1/3 sm:w-1/2 w-4/6 h-full"></Skeleton>
          )
        }
        <Spacer x={3}/>
        <Link className="cursor-pointer rounded-lg" onClick={() => setModal(true)}>Category +</Link>
        <CategoryModal isOpen={isModal} setModal={setModal} refetch={refetch}/>
      </div>
    )
  }
  
  export default CategoryBar
  