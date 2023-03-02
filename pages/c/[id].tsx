import { Icon, SEO } from 'components'
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType
} from 'next'
import { useMemo } from 'react'
import { supabase } from 'services'
import styles from 'styles/utils.module.css'

interface Props {
  title: string
  avatar_url: string
  content: string
}
interface State {}

const ConversationIdPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, avatar_url, content }) => {
  const items: Array<{ from: 'human' | 'gpt'; value: string }> = useMemo(
    () => JSON.parse(content),
    [content]
  )
  return (
    <>
      <SEO title={title.split('\n')[0]} />
      <div className="flex min-h-screen flex-col items-center bg-primary">
        {items.map((item, key) =>
          item.from === 'human' ? (
            <div
              key={key}
              className="w-full border-b border-gray-900/50 bg-primary text-gray-100"
            >
              <div className="m-auto flex gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
                <div className="relative flex w-[30px] flex-col items-end">
                  <div className="relative flex">
                    <img src={avatar_url} alt="User" />
                  </div>
                </div>
                <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                  <div className="flex flex-grow flex-col gap-3">
                    <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap text-[#ececf1]">
                      {item.value}
                    </div>
                  </div>
                  <div className="flex justify-between"></div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={key}
              className="group w-full border-b border-gray-900/50 bg-secondary text-gray-100"
            >
              <div className="m-auto flex gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
                <div className="relative flex w-[30px] flex-col items-end">
                  <div className="relative flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-brand p-1 text-white">
                    <Icon.ChatGPT />
                  </div>
                </div>
                <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                  <div className="flex flex-grow flex-col gap-3">
                    <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap text-[#d1d5db]">
                      <div
                        className={styles.response}
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between"></div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex items-center justify-center bg-primary py-10">
        <div>
          <div className="flex">Share</div>
        </div>
      </div>
      <div className="prose prose-invert" />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from('conversations').select('id')
  return {
    paths: data?.map((item) => ({ params: { id: item.id } })) || [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { data } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', params.id)
    .single()
  if (data) {
    return { props: data, revalidate: 60 }
  } else {
    return { redirect: { destination: '/', statusCode: 301 } }
  }
}

export default ConversationIdPage
