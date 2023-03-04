import type { FC } from 'react'
import { Modal } from 'containers'
import { Avatar, Icon } from 'components'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { share, toast } from 'services'
import CopyToClipboard from 'react-copy-to-clipboard'

export interface Props extends ModalProps {
  id: string
  title: string
  avatarUrl: string
}
interface State {}

const ShareModal: FC<Props> = ({ isOpen, onClose, id, title, avatarUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="공유" padding={false}>
      <div className="flex gap-6 bg-primary p-6">
        <Avatar url={avatarUrl} />
        <div className="truncate text-text">{title}</div>
      </div>
      <div className="space-y-6 overflow-x-hidden py-6 px-7">
        <div className="share-container">
          <button
            onClick={() =>
              window.open(
                `mailto:?body=https://embedgpt.vercel.app/c/${id}`,
                '_blank'
              )
            }
            className="bg-neutral-600"
          >
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
          <span className="flex-1 truncate p-2">{`https://embedgpt.vercel.app/c/${id}`}</span>
          <CopyToClipboard
            text={`${process.env.NEXT_PUBLIC_BASE_URL}/c/${id}`}
            onCopy={() => toast.success('복사되었습니다.')}
          >
            <button className="flex h-9 w-16 items-center justify-center rounded-xl bg-brand">
              복사
            </button>
          </CopyToClipboard>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
          <span className="flex-1 truncate p-2">{`<blockquote id="${id}" class="embedgpt"></blockquote><script async src="https://embedgpt.vercel.app/embed.js"></script>`}</span>
          <CopyToClipboard
            text={`<blockquote id="${id}" class="embedgpt"></blockquote><script async src="https://embedgpt.vercel.app/embed.js"></script>`}
            onCopy={() => toast.success('복사되었습니다.')}
          >
            <button className="flex h-9 w-16 items-center justify-center rounded-xl bg-brand">
              복사
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
