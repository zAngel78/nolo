import { Lock } from 'lucide-react'

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.025] dark:opacity-[0.015] z-0">
      <div className="absolute inset-0 grid grid-cols-12 gap-20 p-12 -rotate-12 scale-125">
        {[...Array(120)].map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <Lock className="w-12 h-12 text-slate-900 dark:text-slate-100" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BackgroundPattern
