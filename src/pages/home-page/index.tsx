import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Body, Header } from '@/components'
import { SuccessResponse, TPost } from '@/types'

const HomePage = () => {
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true)
  const [posts, setPosts] = useState<TPost[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false)

  const fetchPost = async (page: number) => {
    setIsLoadingPosts(true)
    try {
      const response = await axios.get<SuccessResponse<TPost[]>>(`${process.env.REACT_APP_URL}/posts`, {
        params: {
          page,
          limit: 10
        }
      })

      if (response) {
        setPosts((prevPosts) => [...prevPosts, ...response.data.data])
        setTotalPosts(response.data.pagination.total)
      }
    } catch (error) {
      const errorMessage = (error as AxiosError).message || 'Error occurred'

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    } finally {
      setIsLoadingPosts(false)
    }
  }

  useEffect(() => {
    fetchPost(page)
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight &&
        !isLoadingPosts &&
        posts.length < totalPosts
      ) {
        setPage((prevPage) => prevPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoadingPosts, posts.length, totalPosts])

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Header
        fetchPost={fetchPost}
        setPosts={setPosts}
        setTotalPosts={setTotalPosts}
        setIsLoadingCreate={setIsLoadingCreate}
        isLoadingCreate={isLoadingCreate}
      />
      <Body posts={posts} isLoadingCreate={isLoadingCreate} isLoadingPosts={isLoadingPosts} />
    </>
  )
}

export default HomePage
