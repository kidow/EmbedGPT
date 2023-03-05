import type { GetStaticProps, NextPage } from 'next'
import { Footer, Header } from 'containers'
import { Card, Collapse, Icon, SEO, Spinner, Tooltip } from 'components'
import Link from 'next/link'
import { captureException, useObjectState } from 'services'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import Script from 'next/script'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

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
  const { t, i18n } = useTranslation('common')
  const { locale } = useRouter()

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
        <Header />
        <div className="space-y-8 pt-40 text-center">
          <h1 className="text-4xl font-bold sm:text-7xl">EmbedGPT</h1>
          <div className="space-y-1 text-lg">
            <p>{t('landing.description.1')}</p>
            <p>{t('landing.description.2')}</p>
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
                  {t('landing.view_more')}
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
            <h3>{t('landing.guides.1.title')}</h3>
            <div>
              <p>{t('landing.guides.1.description')}</p>
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
            <h3>{t('landing.guides.2.title')}</h3>
            <div>
              <img src="/icon_click.png" alt="" className="h-40 w-40" />
              <p className="mt-4">{t('landing.guides.2.description')}</p>
            </div>
            <h3>{t('landing.guides.3.title')}</h3>
            <div>
              <p>{t('landing.guides.3.description')}</p>
              <span className="my-4 inline-block rounded-full border border-neutral-700 p-1">
                <Icon.Embed className="h-5 w-5 fill-neutral-500" />
              </span>
              <p>
                {i18n.language === 'ko' ? (
                  <>
                    <code className="rounded-md bg-neutral-800 p-1 text-sm">{`<blockquote...`}</code>
                    로 시작하는 코드를 복사해서 HTML 편집기에 붙여넣기 하세요.
                  </>
                ) : (
                  <>
                    Copy the code starting with{' '}
                    <code className="rounded-md bg-neutral-800 p-1 text-sm">{`<blockquote...`}</code>{' '}
                    and paste it into your HTML editor.
                  </>
                )}
              </p>
              <div className="flex items-center justify-between rounded-xl border border-neutral-600 bg-black p-2">
                <span className="flex-1 truncate p-2">
                  {`<blockquote id="xxxxxxxxxx" class="embedgpt"></blockquote><script async src="https://embedgpt.vercel.app/embed.js"></script>`}
                </span>
                <span className="flex h-9 w-16 items-center justify-center rounded-xl bg-brand">
                  {t('landing.guides.3.copy')}
                </span>
              </div>
            </div>
            <h3>{t('landing.guides.4.title')}</h3>
            {locale === 'ko' ? (
              <blockquote id="yr8sk3pxn1" className="embedgpt"></blockquote>
            ) : (
              <blockquote id="yuofrqqeqt" className="embedgpt"></blockquote>
            )}
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
                  title: t('landing.faqs.1.title'),
                  content: t('landing.faqs.1.content')
                },
                {
                  title: t('landing.faqs.2.title'),
                  content: t('landing.faqs.2.content')
                },
                {
                  title: t('landing.faqs.3.title'),
                  content: t('landing.faqs.3.content')
                }
              ]}
            />
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    }
  }
}

export default HomePage
