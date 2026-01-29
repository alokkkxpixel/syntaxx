import React from 'react'

const page = async ({ params }: { params: { techno: string } }) => {
   const { techno }= await params;
  return (
    <div> {techno} </div>
  )
}

export default page