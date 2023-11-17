import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPosts } from './api/posts'

//  /posts -> ['posts']
//  /posts/1 -> ['posts', post.id]
//  /posts?authorId=1 -> ['posts', { authorId: 1 }]
//  /posts/2/comments -> ['posts', post.id, 'comments']

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: '2', title: 'Post 2' },
]

function wait(duration: any) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

export default function PostList1() {
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts'],
    getNextPageParam: (preData) => preData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
  })

  const newPostMutation = useMutation({
    mutationFn: async (title: string) => {
      return await wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title }))
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
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
