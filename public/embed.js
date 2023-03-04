const block = document.querySelector('blockquote.embedgpt')

const container = document.createElement('div')
container.style.display = 'flex'
container.style.maxWidth = '816px'
container.style.width = '100%'
container.style.marginTop = '10px'
container.style.marginBottom = '10px'

const iframe = document.createElement('iframe')
iframe.style.flexGrow = '1'
iframe.setAttribute('scrolling', 'no')
iframe.setAttribute('allowtransparency', 'true')
iframe.setAttribute('allowfullscreen', 'true')
iframe.setAttribute('frameborder', '0')
iframe.setAttribute('title', 'EmbedGPT')
iframe.src = 'https://embedgpt.vercel.app/c/' + block.id
iframe.onload = function () {
  iframe.contentWindow.postMessage({ embedgpt: 'true' }, '*')
}
container.appendChild(iframe)

block.insertAdjacentElement('afterend', container)
block.remove()

window.addEventListener('message', function (e) {
  if (e.data.embedgpt === 'true') {
    iframe.style.height = e.data.height + 'px'
  }
})
