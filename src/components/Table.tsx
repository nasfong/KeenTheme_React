import { useQuery } from '@apollo/client'
import { GET_RECIPE } from 'graphql/querys/recipe.query'

const Table = () => {
  const { loading, error, data } = useQuery(GET_RECIPE)

  if (error) return <div>{JSON.stringify(error)}</div>
  if (loading) return <div>Loading</div>
  return (
    <div className='table-responsive'>
      <table id='kt_customers_table' className='table align-middle table-row-dashed fs-6 gy-5'>
        <thead>
          <tr className='text-gray-400 fw-bolder fs-7 gs-0'>
            <th className=''>ID</th>
            <th className='min-w-100px'>Name</th>
            <th className='min-w-100px'>Description</th>
            <th className='min-w-125px'>ThumbUp</th>
            <th className=''>ThumbDown</th>
            {/* <th className=''>Status</th> */}
            {/* <th className='text-end min-w-100px'>Action</th> */}
          </tr>
        </thead>
        <tbody className='fw-bold text-gray-600'>
          {data?.recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe?.description}</td>
              <td>{recipe.thumbsUp}</td>
              <td>{recipe.thumbsDown}</td>
              {/* <td>Active</td> */}
              {/* <td className='text-end'>...</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
