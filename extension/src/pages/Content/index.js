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
      items.push({ from: 'gpt', value: markdown.outerHTML })
    }
  }
})()

function getAvatarImage() {
  const image = document.querySelectorAll('img')[1]
  const url = new URL(image.src).searchParams.get('url')

  return url || ''
}
