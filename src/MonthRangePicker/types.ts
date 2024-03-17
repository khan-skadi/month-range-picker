export type RangeParams = {
  startMonth: number
  startYear: number
  endMonth: number
  endYear: number
}

export type MonthRangePickerProps = {
  onRangeSelect: (params: RangeParams) => void
  columns?: 1 | 2
  initialYear?: number
  locale?: string
  calendarClassName?: string
  headerClassName?: string
  monthClassName?: string
  disableControls?: boolean
  onChangeCallback?: (
    thisMonth: Date,
    startMonth: Date | null,
    endMonth: Date | null
  ) => void
  disabledDates?: string[]
}
