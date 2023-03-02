import type { NextPage } from 'next'
import { Footer, Header } from 'containers'
import { Card, Collapse, SEO, Spinner } from 'components'
import Link from 'next/link'
import { captureException, useObjectState } from 'services'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'

interface Props {
  data: Database['public']['Tables']['conversations']['Row'][] | null
  count: number | null
}
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
      .range((page - 1) * 5, page * 5 - 1)
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
            {list.map((item, key) => (
              <Card key={key} {...item} />
            ))}
          </ul>
          {isLoading && (
            <div className="flex justify-center py-10">
              <Spinner className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-screen-md">
          <h2 id="faqs" className="mb-6 text-4xl font-bold">
            <Link href="#faqs">FAQs</Link>
          </h2>
          <div>
            <Collapse
              list={[
                {
                  title: 'ChatGPT 내용을 어떻게 공유할 수 있나요?',
                  content:
                    '홈페이지 상단에 위치한 "Install Extension"을 클릭하여 크롬 확장 프로그램을 설치하 주세요. 이 후 ChatGPT에 들어가서 공유하고 싶은 대화에서 아이콘을 클릭하면 자동으로 EmbedGPT에 공유됩니다.'
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
