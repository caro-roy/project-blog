import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Play, Pause, RotateCcw } from 'react-feather'
import { motion } from 'framer-motion'

import Card from '@/components/Card'
import VisuallyHidden from '@/components/VisuallyHidden'

import styles from './CircularColorsDemo.module.css'

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
]

function CircularColorsDemo() {
  const id = React.useId()
  const [timeElapsed, setTimeElapsed] = React.useState(0)
  const [counterStatus, setCounterStatus] = React.useState('paused')

  const selectedColor = COLORS[timeElapsed % COLORS.length]

  useEffect(() => {
    if (counterStatus !== 'running') {
      return
    }

    const interval = setInterval(() => {
      setTimeElapsed(timeElapsed => timeElapsed + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [counterStatus])

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value

          return (
            <li className={styles.color} key={index}>
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-border`}
                  className={styles.selectedColorOutline}
                />
              )}
            </li>
          )
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {counterStatus === 'running' ? (
            <button onClick={() => setCounterStatus('paused')}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          ) : (
            <button onClick={() => setCounterStatus('running')}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          <button
            onClick={() => {
              setTimeElapsed(0)
              setCounterStatus('paused')
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CircularColorsDemo
