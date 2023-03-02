import type { FC } from 'react'

export interface Props {}
interface State {}

const Header: FC<Props> = () => {
  return (
    <header className="container mx-auto px-2 sm:px-0">
      <div className="flex h-16 items-center justify-between">
        <img src="/logo.svg" alt="Logo" className="h-5" />
      </div>
    </header>
  )
}

export default Header
