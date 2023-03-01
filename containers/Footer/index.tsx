import type { FC } from 'react'

export interface Props {}
interface State {}

const Footer: FC<Props> = () => {
  return (
    <footer className="flex items-center justify-center py-20 text-sm text-neutral-400">
      © {new Date().getFullYear()} EmbedGPT. All rights reserved.
    </footer>
  )
}

export default Footer
