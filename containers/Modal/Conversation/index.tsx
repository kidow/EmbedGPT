import { useMemo } from 'react'
import type { FC } from 'react'
import { Modal } from 'containers'
import classnames from 'classnames'
import { Avatar, Icon, Tooltip } from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { share, toast, useObjectState } from 'services'
import { LinkIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/20/solid'

type Conversation = Database['public']['Tables']['conversations']['Row']
export interface Props extends Conversation, Omit<ModalProps, 'title'> {}
interface State {
  isShareOpen: boolean
}

const ConversationModal: FC<Props> = ({
  isOpen,
  onClose,
  id,
  title,
  content,
  avatar_url
}) => {
  const [{ isShareOpen }, setState] = useObjectState<State>({
    isShareOpen: false
  })

  const items: Array<{ from: 'human' | 'gpt'; value: string }> = useMemo(
    () => JSON.parse(content),
    [content]
  )
  return (
    <>
      <Modal
        maxWidth="max-w-4xl"
        isOpen={isOpen}
        onClose={onClose}
        padding={false}
        outer={
          <>
            <div className="fixed top-1/2 left-[calc((100vw-896px)/2+912px)] hidden -translate-y-1/2 lg:block">
              <ul className="share-floating">
                <li>
                  <Tooltip position="left" content="URL 복사">
                    <CopyToClipboard
                      text={`${process.env.NEXT_PUBLIC_BASE_URL}/c/${id}`}
                      onCopy={() => toast.success('복사되었습니다.')}
                    >
                      <button>
                        <LinkIcon className="h-6 w-6 text-[#d1d5db]" />
                      </button>
                    </CopyToClipboard>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="퍼가기">
                    <button onClick={() => setState({ isShareOpen: true })}>
                      <Icon.Embed className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="이메일">
                    <button
                      onClick={() =>
                        window.open(
                          `mailto:?body=https://embedgpt.vercel.app/c/${id}`,
                          '_blank'
                        )
                      }
                    >
                      <EnvelopeIcon className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="Twitter">
                    <button onClick={() => share.twitter(id)}>
                      <Icon.Twitter className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="Facebook">
                    <button onClick={() => share.facebook(id)}>
                      <Icon.Facebook className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="카카오톡">
                    <button onClick={() => share.kakaotalk(id)}>
                      <Icon.KakaoTalk className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="Reddit">
                    <button onClick={() => share.reddit(id)}>
                      <Icon.Reddit className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip position="left" content="LinkedIn">
                    <button onClick={() => share.linkedin(id)}>
                      <Icon.LinkedIn className="fill-neutral-300" />
                    </button>
                  </Tooltip>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="fixed top-2 right-2 lg:top-5 lg:right-5"
            >
              <XMarkIcon className="h-5 w-5 lg:h-8 lg:w-8" />
            </button>
          </>
        }
      >
        {items.map((item, key) => (
          <div
            className={classnames(
              'w-full border-b border-gray-900/50 text-gray-100',
              item.from === 'human' ? 'bg-primary' : 'bg-secondary'
            )}
            key={key}
          >
            <div className="m-auto flex gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
              <div className="relative flex w-[30px] flex-col items-end">
                <div
                  className={classnames('relative flex', {
                    'h-[30px] w-[30px] items-center justify-center rounded-sm bg-brand p-1 text-white':
                      item.from === 'gpt'
                  })}
                >
                  {item.from === 'human' ? (
                    <Avatar url={avatar_url} />
                  ) : (
                    <Icon.ChatGPT />
                  )}
                </div>
              </div>
              <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                <div className="flex flex-grow flex-col gap-3">
                  <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap text-[#ececf1]">
                    {item.from === 'human' ? (
                      item.value
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: item.value }} />
                    )}
                  </div>
                </div>
                <div className="flex justify-between"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center bg-primary py-10 lg:hidden">
          <div>
            <div className="flex items-center gap-4">
              <Tooltip content="URL 복사">
                <CopyToClipboard
                  text={`${process.env.NEXT_PUBLIC_BASE_URL}/c/${id}`}
                  onCopy={() => toast.success('복사되었습니다.')}
                >
                  <button>
                    <LinkIcon className="h-6 w-6 text-[#d1d5db]" />
                  </button>
                </CopyToClipboard>
              </Tooltip>
              <Tooltip content="퍼가기">
                <button onClick={() => setState({ isShareOpen: true })}>
                  <Icon.Embed className="h-6 w-6 fill-[#d1d5db]" />
                </button>
              </Tooltip>
              <Tooltip content="Email">
                <button
                  onClick={() =>
                    window.open(
                      `mailto:?body=https://embedgpt.vercel.app/c/${id}`,
                      '_blank'
                    )
                  }
                >
                  <EnvelopeIcon className="h-6 w-6 text-[#d1d5db]" />
                </button>
              </Tooltip>
              <Tooltip content="Twitter">
                <button onClick={() => share.twitter(id)}>
                  <Icon.Twitter className="h-6 w-6 fill-[#d1d5db]" />
                </button>
              </Tooltip>
              <Tooltip content="Facebook">
                <button onClick={() => share.facebook(id)}>
                  <Icon.Facebook className="h-6 w-6 fill-[#d1d5db]" />
                </button>
              </Tooltip>
              <Tooltip content="카카오톡">
                <button onClick={() => share.kakaotalk(id)}>
                  <Icon.KakaoTalk className="h-6 w-6 fill-[#d1d5db]" />
                </button>
              </Tooltip>
              <Tooltip content="Reddit">
                <button onClick={() => share.reddit(id)}>
                  <Icon.Reddit className="h-6 w-6 fill-[#d1d5db]" />
                </button>
              </Tooltip>
              <Tooltip content="LinkedIn">
                <button onClick={() => share.linkedin(id)}>
                  <Icon.LinkedIn className="h-6 w-6 fill-[#d1d5db]" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Modal>
      {isShareOpen && (
        <Modal.Share
          isOpen={isShareOpen}
          onClose={() => setState({ isShareOpen: false })}
          id={id}
          title={title}
          avatarUrl={avatar_url}
        />
      )}
    </>
  )
}

export default ConversationModal
