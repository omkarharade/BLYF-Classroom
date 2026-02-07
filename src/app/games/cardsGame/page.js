"use client"

import React, { useState } from 'react'
import { cardQuestions } from '../../../../public/cardGame/questionsData'
import { QuestionToCardMapper } from '../../../../public/cardGame/questionToCardMapper'
import QuestionModal from '../../../components/QuestionModal'

export default function CardsGame() {
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  const openCard = (item) => {
    setSelected(item)
    setOpen(true)
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-4xl mb-6 text-center">Cards Game</h1>

      <div className="max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-6">
        {cardQuestions.map((c) => {
          const label = QuestionToCardMapper[c.card_id] || ''
          return (
            <button
              key={c.id}
              onClick={() => openCard(c)}
              aria-label={`Open card ${label}`}
              className="group relative rounded-2xl p-[2px] hover:scale-105 transform transition-shadow duration-200 shadow-lg"
            >
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                <div className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 rounded-xl px-6 py-8 min-h-[160px] flex flex-col items-center justify-center text-center">
                  <span className="block text-xs text-yellow-800 tracking-widest">CARD</span>
                  <div className="mt-3 text-xl md:text-2xl font-semibold text-yellow-900">
                    {label}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-indigo-300 pointer-events-none"></div>
            </button>
          )
        })}
      </div>

      <QuestionModal open={open} onClose={() => setOpen(false)} item={selected} />
    </div>
  )
}
