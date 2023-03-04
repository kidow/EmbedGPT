import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import NextCors from 'nextjs-cors'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200
  })

  const supabase = createServerSupabaseClient<Database>({ req, res })

  const { data } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', req.query.id)
    .single()
  return res.status(200).json(data)
}
