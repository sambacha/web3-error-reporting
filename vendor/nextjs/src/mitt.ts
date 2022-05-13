type Handler = (...evts: any[]) => void

export type MittEmitter<T> = {
  on(type: T, handler: Handler): void
  off(type: T, handler: Handler): void
  emit(type: T, ...evts: any[]): void
}

export default function mitt(): MittEmitter<string> {
  const all: { [s: string]: Handler[] } = Object.create(null)

  return {
    on(type: string, handler: Handler) {
      ;(all[type] || (all[type] = [])).push(handler)
    },

    off(type: string, handler: Handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1)
      }
    },

    emit(type: string, ...evts: any[]) {
      // eslint-disable-next-line array-callback-return
      ;(all[type] || []).slice().map((handler: Handler) => {
        handler(...evts)
      })
    },
  }
}
