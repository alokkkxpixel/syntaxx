"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
   const { techno} = useParams()
  return (
    <div> {techno} </div>
  )
}

export default page