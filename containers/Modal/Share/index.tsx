import type { FC } from 'react'
import { Modal } from 'containers'
import { Avatar, Icon } from 'components'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { share } from 'services'

export interface Props extends ModalProps {
  id: string
  title: string
  avatarUrl: string
}
interface State {}

const ShareModal: FC<Props> = ({ isOpen, onClose, id, title, avatarUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Content"
      padding={false}
    >
      <div className="flex gap-6 bg-primary p-6">
        <Avatar url={avatarUrl} />
        <div className="truncate text-text">{title}</div>
      </div>
      <div className="space-y-6 overflow-x-hidden py-6 px-7">
        <div className="share-container">
          <button onClick={() => share.email(id)} className="bg-neutral-600">
            <EnvelopeIcon className="text-white" />
          </button>
          <button onClick={() => share.twitter(id)} className="bg-[#1da1f2]">
            <Icon.Twitter className="fill-white" />
          </button>
          <button onClick={() => share.facebook(id)} className="bg-[#0064e0]">
            <Icon.Facebook className="fill-white" />
          </button>
          <button onClick={() => share.kakaotalk(id)} className="bg-[#ffe812]">
            <Icon.KakaoTalk className="fill-black" />
          </button>
          <button onClick={() => share.reddit(id)} className="bg-[#ff4500]">
            <Icon.Reddit className="fill-white" />
          </button>
          <button onClick={() => share.linkedin(id)} className="bg-[#0077b5]">
            <Icon.LinkedIn className="fill-white" />
          </button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
          <span className="flex-1 truncate p-2">{`https://embedgpt.kidow.me/c/${id}`}</span>
          <button
            onClick={() => share.url(id)}
            className="flex h-9 w-16 items-center justify-center rounded-xl bg-brand"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
          <span className="flex-1 truncate p-2">{`<blockquote id="${id}" class="embedgpt"></blockquote><script async src="https://embedgpt.kidow.me/embed.js"></script>`}</span>
          <button
            onClick={() => share.embed(id)}
            className="flex h-9 w-16 items-center justify-center rounded-xl bg-brand"
          >
            Copy
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
