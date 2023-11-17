import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

//  /posts -> ['posts']
//  /posts/1 -> ['posts', post.id]
//  /posts?authorId=1 -> ['posts', { authorId: 1 }]
//  /posts/2/comments -> ['posts', post.id, 'comments']

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: '2', title: 'Post 2' },
]

function wait(duration: number, { page }: { page: number }) {
  console.log(page)
  return new Promise((resolve) => setTimeout(resolve, duration))
}

export default function ReactQuery() {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts', { page }],
    keepPreviousData: true,
    queryFn: () => wait(1000, { page }).then(() => [...POSTS]),
    // queryFn: () => Promise.reject('Error Message')
  })

  const newPostMutation = useMutation({
    mutationFn: async (title: string) => {
      return await wait(1000, { page }).then(() => POSTS.push({ id: crypto.randomUUID(), title }))
    },
    onSuccess: (data, variables, context) => {
      console.log(context) // { hi: 'bye' }
      queryClient.invalidateQueries(['posts'])
    },
    onMutate: (variables) => {
      return { hi: 'bye' }
    },
  })

  if (postsQuery.isLoading) return <h1>Loading</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div className='card'>
      TanStack Query
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        className='btn btn-warning'
        onClick={() => newPostMutation.mutate('New Post')}
        disabled={newPostMutation.isLoading}
      >
        Add New
      </button>
    </div>
  )
}
