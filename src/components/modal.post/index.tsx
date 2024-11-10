import { ShowMore, type ShowMoreRef, type ShowMoreToggleLinesFn } from '@re-dev/react-truncate'
import axios, { AxiosError } from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BsCopy } from 'react-icons/bs'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
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

import { TPost } from '../../types'
import './styles.scss'

interface IModalPostProps {
  selectedPost: TPost
  onCloseModal: () => void
  modalRef: React.RefObject<HTMLDivElement> | null
}

const ModalPost: React.FC<IModalPostProps> = ({ modalRef, onCloseModal, selectedPost }) => {
  const [post, setPost] = useState<TPost | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [relatedPosts, setRelatedPosts] = useState<TPost[]>([])

  const ref = useRef<ShowMoreRef>(null)

  const { id, domain, favicon, original_link } = selectedPost

  const handleCopyLink = () => {
    const url = `${window.location.origin}/posts/${id}`

    navigator.clipboard.writeText(url).then(() => {
      toast.info('Copied link to clipboard', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    })
  }

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
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/posts-same-domain`, {
        params: { domain: domain }
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
  }, [domain])

  const toggleLines: ShowMoreToggleLinesFn = (e) => {
    ref.current?.toggleLines(e)
  }

  const filteredPosts = useMemo(() => relatedPosts?.filter((post) => post.id !== id) || [], [relatedPosts, id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchRelatedPosts()
  }, [fetchRelatedPosts])

  return (
    <div className='modal-post'>
      <div ref={modalRef} className='post-info-container'>
        <div className='post-info'>
          {isLoading ? (
            <SkeletonContent />
          ) : (
            <main className='post-info__content'>
              <h1 className='post-info__content--title'>{post?.title}</h1>
              <div className='post-info__content--description'>
                <ShowMore
                  ref={ref}
                  className='content'
                  lines={3}
                  more={
                    <p style={{ color: '#a8b3cf', cursor: 'pointer' }} onClick={toggleLines}>
                      ... Show more
                    </p>
                  }
                  less={
                    <p style={{ color: '#a8b3cf', cursor: 'pointer' }} onClick={toggleLines}>
                      Show less
                    </p>
                  }
                >
                  {post?.content}
                </ShowMore>
              </div>
              <div>
                <span className='post-card__created-date'>{moment(post?.created_at).format('MMM D')}</span>
                <span className='post-card__domain'>
                  From
                  <a
                    href={original_link ? getProtocolAndDomain(original_link) : ''}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ display: 'inline-block', marginLeft: '10px', textDecoration: 'none', color: '#a8b3cf' }}
                  >
                    {post?.domain}
                  </a>
                </span>
              </div>
              <div className='post-info__image'>
                <img src={post?.image_url} alt='Post Cover image' />
              </div>
            </main>
          )}

          <aside className='post-info__aside'>
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
              <button type='button' onClick={onCloseModal} className='close-button'>
                <IoMdClose color='#ffffff' size={24} />
              </button>
            </div>

            <div className='aside__channel'>
              <div className='channel__avatar'>
                <img src={favicon ? favicon : ''} alt='favicon' />
              </div>
              <a
                href={original_link ? getProtocolAndDomain(original_link) : ''}
                target='_blank'
                rel='noopener noreferrer'
                className='channel__domain'
              >
                {domain}
              </a>
            </div>

            <div className='aside__recommend aside-box'>
              <p className='aside-box--title'>Would you recommend this post?</p>
              <div className='aside__recommend--grid'>
                <div className='copy-link' onClick={handleCopyLink}>
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

            {filteredPosts.length > 0 && (
              <div className='aside__you-like aside-box'>
                <p className='you-like__title aside-box--title'>You might like</p>
                <div className='you-like__content'>
                  {(filteredPosts || []).map((post) => {
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
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function SkeletonContent() {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <main className='post-info__content'>
        <Skeleton width='100%' height={40} />
        <div style={{ marginTop: 28 }}>
          <Skeleton count={4} height={26} style={{ marginTop: 6 }} />
        </div>
        <Skeleton height={200} width='100%' borderRadius={16} style={{ marginTop: '20px' }} />
      </main>
    </SkeletonTheme>
  )
}

export default ModalPost
