import Link from 'next/link'
import type { FC } from 'react'

export interface Props {}
interface State {}

const Footer: FC<Props> = () => {
  return (
    <footer className="flex items-center justify-center py-20 text-sm text-neutral-400">
      <div className="space-y-1 text-center">
        <div>© {new Date().getFullYear()} EmbedGPT. All rights reserved.</div>
        <div>
          <Link href="https://github.com/kidow/embedgpt" target="_blank">
            View source on Github
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
