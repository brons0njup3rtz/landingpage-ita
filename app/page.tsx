"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"

export default function ProfilePage() {
  const [userLocation, setUserLocation] = useState({ city: "Madrid", country: "España", ip: "" })
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) throw new Error("Location fetch failed")
        const data = await response.json()
        setUserLocation({
          city: data.city || "Madrid",
          country: data.country_name || "España",
          ip: data.ip || "",
        })
      } catch (error) {
        // Fallback to ip-api.com
        try {
          const fallbackResponse = await fetch("https://ip-api.com/json/?fields=city,country,query")
          const fallbackData = await fallbackResponse.json()
          setUserLocation({
            city: fallbackData.city || "Madrid",
            country: fallbackData.country || "España",
            ip: fallbackData.query || "",
          })
        } catch {
          setUserLocation({
            city: "Madrid",
            country: "España",
            ip: "",
          })
        }
      } finally {
        setIsLoadingLocation(false)
      }
    }
    fetchLocation()
  }, [])




  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-110"
        style={{
          backgroundImage: "url(https://res.cloudinary.com/dkrhndxh7/image/upload/v1776625439/61247599-46CE-4981-99E0-5BEBDA06AF1E_enlmpj.jpg)",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Profile card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 border border-white/20 p-8 pb-12">
          {/* Profile header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-6">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dkrhndxh7/image/upload/v1776625017/IMG_1476_guxr4k.jpg"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white/20 object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-1 flex items-center justify-center gap-2">Jess ❤️ </h1>
            </div>

            {/* Status badges */}
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/90 text-white text-sm font-medium shadow-lg">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                En Línea
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                ⚡ Responde rápidamente
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm">
              <MapPin className="w-4 h-4" />
              {!isLoadingLocation && `${userLocation.city} ${userLocation.country}`}
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="text-white text-lg leading-relaxed">
              Hola, soy Jess y estoy buscando un compañero para contenido 🌶️ {!isLoadingLocation && `en ${userLocation.city}`}.
            </p>
          </div>

          {/* CTA Button - TG Tracker handles clicks */}
          <button
            id="tgtrc-button"
            className="group relative w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:from-pink-400 hover:via-pink-500 hover:to-purple-500 text-white shadow-xl hover:shadow-pink-500/50 transition-all duration-300 mb-4 hover:scale-105 active:scale-95 animate-pulse hover:animate-none cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <span className="relative flex items-center justify-center">
              <img src="/telegram-logo.svg" alt="Telegram" className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              SOLO RESPONDO AQUÍ
            </span>
          </button>



        </div>
      </div>
    </div>
  )
}
