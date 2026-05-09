import { createClient } from '@/lib/supabase/server'
import { cafeService } from '@/services/cafe-service'
import { redirect } from 'next/navigation'
import { QrGenerator } from '@/components/qr/qr-generator'
import { FadeIn } from '@/components/ui/motion'

export default async function CafeQrPage({
  params,
}: {
  params: Promise<{ cafeId: string }>
}) {
  const { cafeId } = await params
  const supabase = await createClient()

  // Fetch the cafe configuration to power the QR and Placard
  const cafe = await cafeService.getCafeById(cafeId, supabase).catch(() => null)
  
  if (!cafe) {
    redirect('/dashboard')
  }

  // Pass necessary data to the Client Component generator
  return (
    <FadeIn className="max-w-5xl mx-auto">
      <div className="mb-8 print:hidden">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">QR Code & Print</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Generate table placards and QR codes for your customers to scan.
        </p>
      </div>

      <QrGenerator cafe={cafe} />
    </FadeIn>
  )
}
