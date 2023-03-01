import { ShareIcon } from '@heroicons/react/20/solid'
import { Icon } from 'components'
import { Modal } from 'containers'
import type { FC } from 'react'
import { useObjectState } from 'services'

export interface Props {}
interface State {
  isOpen: boolean
}

const Card: FC<Props> = () => {
  const [{ isOpen }, setState] = useObjectState<State>({ isOpen: false })
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
          <img
            src="https://lh3.googleusercontent.com/ogw/AAEL6shqAtfW3mNdIhTv8amgGAca4gYlDGYGyzdVKdaK=s64-c-mo"
            alt=""
            className="h-[30px] w-[30px]"
          />
          <div className="whitespace-pre-wrap">
            머신 러닝으로 AI 음악 생성기를 만들려고 해. 파이썬으로 구현하려는데
            어디서부터 시작하면 돼?
          </div>
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
          title="asd"
        >
          asd
        </Modal>
      )}
    </>
  )
}

export default Card
