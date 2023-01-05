import React from 'react'

import cn from 'classnames'

import styles from './main.module.scss'
import uris from '../../../config/uri'
import LinkMain from '../../../components/link/main'

const LogoMain: React.FC<{
  disableLink?: boolean
}> = ({ disableLink }) => (
  <div className={cn(styles['logo-main-container'])}>
    <LinkMain
      style={{ pointerEvents: disableLink ? 'none' : 'all' }}
      to={disableLink ? '#' : uris.index}
    >
      Gametech
    </LinkMain>
  </div>
)

export default LogoMain
