import type { FC } from 'react'
import { Modal } from 'containers'

export interface Props extends ModalProps {
  id: string
  title: string
}
interface State {}

const ShareModal: FC<Props> = ({ isOpen, onClose, id, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="공유">
      <div className="space-y-6">
        <div className="truncate text-xl font-semibold">{title}</div>
        <div className="flex gap-2">asd</div>
        <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
          <span className="p-2">{`https://embedgpt.vercel.app/c/${id}`}</span>
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
  )
}

export default ShareModal
