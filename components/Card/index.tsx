import { ShareIcon } from '@heroicons/react/20/solid'
import { Avatar, Icon } from 'components'
import { Modal } from 'containers'
import { useMemo } from 'react'
import type { FC } from 'react'
import { useObjectState } from 'services'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type Data = Database['public']['Tables']['conversations']['Row']
export interface Props extends Data {}
interface State {
  isShareOpen: boolean
  isDetailOpen: boolean
}

const Card: FC<Props> = ({ content, avatar_url, id, ...props }) => {
  const [{ isShareOpen, isDetailOpen }, setState] = useObjectState<State>({
    isShareOpen: false,
    isDetailOpen: false
  })

  const title: string = useMemo(() => props.title.split('\n')[0], [props.title])

  const items: Array<{ from: 'human' | 'gpt'; value: string }> = useMemo(
    () => JSON.parse(content),
    [content]
  )
  return (
    <>
      <li className="group relative divide-y divide-gray-900/50 rounded-md shadow-md">
        <button
          onClick={() => setState({ isShareOpen: true })}
          className="absolute top-4 right-4 hidden text-neutral-400 hover:text-neutral-100 group-hover:inline-block"
        >
          <ShareIcon className="h-5 w-5" />
        </button>

        <div className="relative flex max-h-32 gap-6 overflow-hidden bg-primary p-6 before:absolute before:bottom-0 before:left-0 before:z-10 before:h-4 before:w-full before:bg-primary before:blur before:content-['']">
          <Avatar url={avatar_url} />
          <div className="whitespace-pre-wrap text-text">{props.title}</div>
        </div>
        <div className="flex gap-6 bg-secondary p-6">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-brand p-1 text-white">
            <Icon.ChatGPT />
          </div>
          <div
            className="relative max-h-32 min-h-[20px] overflow-hidden whitespace-pre-wrap text-[#d1d5db] before:absolute before:left-0 before:bottom-0 before:z-10 before:h-4 before:w-full before:bg-secondary before:blur before:content-['']"
            dangerouslySetInnerHTML={{ __html: items[1].value }}
          />
        </div>

        <button
          onClick={() => {
            setState({ isDetailOpen: true })
            window.history.pushState(window.history.state, '', `/c/${id}`)
          }}
          className="absolute left-1/2 bottom-0 h-10 w-10 -translate-x-1/2 translate-y-1/2 rounded-full border bg-secondary p-2 text-neutral-200 hover:text-neutral-50"
        >
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </li>
      {isShareOpen && (
        <Modal.Share
          isOpen={isShareOpen}
          onClose={() => setState({ isShareOpen: false })}
          id={id}
          title={title}
          avatarUrl={avatar_url}
        />
      )}
      {isDetailOpen && (
        <Modal.Conversation
          isOpen={isDetailOpen}
          onClose={() => {
            setState({ isDetailOpen: false })
            window.history.pushState(window.history.state, '', '/')
          }}
          id={id}
          content={content}
          avatar_url={avatar_url}
          {...props}
        />
      )}
    </>
  )
}

export default Card
