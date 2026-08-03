import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebouncedValue } from './useDebouncedValue'

describe('useDebouncedValue', () => {
  it('delays updates until the configured time has passed', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: '1980' },
    })

    rerender({ value: '1981' })
    expect(result.current).toBe('1980')
    act(() => vi.advanceTimersByTime(400))
    expect(result.current).toBe('1981')
    vi.useRealTimers()
  })
})
