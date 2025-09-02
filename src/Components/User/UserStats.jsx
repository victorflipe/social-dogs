import React from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import { GET_STATS } from '../../../api'
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
// import UserStatsGraphs from './UserStatsGraphs'
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

const UserStats = () => {

  const { data, error, loading, request } = useFetch()

  React.useEffect(() => {
    async function getData() {
      const { url, options } = GET_STATS()
      await request(url, options)
    }
    getData()
  }, [request])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data)
    return (
      <React.Suspense fallback={<></>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    )
  return null
}

export default UserStats