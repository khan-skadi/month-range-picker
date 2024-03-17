import React, { useEffect, useState } from 'react'

import { Row, Typography, Flex, ChevronLeft, ChevronRight } from '@components'

import { monthsNumber } from './constants'
import { Month, Calender, Arrow } from './styles'
import { MonthRangePickerProps } from './types'

export const MonthRangePicker: React.FC<MonthRangePickerProps> = ({
  onRangeSelect,
  initialYear = 2023,
  locale = 'en-US',
  columns = 1,
  calendarClassName,
  headerClassName,
  monthClassName,
  disableControls = false,
  onChangeCallback,
  disabledDates,
}) => {
  const [startMonth, setStartMonth] = useState<Date | null>(null)
  const [endMonth, setEndMonth] = useState<Date | null>(null)
  const [yearOffset, setYearOffset] = useState<number>(0)

  const today = new Date()
  const currentYear = today.getFullYear()

  const isLastYear = currentYear + yearOffset + 1 > currentYear

  const isMonthSelected = (month: Date) => {
    if (!startMonth || !endMonth) {
      return false
    }
    const startYearMonth = startMonth.getFullYear() * 12 + startMonth.getMonth()
    const endYearMonth = endMonth.getFullYear() * 12 + endMonth.getMonth()
    const currentYearMonth = month.getFullYear() * 12 + month.getMonth()

    return (
      currentYearMonth >= startYearMonth && currentYearMonth <= endYearMonth
    )
  }

  const isMonthStart = (month: Date) => {
    return month.getTime() === (startMonth?.getTime() || 0)
  }

  const isMonthEnd = (month: Date) => {
    if (!endMonth) {
      return false
    }

    const endYearMonth = endMonth.getFullYear() * 12 + endMonth.getMonth()
    const currentYearMonth = month.getFullYear() * 12 + month.getMonth()

    return currentYearMonth === endYearMonth
  }

  const handleMonthClick = (month: Date) => {
    if (!startMonth || endMonth) {
      setStartMonth(month)
      setEndMonth(null)
    } else if (month < startMonth) {
      setStartMonth(month)
      setEndMonth(startMonth)
    } else {
      setEndMonth(month)
    }

    if (typeof onChangeCallback !== 'undefined') {
      onChangeCallback(month, startMonth, endMonth)
    }
  }

  const subtractMonths = (date: Date, months: number) => {
    const d = new Date(date)
    d.setMonth(d.getMonth() - months)
    return d
  }

  const renderMonth = (year: number, month: number) => {
    const monthStart = new Date(year, month, 1)
    const pastYear = subtractMonths(today, 13)
    const isSelected = isMonthSelected(monthStart)
    const isStart = isMonthStart(monthStart)
    const isEnd = isMonthEnd(monthStart)
    const currentDate = `${year}-${String(month).padStart(2, '0')}`
    /* Disable dates more than 12 months back. */
    /* v2.0.8 Add support for array of disabled dates. */
    const isDisabled =
      disabledDates && disabledDates.length > 0
        ? disabledDates.includes(currentDate)
        : monthStart > today || monthStart < pastYear

    const getVariants = () => {
      if (isStart) return 'start'
      if (isEnd) return 'end'
      if (isSelected) return 'selected'
    }

    return (
      <Month
        key={month}
        className={monthClassName}
        justify="center"
        disabled={isDisabled}
        variant={getVariants()}
        onClick={isDisabled ? undefined : () => handleMonthClick(monthStart)}
      >
        {new Intl.DateTimeFormat(locale, { month: 'short' }).format(monthStart)}
      </Month>
    )
  }

  const renderYear = (year: number) => (
    <Row wrap="wrap" justify="center" p="4" css={{ gap: '4px 0' }}>
      {monthsNumber.map(month => renderMonth(year, month))}
    </Row>
  )

  const handlePrevYear = () => {
    const offset = yearOffset - 1

    if (today.getFullYear() + offset < initialYear) {
      return
    }

    setYearOffset(offset)
  }

  const handleNextYear = () => {
    if (!isLastYear) {
      const offset = yearOffset + 1

      setYearOffset(offset)
    }
  }

  useEffect(() => {
    if (startMonth && endMonth) {
      const getInitialYear = startMonth.getFullYear()
      const getFinalYear = endMonth.getFullYear()
      const initialMonth = startMonth.getMonth() + 1
      const finalMonth = endMonth.getMonth() + 1

      onRangeSelect({
        startMonth: initialMonth,
        startYear: getInitialYear,
        endMonth: finalMonth,
        endYear: getFinalYear,
      })
    }
  }, [startMonth, endMonth, onRangeSelect])

  return (
    <>
      {columns === 1 ? (
        <Calender borderRadius="small" p="12" className={calendarClassName}>
          <Row
            justify="between"
            p="8"
            align="center"
            className={headerClassName}
          >
            <div>
              <Arrow onClick={handlePrevYear}>
                <ChevronLeft fill="$textSecondary" fontSize="$20" />
              </Arrow>
            </div>
            <Flex mx="4">
              <Typography color="secondary" size="14" weight="regular">
                {today.getFullYear() + yearOffset}
              </Typography>
            </Flex>
            <Arrow onClick={handleNextYear}>
              <ChevronRight fill="$textSecondary" fontSize="$20" />
            </Arrow>
          </Row>
          <div>{renderYear(today.getFullYear() + yearOffset)}</div>
        </Calender>
      ) : (
        <Calender className={calendarClassName}>
          <Row
            justify="between"
            p="12"
            align="center"
            className="row header-wrapper"
          >
            {' '}
            {!disableControls && (
              <Arrow onClick={handlePrevYear}>
                {' '}
                <ChevronLeft fill="$textSecondary" fontSize="$20" />{' '}
              </Arrow>
            )}{' '}
            <Flex mx="4" className="flex-wrapper">
              {' '}
              <Typography color="secondary" size="14" weight="regular">
                {' '}
                {initialYear}
              </Typography>
            </Flex>
            <Flex mx="4" className="flex-wrapper">
              <Typography color="secondary" size="14" weight="regular">
                {initialYear + yearOffset + 1}
              </Typography>
            </Flex>
            {!disableControls && (
              <Arrow onClick={handleNextYear}>
                <ChevronRight fill="$textSecondary" fontSize="$20" />
              </Arrow>
            )}
          </Row>
          <Flex gap="4" className="flex-wrapper months-wrapper">
            {renderYear(initialYear + yearOffset)}
            {renderYear(today.getFullYear() + yearOffset)}
          </Flex>
        </Calender>
      )}
    </>
  )
}
