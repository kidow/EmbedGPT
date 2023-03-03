import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

export interface Props {
  url: string
}
interface State {}

const Avatar: FC<Props> = ({ url }) => {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!url) setIsError(true)
  }, [url])
  return isError ? (
    <UserCircleIcon className="h-8 w-8 text-neutral-500" />
  ) : (
    <img
      src={url}
      draggable={false}
      className="h-[30px] w-[30px]"
      alt="User"
      onError={() => setIsError(true)}
    />
  )
}

export default Avatar
