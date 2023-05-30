export type dataSegmentsObj = {
  origin: string
  destination: string
  date: string
  duration: number
  stops: string[]
}

export type dataObj = {
  price: number
  carrier: string
  segments: [dataSegmentsObj, dataSegmentsObj]
}
