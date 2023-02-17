import { rest } from 'msw'

import post from './data/post.json'

const handlers = [
  rest.get('/post', (_, response, context) => response(context.json(post)))
]

export default handlers
