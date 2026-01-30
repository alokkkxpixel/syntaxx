import { Tech } from "@prisma/client"



export const fetchTech = async () => {
    
    try {
      ""
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tech`,{
            cache: 'no-cache'
        })
        if (!res.ok) throw new Error("Failed to fetch technologies")

        const data: Tech[] = await res.json()
        return data

    }catch (error) {
        console.log(error)
    }   



    
}