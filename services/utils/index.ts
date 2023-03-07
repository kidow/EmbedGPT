import { EventListener } from 'services'
import copy from 'copy-to-clipboard'

class Toast {
  private emit(message: string, type: NToast.Type) {
    EventListener.emit<NToast.Emit>('toast', { message, type })
  }
  success(message: string) {
    this.emit(message, 'success')
  }
  info(message: string) {
    this.emit(message, 'info')
  }
  warn(message: string) {
    this.emit(message, 'warn')
  }
  error(message: string) {
    this.emit(message, 'error')
  }
}

export const toast = new Toast()

class Share {
  private baseUrl = 'https://embedgpt.vercel.app'
  private share(url: string) {
    window.open(url, '_blank', 'width=600,height=400')
  }

  url(id: string) {
    copy(`https://embedgpt.vercel.app/c/${id}`)
    toast.success('Successfully copied.')
  }
  embed(id: string) {
    copy(
      `<blockquote id="${id}" class="embedgpt"></blockquote><script async src="https://embedgpt.vercel.app/embed.js"></script>`
    )
    toast.success('Successfully copied.')
  }
  email(id: string) {
    window.open(`mailto:?body=https://embedgpt.vercel.app/c/${id}`, '_blank')
  }
  facebook(id: string) {
    this.share(`http://www.facebook.com/sharer.php?u=${this.baseUrl}/c/${id}`)
  }
  twitter(id: string) {
    this.share(
      `https://twitter.com/intent/tweet?url=https://embebgpt.vercel.app/c/${id}`
    )
  }
  linkedin(id: string) {
    this.share(
      `https://www.linkedin.com/sharing/share-offsite/?url=${this.baseUrl}/c/${id}`
    )
  }
  kakaotalk(id: string) {
    window.Kakao?.Link?.sendScrap({
      requestUrl: `${this.baseUrl}/c/${id}`
    })
  }
  reddit(id: string) {
    this.share(`https://www.reddit.com/submit?url=${this.baseUrl}/c/${id}`)
  }
}

export const share = new Share()
