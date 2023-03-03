import { Icon, SEO, Tooltip } from 'components'
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType
} from 'next'
import { useMemo } from 'react'
import { supabase, toast } from 'services'
import * as cheerio from 'cheerio'
import { LinkIcon } from '@heroicons/react/24/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { EnvelopeIcon } from '@heroicons/react/20/solid'

interface Props {
  title: string
  avatar_url: string
  content: string
}
interface State {}

const ConversationIdPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, avatar_url, content }) => {
  const { query } = useRouter()
  const items: Array<{ from: 'human' | 'gpt'; value: string }> = useMemo(
    () => JSON.parse(content),
    [content]
  )

  const description: string = useMemo(
    () => cheerio.load(items[1].value, null, false).text().substring(0, 120),
    [items]
  )
  return (
    <>
      <SEO title={title.split('\n')[0]} description={description} />
      <div className="flex min-h-screen flex-col items-center bg-primary">
        {items.map((item, key) => (
          <div
            key={key}
            className={classnames(
              'w-full border-b border-gray-900/50 text-gray-100',
              item.from === 'human' ? 'bg-primary' : 'bg-secondary'
            )}
          >
            <div className="m-auto flex gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
              <div className="relative flex w-[30px] flex-col items-end">
                <div
                  className={classnames('relative flex', {
                    'h-[30px] w-[30px] items-center justify-center rounded-sm bg-brand p-1 text-white':
                      item.from === 'gpt'
                  })}
                >
                  {item.from === 'human' ? (
                    <img src={avatar_url} alt="User" />
                  ) : (
                    <Icon.ChatGPT />
                  )}
                </div>
              </div>
              <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                <div className="flex flex-grow flex-col gap-3">
                  <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap text-[#ececf1]">
                    {item.from === 'human' ? (
                      item.value
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: item.value }} />
                    )}
                  </div>
                </div>
                <div className="flex justify-between"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center bg-primary py-10 lg:hidden">
        <div>
          <div className="flex items-center gap-4">
            <Tooltip content="Copy URL">
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_BASE_URL}/c/${query.id}`}
                onCopy={() => toast.success('복사되었습니다.')}
              >
                <button>
                  <LinkIcon className="h-6 w-6 text-[#d1d5db]" />
                </button>
              </CopyToClipboard>
            </Tooltip>
            <Tooltip content="퍼가기">
              <button>
                <Icon.Embed className="h-6 w-6 fill-[#d1d5db]" />
              </button>
            </Tooltip>
            <Tooltip content="Email">
              <button>
                <EnvelopeIcon className="h-6 w-6 text-[#d1d5db]" />
              </button>
            </Tooltip>
            <Tooltip content="Twitter">
              <button>
                <Icon.Twitter className="h-6 w-6 fill-[#d1d5db]" />
              </button>
            </Tooltip>
            <Tooltip content="Facebook">
              <button>
                <Icon.Facebook className="h-6 w-6 fill-[#d1d5db]" />
              </button>
            </Tooltip>
            <Tooltip content="Reddit">
              <button>
                <Icon.Reddit className="h-6 w-6 fill-[#d1d5db]" />
              </button>
            </Tooltip>
            <Tooltip content="LinkedIn">
              <button>
                <Icon.LinkedIn className="h-6 w-6 fill-[#d1d5db]" />
              </button>
            </Tooltip>
            <Tooltip content="카카오톡">
              <button>
                <Icon.KakaoTalk className="h-6 w-6 fill-[#d1d5db]" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="prose prose-invert" />
      <div className="fixed top-16 left-[calc((100vw-768px)/2+768px)] hidden lg:block">
        <ul className="share-floating">
          <li>
            <Tooltip position="left" content="Copy URL">
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_BASE_URL}/c/${query.id}`}
                onCopy={() => toast.success('복사되었습니다.')}
              >
                <button>
                  <LinkIcon className="text-neutral-300" />
                </button>
              </CopyToClipboard>
            </Tooltip>
          </li>
          <li>
            <Tooltip position="left" content="퍼가기">
              <button>
                <Icon.Embed className="fill-neutral-300" />
              </button>
            </Tooltip>
          </li>
          <li>
            <Tooltip position="left" content="이메일">
              <button>
                <EnvelopeIcon className="fill-neutral-300" />
              </button>
            </Tooltip>
          </li>
          <li>
            <button>
              <Icon.Twitter className="fill-neutral-300" />
            </button>
          </li>
          <li>
            <button>
              <Icon.Facebook className="fill-neutral-300" />
            </button>
          </li>
          <li>
            <button>
              <Icon.KakaoTalk className="fill-neutral-300" />
            </button>
          </li>
          <li>
            <button>
              <Icon.Reddit className="fill-neutral-300" />
            </button>
          </li>
          <li>
            <button>
              <Icon.LinkedIn className="fill-neutral-300" />
            </button>
          </li>
        </ul>
      </div>
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
