interface ReactProps {
  children?: ReactNode
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  maxWidth?:
    | 'max-w-screen-2xl'
    | 'max-w-screen-xl'
    | 'max-w-screen-lg'
    | 'max-w-screen-md'
    | 'max-w-screen-sm'
    | 'max-w-full'
    | 'max-w-7xl'
    | 'max-w-6xl'
    | 'max-w-5xl'
    | 'max-w-4xl'
    | 'max-w-3xl'
    | 'max-w-2xl'
    | 'max-w-xl'
    | 'max-w-lg'
    | 'max-w-md'
    | 'max-w-sm'
    | 'max-w-xs'
  description?: ReactNode
  padding?: boolean
  footer?: ReactNode
  outer?: ReactNode
}

namespace NToast {
  type Type = 'success' | 'info' | 'warn' | 'error'
  interface Emit {
    message: string
    type: NToast.Type
  }
}

interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          created_at: string
          avatar_url: string | null
          title: string
          content: string
        }
        Insert: {
          id?: string
          created_at?: string
          avatar_url?: string | null
          title?: string
          content?: string
        }
        Update: {
          id?: string
          created_at?: string
          avatar_url?: string | null
          title?: string
          content?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
