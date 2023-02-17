import '@/index.css'

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Link,
  Outlet,
  ReactRouter,
  RootRoute,
  Route,
  RouterProvider,
  useParams
} from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// Mocks initialization
if (process.env.NODE_ENV === 'development-mocks') {
  const { worker } = await import('@/mocks/browser')
  worker.start()
}

// Your code starts here
/* eslint-disable react-hooks/rules-of-hooks */

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className='flex gap-2 p-2 text-lg' data-testId='NavBar'>
        <Link
          to='/'
          activeProps={{
            className: 'font-bold'
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to='/posts'
          activeProps={{
            className: 'font-bold'
          }}
        >
          Posts
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div className='p-2'>
      <h3>Welcome Home!</h3>
    </div>
  )
})

const postsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'posts',
  onLoad: () =>
    queryClient.ensureQueryData({ queryKey: ['posts'], queryFn: fetchPosts }),
  component: () => {
    const postsQuery = useQuery(['posts'], fetchPosts)

    return (
      <div className='flex gap-2 p-2'>
        <ul className='list-disc pl-4'>
          {postsQuery.data?.map(post => (
            <li key={post.id} className='whitespace-nowrap'>
              <Link
                to={postRoute.fullPath}
                params={{
                  postId: post.id
                }}
                className='block py-1 text-blue-800 hover:text-blue-600'
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{post.title.substring(0, 20)}</div>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <Outlet />
      </div>
    )
  },
  errorComponent: () => 'Oh crap!'
})

const postsIndexRoute = new Route({
  getParentRoute: () => postsRoute,
  path: '/',
  component: () => <div>Select a post.</div>
})

const postRoute = new Route({
  getParentRoute: () => postsRoute,
  path: '$postId',
  onLoad: async ({ params: { postId } }) =>
    queryClient.ensureQueryData(['posts', postId], () => fetchPostById(postId)),
  component: () => {
    const { postId } = useParams({ from: postRoute.id })
    const postQuery = useQuery(['posts', postId], () => fetchPostById(postId), {
      enabled: !!postId
    })

    return (
      <div className='space-y-2'>
        <h4 className='text-xl font-bold underline'>{postQuery.data?.title}</h4>
        <div className='text-sm'>{postQuery.data?.body}</div>
      </div>
    )
  }
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  postsRoute.addChildren([postsIndexRoute, postRoute])
])

const router = new ReactRouter({
  routeTree
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      useErrorBoundary: true
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools
        position='bottom-left'
        toggleButtonProps={{
          style: {
            marginLeft: '4rem',
            transform: `scale(.7)`,
            transformOrigin: 'bottom left'
          }
        }}
      />
    </QueryClientProvider>
  )
}

interface PostType {
  id: string
  userId: string
  title: string
  body: string
}

async function fetchPosts(): Promise<PostType[]> {
  console.log('Fetching posts...')
  await new Promise(r => {
    setTimeout(r, 500)
  })
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  return posts.slice(0, 10)
}

async function fetchPostById(postId: string): Promise<PostType> {
  console.log(`Fetching post with id ${postId}...`)
  await new Promise(r => {
    setTimeout(r, 500)
  })
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )
  const data = await response.json()
  return data
}

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
