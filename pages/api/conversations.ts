import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import NextCors from 'nextjs-cors'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: 'https://chat.openai.com',
    optionsSuccessStatus: 200
  })
  const supabase = createServerSupabaseClient<Database>({ req, res })

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('conversations')
      .select('content, avatar_url')
      .order('created_at', { ascending: false })
    if (error) return res.status(400).json(error)
    return res.status(200).json({ success: true, data })
  } else if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        id: Math.random().toString(36).slice(2),
        avatar_url: req.body.avatarUrl,
        title: req.body.items[0]?.value,
        content: JSON.stringify(req.body.items)
      })
      .select('id')
      .single()
    if (error) return res.status(400).json(error)
    return res.status(200).json({ success: true, id: data.id })
  } else if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
  } else {
    res.status(405).json({ success: false })
  }
}
