import React from 'react'

const HomePage = React.lazy(() => import('./home-page'))
const Post = React.lazy(() => import('./post'))

export default { HomePage, Post }
