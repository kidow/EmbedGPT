let isRequesting = false

;(async function () {
  if (!window.location.href.startsWith('https://chat.openai.com/chat/')) return
  if (isRequesting) return

  const isStreaming = document.getElementsByClassName('.result-streaming')
  if (isStreaming.length > 0) return

  isRequesting = true

  const container = document.getElementsByClassName(
    'flex flex-col items-center text-sm dark:bg-gray-800'
  )[0]

  const image = document.querySelectorAll('img')[1]
  const avatarUrl = new URL(image.src).searchParams.get('url')
  const items = []

  for (const node of container.children) {
    const markdown = node.querySelector('.markdown')

    if ([...node.classList].includes('dark:bg-gray-800')) {
      const warning = node.querySelector('.text-orange-500')
      items.push({
        from: 'human',
        value: warning ? warning.innerText.split('\n')[0] : node.textContent
      })
    } else if (markdown) {
      markdown.classList.remove('dark:prose-invert')
      markdown.classList.remove('dark')
      markdown.classList.add('prose-invert')
      items.push({ from: 'gpt', value: markdown.outerHTML })
    }
  }

  const res = await fetch('https://embedgpt.vercel.app/api/conversations', {
    body: JSON.stringify({ avatarUrl, items }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
    method: 'POST'
  }).catch((err) => {
    alert(`Error saving conversation: ${err.message}`)
  })
  const { id, success } = await res.json()
  if (success) window.open(`https://embedgpt.vercel.app/c/${id}`, '_blank')

  setTimeout(() => {
    isRequesting = false
  }, 1000)
})()
