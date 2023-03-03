import type { FC } from 'react'
import { Modal } from 'containers'

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
  return (
    <Modal
      maxWidth="max-w-3xl"
      isOpen={isOpen}
      onClose={onClose}
      padding={false}
    >
      {id}
    </Modal>
  )
}

export default ConversationModal
