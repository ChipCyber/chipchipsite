import { useContext } from 'react'
import { LoadingContext } from '../context/loading'

const useLoading = () => {
  const { isLoading, showLoading, closeLoading } = useContext(LoadingContext)
  return { isLoading, showLoading, closeLoading }
}

export default useLoading
