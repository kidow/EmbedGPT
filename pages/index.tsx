import type { NextPage } from 'next'
import { Footer, Header } from 'containers'
import { Card, Collapse, SEO } from 'components'
import Link from 'next/link'

interface State {}

const HomePage: NextPage = () => {
  return (
    <>
      <SEO />
      <main>
        {/* <Header /> */}
        <div className="space-y-8 pt-40 text-center">
          <h1 className="text-4xl font-bold sm:text-7xl">EmbedGPT</h1>
          <div className="space-y-1 text-lg">
            <p>클릭 한 번으로 ChatGPT 대화를 공유하세요.</p>
            <p>트위터, 레딧 등의 커뮤니티에 손쉽게 임베드하세요.</p>
          </div>
          <div className="flex justify-center">
            <button className="flex items-center justify-center gap-3 rounded bg-stone-700 py-3 px-5 hover:bg-stone-700/90">
              <img src="/chrome.svg" alt="Chrome" className="h-5 w-5" />
              <span className="font-semibold text-white">
                Install Extension
              </span>
            </button>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-screen-md">
          <ul className="space-y-5">
            {Array.from({ length: 4 }).map((_, key) => (
              <Card key={key} />
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-screen-md">
          <h2 id="faqs" className="mb-6 text-4xl font-bold">
            <Link href="#faqs">FAQs</Link>
          </h2>
          <div>
            <Collapse
              list={[
                { title: 'Title 1', content: 'Content 1' },
                { title: 'Title 2', content: 'Content 2' },
                { title: 'Title 3', content: 'Content 3' }
              ]}
            />
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}

export default HomePage
