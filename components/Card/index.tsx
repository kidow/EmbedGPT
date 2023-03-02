import { ShareIcon } from '@heroicons/react/20/solid'
import { Icon } from 'components'
import { Modal } from 'containers'
import { useMemo } from 'react'
import type { FC } from 'react'
import { useObjectState } from 'services'

type Data = Database['public']['Tables']['conversations']['Row']
export interface Props extends Data {}
interface State {
  isOpen: boolean
}

const Card: FC<Props> = ({ content, avatar_url, id, ...props }) => {
  const [{ isOpen }, setState] = useObjectState<State>({ isOpen: false })

  const title: string = useMemo(() => props.title.split('\n')[0], [props.title])

  const items: Array<{ from: 'human' | 'gpt'; value: string }> = useMemo(
    () => JSON.parse(content),
    [content]
  )
  return (
    <>
      <li className="group relative divide-y divide-gray-900/50 rounded-md shadow-md">
        <button
          onClick={() => setState({ isOpen: true })}
          className="absolute top-4 right-4 hidden text-neutral-400 hover:text-neutral-100 group-hover:inline-block"
        >
          <ShareIcon className="h-5 w-5" />
        </button>
        <div className="flex gap-6 bg-primary p-6">
          <img src={avatar_url || ''} alt="" className="h-[30px] w-[30px]" />
          <div className="whitespace-pre-wrap">{props.title}</div>
        </div>
        <div className="flex gap-6 bg-secondary p-6">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-brand p-1 text-white">
            <Icon.ChatGPT />
          </div>
          <div className="whitespace-pre-wrap">
            머신 러닝을 사용하여 AI 음악 생성기를 구현하는 것은 흥미로운
            프로젝트입니다. 이를 시작하기 위해 다음과 같은 단계를 따를 수
            있습니다.
          </div>
        </div>
      </li>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setState({ isOpen: false })}
          title="공유"
        >
          <div className="space-y-6">
            <div className="truncate text-xl font-semibold">{title}</div>
            <div className="flex gap-2">asd</div>
            <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
              <span className="p-2">https://url</span>
              <button className="rounded-xl bg-brand px-4 py-2 text-sm">
                복사
              </button>
            </div>
            <div className="mb-4 rounded-md bg-black">
              <div className="relative flex items-center bg-primary px-4 py-2 font-sans text-xs text-gray-200">
                <span className="">iframe</span>
                <button className="ml-auto flex gap-2">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  Copy code
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Card
