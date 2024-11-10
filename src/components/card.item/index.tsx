import moment from 'moment'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { TPost } from '@/types'
import './styles.scss'

interface ICardItemProps {
  post: TPost
  handleOpenPostInfoModal: (post: TPost) => void
}

const CardItem: React.FC<ICardItemProps> = ({ post, handleOpenPostInfoModal }) => {
  return (
    <div className='post-card'>
      <div className='post-card__header'>
        <div className='header__favicon'>
          <img src={post ? post.favicon : ''} alt='favicon' />
        </div>
        <a
          className='post-card__header--btn'
          href={post.original_link}
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.stopPropagation()}
        >
          Read post
          <FaExternalLinkAlt size={16} />
        </a>
      </div>
      <div className='post-card__content' onClick={() => handleOpenPostInfoModal(post)}>
        <h2 className='post-card__content--title'>{post.title}</h2>
        <p className='post-card__created-date'>{moment(post.created_at).format('MMM D')}</p>
        <div className='post-card__content--image'>
          <img src={post.image_url} alt='Post Cover image' />
        </div>
      </div>
    </div>
  )
}

export default CardItem
