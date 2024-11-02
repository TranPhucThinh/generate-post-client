import { useCallback, useEffect, useRef, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { TPost } from './../../types'
import CardItem from '../card.item'
import ModalPost from '../modal.post'
import './styles.scss'

interface IBodyProps {
  posts?: TPost[]
  isLoadingCreate: boolean
  isLoadingPosts: boolean
}

const Body = ({ posts, isLoadingCreate, isLoadingPosts }: IBodyProps) => {
  const clickOutsideRef = useRef<HTMLDivElement | null>(null)
  const [selectedPost, setSelectedPost] = useState<TPost>()
  const [postId, setPostId] = useState<string | null>(null)

  const handleClosePostInfoModal = useCallback(() => {
    document.body.classList.remove('hidden-scrollbar')
    setPostId(null)
  }, [setPostId])

  const handleOpenPostInfoModal = (post: TPost) => {
    document.body.classList.add('hidden-scrollbar')
    setSelectedPost(post)
    setPostId(post.id)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target as Node)) {
        handleClosePostInfoModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickOutsideRef, handleClosePostInfoModal])

  return (
    <div className='body'>
      {isLoadingCreate && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <div className='body__content'>
        <div className='posts-list'>
          {(posts || []).map((post, index) => (
            <div key={index} className='post-card-container'>
              <CardItem post={post} handleOpenPostInfoModal={handleOpenPostInfoModal} />
            </div>
          ))}

          {isLoadingPosts && (
            <div className='post-card-container'>
              <SkeletonCard />
            </div>
          )}
        </div>
      </div>
      {postId ? (
        <ModalPost selectedPost={selectedPost!} modalRef={clickOutsideRef} onCloseModal={handleClosePostInfoModal} />
      ) : null}
    </div>
  )
}

function SkeletonCard() {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <div className='post-card post-card-loading'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton inline circle width={40} height={40} />
          <Skeleton inline width={130} height={40} borderRadius={12} />
        </div>
        <div style={{ marginTop: 28 }}>
          <Skeleton count={3} height={26} style={{ marginTop: 6 }} />
        </div>
        <div style={{ marginTop: 28 }}>
          <Skeleton height={200} width='100%' borderRadius={16} style={{ marginBottom: '16px' }} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default Body
