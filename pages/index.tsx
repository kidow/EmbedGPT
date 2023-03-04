import type { NextPage } from 'next'
import { Footer, Header } from 'containers'
import { Card, Collapse, Icon, SEO, Spinner, Tooltip } from 'components'
import Link from 'next/link'
import { captureException, useObjectState } from 'services'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import Script from 'next/script'

interface State {
  total: number
  page: number
  list: Database['public']['Tables']['conversations']['Row'][]
  isLoading: boolean
}

const HomePage: NextPage = () => {
  const [{ page, total, list, isLoading }, setState] = useObjectState<State>({
    page: 1,
    total: 0,
    list: [],
    isLoading: false
  })
  const supabase = useSupabaseClient<Database>()

  const get = async (page: number = 1) => {
    if (isLoading) return
    setState({ isLoading: true })
    const { data, error, count } = await supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)
    if (error) {
      captureException(error)
      return
    }
    setState({
      page,
      list: page === 1 ? data : [...list, ...data],
      total: count || 0,
      isLoading: false
    })
  }

  useEffect(() => {
    get()
  }, [])
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
          <div className="flex justify-center gap-3">
            <Link
              href="https://chrome.google.com/webstore/detail/embedgpt-chatgpt/nbjoccgcnhjmhpholoagaodhgiehbloa"
              target="_blank"
              className="flex items-center justify-center gap-3 rounded bg-stone-700 py-3 px-5 hover:bg-stone-700/90"
            >
              <img src="/chrome.svg" alt="Chrome" className="h-5 w-5" />
              <span className="font-semibold text-white">
                Install Extension
              </span>
            </Link>
            <Tooltip content="Coming soon!">
              <button className="flex items-center justify-center rounded-full bg-stone-700 p-5 hover:bg-stone-700/90">
                <img src="/Whale.svg" alt="Whale" className="h-5 w-5" />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-screen-md">
          <ul className="space-y-10">
            {list.map((item, key) => (
              <Card key={key} {...item} />
            ))}
          </ul>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner className="h-5 w-5" />
            </div>
          ) : (
            list.length < total && (
              <div className="flex justify-center pt-20 pb-5">
                <button
                  onClick={() => get(page + 1)}
                  className="rounded-md border border-secondary bg-primary py-2 px-4"
                >
                  더 보기
                </button>
              </div>
            )
          )}
        </div>

        <div className="mx-auto mt-16 max-w-screen-md">
          <h2 id="Guides" className="mb-6 ml-4 text-4xl font-bold lg:ml-0">
            Guides
          </h2>
          <div className="steps">
            <h3>확장 앱 설치</h3>
            <div>
              <p>다음 링크를 클릭하여 확장 앱을 설치해주세요.</p>
              <p>
                <Link
                  href="https://chrome.google.com/webstore/detail/embedgpt-chatgpt/nbjoccgcnhjmhpholoagaodhgiehbloa"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Chrome
                </Link>
              </p>
            </div>
            <h3>아이콘 클릭</h3>
            <div>
              <img src="/icon_click.png" alt="" className="h-40 w-40" />
              <p className="mt-4">ChatGPT 사이트에서 앱 아이콘을 클릭하세요.</p>
            </div>
            <h3>코드 복사</h3>
            <div>
              <p>상세 페이지에서 다음 모양의 아이콘을 클릭하세요.</p>
              <span className="my-4 inline-block rounded-full border border-neutral-700 p-1">
                <Icon.Embed className="h-5 w-5 fill-neutral-500" />
              </span>
              <p>
                <code className="rounded-md bg-neutral-800 p-1 text-sm">{`<blockquote...`}</code>
                로 시작하는 코드를 복사해서 HTML 편집기에 붙여넣기 하세요.
              </p>
              <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
                <span className="flex-1 truncate p-2">
                  {`<blockquote id="xxxxxxxxxx" class="embedgpt"></blockquote><script async src="https://embedgpt.vercel.app/embed.js"></script>`}
                </span>
                <span className="flex h-9 w-16 items-center justify-center rounded-xl bg-brand">
                  복사
                </span>
              </div>
            </div>
            <h3>완료!</h3>
            <blockquote id="0r1y3r7lbooo" className="embedgpt"></blockquote>
            <Script async src="https://embedgpt.vercel.app/embed.js"></Script>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-screen-md">
          <h2 id="faqs" className="mb-6 ml-4 text-4xl font-bold lg:ml-0">
            <Link href="#faqs">FAQs</Link>
          </h2>
          <div>
            <Collapse
              list={[
                {
                  title: 'ChatGPT 내용을 어떻게 공유할 수 있나요?',
                  content:
                    '홈페이지 상단에 위치한 "Install Extension"을 클릭하여 크롬 확장 프로그램을 설치해 주세요. 이 후 ChatGPT에 들어가서 공유하고 싶은 대화에서 아이콘을 클릭하면 자동으로 EmbedGPT에 공유됩니다.'
                },
                {
                  title: '개인정보를 가져가지는 않나요?',
                  content:
                    'EmbedGPT는 가입도 필요 없으며, ChatGPT 내용을 가져오는 과정에서 유저 아바타 URL과 내용말고는 개인정보와 관련된 어떤 정보도 수집하지 않습니다.'
                },
                { title: '무료인가요?', content: '모든 기능은 무료입니다!' }
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
