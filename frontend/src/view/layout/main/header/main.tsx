import React, { useState } from 'react'

import { useRouter } from 'next/router'
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faUserTie,
  faBriefcase,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons'
import { Offcanvas } from 'react-bootstrap'

import uris from '../../../../config/uri'
import LinkMain from '../../../../components/link/main'
import LogoMain from '../../../widgets/logo/main'
import styles from './main.module.scss'

const HeaderMain: React.FC<{ isDesktop: boolean }> = ({ isDesktop }) => (
  <header className={styles['header-main']}>
    {isDesktop ? <HeaderDesktop /> : <HeaderMobile />}
  </header>
)

const HeaderDesktop = () => (
  <>
    <section className={styles.desktop}>
      <LogoMain />
      <NavLinks />
    </section>
  </>
)

const HeaderMobile = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <section className={styles.mobile}>
        <LogoMain />
        <button type="button" onClick={() => setOpenMenu(!openMenu)} aria-label="menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Offcanvas placement="end" show={openMenu} onHide={() => setOpenMenu(false)}>
          <Offcanvas.Header closeButton>
            <LogoMain />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NavLinks setOpenMenu={setOpenMenu} mobile />
          </Offcanvas.Body>
        </Offcanvas>
      </section>
    </>
  )
}

const NavLinks: React.FC<{
  mobile?: boolean
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ mobile, setOpenMenu }) => {
  const { pathname } = useRouter()
  const activeClassNameFormatter = (currentPath: string) =>
    cn({ [styles['current-nav']]: pathname === currentPath })
  return (
    <nav className={cn(styles['nav-links'], { [styles.mobile]: mobile })}>
      <ul className={cn(styles['link-list'])}>
        <li className={activeClassNameFormatter(uris.index)}>
          <LinkMain onClick={() => setOpenMenu && setOpenMenu(false)} to={uris.index}>
            {mobile && <FontAwesomeIcon icon={faBriefcase} />}
            Consoles
          </LinkMain>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMain
