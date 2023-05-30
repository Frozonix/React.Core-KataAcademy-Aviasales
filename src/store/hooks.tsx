import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import type { RootState, appDispatch } from '.'

export const useAppDispatch = () => useDispatch<appDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
