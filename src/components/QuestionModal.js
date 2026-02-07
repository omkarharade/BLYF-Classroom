"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Play, Square, RotateCcw } from 'lucide-react'

export default function QuestionModal({
  open,
  onClose,
  item,
  onCorrect,
  onIncorrect,
  onTimeout,
  initialSeconds = 30,
}) {
  const [timer, setTimer] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimer(initialSeconds)
      setRunning(false)
    } else {
      setRunning(false)
    }
  }, [open, initialSeconds])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            if (onTimeout) onTimeout()
            if (onClose) onClose()
            return 0
          }
          return t - 1
        })
      }, 1000)
    }

    return () => clearInterval(intervalRef.current)
  }, [running])

  if (!open || !item) return null

  const startTimer = () => setRunning(true)
  const stopTimer = () => {
    setRunning(false)
    clearInterval(intervalRef.current)
  }
  const resetTimer = () => {
    stopTimer()
    setTimer(initialSeconds)
  }

  const handleAnswer = (isCorrect) => {
    stopTimer()
    if (isCorrect) {
      if (onCorrect) onCorrect(item)
    } else {
      if (onIncorrect) onIncorrect(item)
    }
    if (onClose) onClose()
  }

  const handleTimeoutClick = () => {
    stopTimer()
    if (onTimeout) onTimeout(item)
    if (onClose) onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl text-black mx-4">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-2xl mb-2">Question</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">Close</button>
        </div>

        {/* Timer */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">⏱ {timer}s</span>
          <div className="flex gap-3">
            <button onClick={startTimer} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600" title="Start Timer">
              <Play size={18} />
            </button>
            <button onClick={stopTimer} className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600" title="Stop Timer">
              <Square size={18} />
            </button>
            <button onClick={resetTimer} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600" title="Reset Timer">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-lg font-medium">{item.q}</p>
        </div>

        <div className="mb-4">
          <details className="bg-yellow-100 rounded p-3">
            <summary className="cursor-pointer font-semibold text-yellow-800 text-lg">Reveal Answer</summary>
            <div className="mt-4 text-black">
              <p className="text-base">{item.ans || 'No answer provided.'}</p>
            </div>
          </details>
        </div>

        <div className="flex justify-start gap-4">
          <button onClick={() => handleAnswer(true)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Correct</button>
          <button onClick={() => handleAnswer(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Incorrect</button>
          <button onClick={handleTimeoutClick} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Timeout</button>
        </div>
      </div>
    </div>
  )
}
