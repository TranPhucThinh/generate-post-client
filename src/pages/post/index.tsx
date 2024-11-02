import axios, { AxiosError } from 'axios'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { BsCopy } from 'react-icons/bs'
import { FaExternalLinkAlt, FaHome } from 'react-icons/fa'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  XIcon
} from 'react-share'
import { toast } from 'react-toastify'

import { TPost } from '@/types'
import './styles.scss'

const Post = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [post, setPost] = useState<TPost | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [relatedPosts, setRelatedPosts] = useState<TPost[]>([])

  const getProtocolAndDomain = (url: string) => {
    const parsedUrl = new URL(url)
    const protocol = parsedUrl.protocol
    const domain = parsedUrl.hostname

    return `${protocol}//${domain}`
  }

  const fetchPost = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/posts/${id}`)

      if (response) {
        setPost(response.data.data)
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
      setIsLoading(false)
    }
  }, [id])

  const fetchRelatedPosts = useCallback(async () => {
    if (post?.domain) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/posts-same-domain`, {
          params: { domain: post?.domain }
        })

        setRelatedPosts(response.data.data)
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError && error.response?.data?.error ? error.response.data.error : 'An error occurred'

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
      }
    }
  }, [post?.domain])

  const goToHomePage = () => {
    navigate('/')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchRelatedPosts()
  }, [fetchRelatedPosts])

  return (
    <>
      <div className='header'>
        <div className='header__button' onClick={goToHomePage}>
          <FaHome size={24} color='#ffffff' className='header__button--icon' />
        </div>
      </div>
      <div className='detail-post'>
        {isLoading ? (
          <SkeletonContent />
        ) : (
          <main className='detail-post__content'>
            <h1 className='detail-post__content--title'>{post?.title}</h1>
            <p className='detail-post__content--description'>{post?.content}</p>

            <div className='channel'>
              <span className='channel__created-date'>{moment(post?.created_at).format('MMM D')}</span>
              <span className='channel__domain'>
                From
                <a
                  href={post ? getProtocolAndDomain(post.original_link) : ''}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ display: 'inline-block', marginLeft: '10px', textDecoration: 'none', color: '#a8b3cf' }}
                >
                  {post?.domain}
                </a>
              </span>
            </div>

            <div className='detail-post__image'>
              <img src={post?.image_url} alt='Post Cover image' />
            </div>
          </main>
        )}

        <aside className='detail-post__aside'>
          <div className='aside__header'>
            <a
              className='aside__header--btn'
              href={post?.original_link}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={16} />
              Read post
            </a>
          </div>

          <div className='aside__channel'>
            <div className='channel__avatar'>
              <img src={post ? post.favicon : ''} alt='favicon' />
            </div>
            <a
              href={post ? getProtocolAndDomain(post.original_link) : ''}
              target='_blank'
              rel='noopener noreferrer'
              className='channel__domain'
            >
              {post ? post.domain : ''}
            </a>
          </div>

          <div className='aside__recommend aside-box'>
            <p className='aside-box--title'>Would you recommend this post?</p>
            <div className='aside__recommend--grid'>
              <div className='copy-link'>
                <div className='copy__icon'>
                  <BsCopy color='#a8b3cf' size={20} />
                </div>
                <p className='copy__text'>Copy link</p>
              </div>
              <FacebookShareButton className='button__share' url={`${window.location.origin}/posts/${id}`}>
                <FacebookIcon />
              </FacebookShareButton>
              <TelegramShareButton className='button__share' url={`${window.location.origin}/posts/${id}`}>
                <TelegramIcon />
              </TelegramShareButton>
              <TwitterShareButton className='button__share' url={`${window.location.origin}/posts/${id}`}>
                <XIcon />
              </TwitterShareButton>
              <EmailShareButton className='button__share' url={`${window.location.origin}/posts/${id}`}>
                <EmailIcon />
              </EmailShareButton>
            </div>
          </div>

          <div className='aside__you-like aside-box'>
            <p className='you-like__title aside-box--title'>You might like</p>
            <div className='you-like__content'>
              {(relatedPosts || []).map((post) => {
                if (id !== post.id) {
                  return (
                    <a
                      href={post?.original_link}
                      key={post.id}
                      className='post'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {post.title}
                    </a>
                  )
                }
              })}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

function SkeletonContent() {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <main className='detail-post__content'>
        <Skeleton width='100%' height={40} />
        <div style={{ marginTop: 28 }}>
          <Skeleton count={4} height={26} style={{ marginTop: 6 }} />
        </div>
        <Skeleton height={200} width='100%' borderRadius={16} style={{ marginTop: '20px' }} />
      </main>
    </SkeletonTheme>
  )
}

export default Post
