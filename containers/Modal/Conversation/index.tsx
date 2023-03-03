import { useMemo } from 'react'
import type { FC } from 'react'
import { Modal } from 'containers'
import classnames from 'classnames'
import { Avatar, Icon } from 'components'

type Conversation = Database['public']['Tables']['conversations']['Row']
export interface Props extends Conversation, Omit<ModalProps, 'title'> {}
interface State {}

const ConversationModal: FC<Props> = ({
  isOpen,
  onClose,
  id,
  title,
  content,
  avatar_url
}) => {
  const items: Array<{ from: 'human' | 'gpt'; value: string }> = useMemo(
    () => JSON.parse(content),
    [content]
  )
  return (
    <Modal
      maxWidth="max-w-4xl"
      isOpen={isOpen}
      onClose={onClose}
      padding={false}
    >
      {items.map((item, key) => (
        <div
          className={classnames(
            'w-full border-b border-gray-900/50 text-gray-100',
            item.from === 'human' ? 'bg-primary' : 'bg-secondary'
          )}
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
    </Modal>
  )
}

export default ConversationModal
