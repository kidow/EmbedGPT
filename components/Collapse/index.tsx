import { FC, ReactNode } from 'react'
import classnames from 'classnames'
import { useObjectState } from 'services'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Props {
  list: Array<{
    title: string
    content: ReactNode
  }>
  accordion?: boolean
}
interface State {
  list: Array<{
    title: string
    content: ReactNode
    open: boolean
  }>
}

const Collapse: FC<Props> = ({ accordion, ...props }) => {
  const [{ list }, setState] = useObjectState<State>({
    list: props.list.map((item) => ({ ...item, open: true }))
  })
  return (
    <div className="divide-y rounded border dark:divide-neutral-700 dark:border-neutral-700">
      {list.map((item, index) => (
        <div key={index} className="relative select-none">
          <div
            className={classnames(
              'flex cursor-pointer items-center justify-between bg-neutral-50 p-4 font-semibold dark:bg-neutral-800',
              { 'border-b dark:border-neutral-700': item.open }
            )}
            onClick={() =>
              setState({
                list: [
                  ...list.slice(0, index).map((v) => ({
                    ...v,
                    open: accordion ? false : v.open
                  })),
                  { ...item, open: !item.open },
                  ...list.slice(index + 1).map((v) => ({
                    ...v,
                    open: accordion ? false : v.open
                  }))
                ]
              })
            }
          >
            <span>{item.title}</span>
            <ChevronDownIcon
              className={classnames('h-5 w-5 dark:text-neutral-500', {
                '-rotate-180': item.open
              })}
            />
          </div>
          <div className={classnames(item.open ? 'block p-4' : 'hidden')}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Collapse
