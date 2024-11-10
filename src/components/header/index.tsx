import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { MdCreate } from 'react-icons/md'
import { toast } from 'react-toastify'

import { TPost } from '@/types'
import './styles.scss'

interface IHeader {
  fetchPost: (page: number) => Promise<void>
  setPosts: React.Dispatch<React.SetStateAction<TPost[]>>
  setTotalPosts: React.Dispatch<React.SetStateAction<number>>
  isLoadingCreate: boolean
  setIsLoadingCreate: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ fetchPost, setPosts, setTotalPosts, isLoadingCreate, setIsLoadingCreate }: IHeader) => {
  const [linkInput, setLinkInput] = useState<string | null>(null)

  const onChangeLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value.trim())
  }

  const fetchInfoArticle = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!linkInput) return

      setIsLoadingCreate(true)
      try {
        await axios.get(`${process.env.REACT_APP_URL}/scrape-post`, {
          params: { url: linkInput }
        })

        toast.success('Create successfully!', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })

        setLinkInput('')
        setPosts([])
        setTotalPosts(0)
        await fetchPost(1)
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : 'An error occurred'

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
        setIsLoadingCreate(false)
      }
    }
  }

  return (
    <div className='header'>
      <div className='input'>
        <div className='input__icon'>
          <MdCreate size={20} />
        </div>
        <input
          className={isLoadingCreate ? 'disabled_input input__field' : 'input__field'}
          placeholder='Enter link...'
          name='link'
          onChange={onChangeLinkInput}
          onKeyDown={fetchInfoArticle}
          disabled={isLoadingCreate}
          value={linkInput as string}
        />
      </div>
      {isLoadingCreate && <p className='loading__text'>Creating...</p>}
    </div>
  )
}

export default Header
