;(async function () {
  if (!window.location.href.startsWith('https://chat.openai.com/chat/')) return

  const isStreaming = document.getElementsByClassName('.result-streaming')
  if (isStreaming.length > 0) return

  const isLoading = document.getElementById('embedgpt-spinner')
  if (isLoading) return

  const spinner = generateSpinner()
  document.body.appendChild(spinner)

  const container = document.getElementsByClassName(
    'flex flex-col items-center text-sm dark:bg-gray-800'
  )[0]

  const image = document.querySelectorAll('img')[1]
  const avatarUrl = new URL(image.src).searchParams.get('url') || ''
  const items = []

  for (const node of container.children) {
    const markdown = node.querySelector('.markdown')

    if ([...node.classList].includes('dark:bg-gray-800')) {
      const warning = node.querySelector('.text-orange-500')
      items.push({
        from: 'human',
        value: warning
          ? warning.innerText.split('\n')[0]
          : node.children[0].children[1].innerText
      })
    } else if (markdown) {
      markdown.classList.remove('dark:prose-invert', 'dark')
      markdown.classList.add('prose-invert')
      items.push({ from: 'gpt', value: markdown.outerHTML })
      markdown.classList.add('dark:prose-invert', 'dark')
      markdown.classList.remove('prose-invert')
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
    spinner.remove()
  }, 1000)
})()

function generateSpinner() {
  const container = document.createElement('div')
  container.id = 'embedgpt-spinner'
  container.role = 'progressbar'
  container.style.position = 'fixed'
  container.style.inset = '0px'
  container.style.zIndex = '99999'
  container.style.display = 'flex'
  container.style.backgroundColor = 'rgba(0,0,0,0.3)'
  container.style.cursor = 'progress'

  const wrapper = document.createElement('span')
  wrapper.style.position = 'fixed'
  wrapper.style.left = '50%'
  wrapper.style.top = '50%'
  wrapper.style.zIndex = '10000'
  wrapper.style.transform = 'translate(-50%, -50%)'
  wrapper.style.cursor = 'progress'

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '200px')
  svg.setAttribute('height', '200px')
  svg.style.width = '4rem'
  svg.style.height = '4rem'
  svg.style.color = '#fff'
  svg.style.stroke = '#a3a3a3'
  svg.setAttribute('viewBox', '0 0 100 100')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M82 50A32 32 0 1 1 23.533421623214014 32.01333190873183 L21.71572875253809 21.7157287525381 L32.013331908731814 23.53342162321403 A32 32 0 0 1 82 50'
  )
  path.setAttribute('stroke-width', '5')
  path.setAttribute('fill', 'none')

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )
  circle.setAttribute('cx', '50')
  circle.setAttribute('cy', '50')
  circle.setAttribute('r', '20')
  circle.setAttribute('stroke-width', '5')
  circle.setAttribute('stroke-dasharray', '31.41592653589793 31.41592653589793')
  circle.setAttribute('fill', 'none')
  circle.setAttribute('stroke-linecap', 'round')

  const animateTransform = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'animateTransform'
  )
  animateTransform.setAttribute('attributeName', 'transform')
  animateTransform.setAttribute('type', 'rotate')
  animateTransform.setAttribute('repeatCount', 'indefinite')
  animateTransform.setAttribute('dur', '1s')
  animateTransform.setAttribute('keyTimes', '0;1')
  animateTransform.setAttribute('values', '0 50 50;360 50 50')

  circle.appendChild(animateTransform)
  svg.appendChild(path)
  svg.appendChild(circle)
  wrapper.appendChild(svg)
  container.appendChild(wrapper)

  return container
}
