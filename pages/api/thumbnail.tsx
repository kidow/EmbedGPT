import type { NextApiRequest, NextApiResponse } from 'next'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge'
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new ImageResponse(<div>asd</div>, {
    width: 1024,
    height: 512
  })
}
