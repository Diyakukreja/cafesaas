'use client'

import { useState, useEffect } from 'react'
import { Cafe } from '@/types'
import QRCode from 'qrcode'
import { Printer, Download, ScanLine } from 'lucide-react'

export function QrGenerator({ cafe }: { cafe: Cafe }) {
  const [tableNumber, setTableNumber] = useState<string>('1')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  const themeColor = cafe.theme_color || '#4f46e5'

  useEffect(() => {
    // Generate the URL based on the current slug and table number
    const targetUrl = `${siteUrl}/c/${cafe.slug}${tableNumber ? `?table=${tableNumber}` : ''}`

    // Generate the QR Code image
    QRCode.toDataURL(
      targetUrl,
      {
        width: 1200, // High res for printing
        margin: 2,
        color: {
          dark: '#000000', // Best contrast for scanning
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H', // High error correction in case logo is overlaid later or it gets dirty
      },
      (err, url) => {
        if (!err) setQrDataUrl(url)
      }
    )
  }, [tableNumber, cafe.slug, siteUrl])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.download = `${cafe.slug}-table-${tableNumber || 'general'}-qr.png`
    link.href = qrDataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      
      {/* Configuration Panel (Hidden on Print) */}
      <div className="lg:col-span-4 space-y-6 print:hidden">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Table Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Table Number / Identifier
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 1, 12, Patio-A"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow outline-none"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Scanning this QR will open the menu and securely log the customer into this specific table.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors shadow-sm"
          >
            <Printer className="w-5 h-5" />
            Print Placard
          </button>
          
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-3 rounded-xl font-semibold transition-colors"
          >
            <Download className="w-5 h-5" />
            Download QR Only (.png)
          </button>
        </div>
      </div>

      {/* Placard Preview & Print Target */}
      <div className="lg:col-span-8 flex justify-center print:block print:w-full print:col-span-12">
        
        {/* Physical Paper Canvas Simulator */}
        <div 
          className="bg-white w-full max-w-[210mm] aspect-[1/1.414] shadow-[0_20px_60px_rgb(0,0,0,0.08)] print:shadow-none border border-zinc-100 print:border-none rounded-sm print:rounded-none overflow-hidden relative flex flex-col"
          style={{ '--theme-color': themeColor } as React.CSSProperties}
        >
          {/* Top Brand Banner */}
          <div 
            className="h-48 print:h-[200px] w-full flex flex-col items-center justify-center text-white relative"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)]"></div>
            {cafe.logo_url ? (
              <img src={cafe.logo_url} alt="Logo" className="w-20 h-20 rounded-full shadow-lg border-2 border-white/50 mb-3 object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full shadow-lg border-2 border-white/50 mb-3 flex items-center justify-center bg-white text-3xl font-bold" style={{ color: 'var(--theme-color)' }}>
                {cafe.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-3xl font-extrabold tracking-tight relative z-10 drop-shadow-md text-white text-center px-4">{cafe.name}</h1>
          </div>

          {/* Main Content Body */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 print:p-16">
            
            <div className="mb-10 text-center">
              <ScanLine className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
              <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">Scan to Order</h2>
              <p className="text-xl text-zinc-500 font-medium max-w-[250px] mx-auto leading-snug">
                Open your camera and scan the code below to view our live menu.
              </p>
            </div>

            {/* The QR Code Image */}
            <div className="bg-white p-4 rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border-4 border-zinc-50">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-64 h-64 print:w-[80mm] print:h-[80mm]" />
              ) : (
                <div className="w-64 h-64 bg-zinc-100 animate-pulse rounded-2xl"></div>
              )}
            </div>

            {/* Table Number Indicator */}
            {tableNumber && (
              <div className="mt-12 text-center">
                <span className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-1 block">Your Table</span>
                <div 
                  className="inline-block px-8 py-2 rounded-full border-2 font-black text-4xl"
                  style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
                >
                  {tableNumber}
                </div>
              </div>
            )}

          </div>
          
          {/* Footer */}
          <div className="h-6 w-full flex items-center justify-center mb-6">
            <span className="text-xs font-medium text-zinc-400">Powered by CafeSaaS</span>
          </div>

        </div>
      </div>

    </div>
  )
}
