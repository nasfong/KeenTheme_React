import { useQueryMenu } from "hook/useMenu"
import { ChangeEvent } from "react"

const GraphqlPage = () => {
  const { data, loading } = useQueryMenu()

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    console.log(e)
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <h1>Graphql</h1>
      <h2>Home Page</h2>
      {data?.getAllMenus.map(item => (
        <span key={item.id}>{item.name}</span>
      ))}
      <input type="text" onChange={handleChange} />
    </>
  )
}

export default GraphqlPage