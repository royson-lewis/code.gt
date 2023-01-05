import React, { PropsWithChildren, useEffect, useState } from 'react'

import cn from 'classnames'
import { animated, useSpring } from '@react-spring/web'

import styles from './main.module.scss'

const LoaderMain: React.FC<
  PropsWithChildren<{
    loading?: boolean
  }>
> = ({ loading, children }) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (loading) {
      setLoad(true)
    }

    let timeout: NodeJS.Timeout
    if (!loading) {
      timeout = setTimeout(() => {
        setLoad(false)
      }, 1500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  return (
    <div className={cn(styles['loader-main-container'])}>
      {load && <LoaderAnimation />}
      {children}
    </div>
  )
}

const LoaderAnimation: React.FC = () => {
  const backgroundSprings = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  })

  const [logoTopSprings] = useSpring(
    {
      from: {
        y: -50,
        transform: 'rotate(0deg)',
      },
      to: [
        {
          y: 0,
          config: {
            bounce: 20,
            damping: 100.6,
            mass: 1,
          },
        },
        {
          y: -50,
          config: {
            bounce: 0,
          },
        },
        {
          y: -50,
          transform: 'rotate(360deg)',
        },
      ],
      loop: true,
    },
    [],
  )

  return (
    <animated.div style={backgroundSprings} className={styles['loader-animation']}>
      <div className={styles['animation-widget-container']}>
        <animated.h3 style={logoTopSprings}>Game</animated.h3>
        <h3>Tech</h3>
      </div>
    </animated.div>
  )
}

export default LoaderMain
