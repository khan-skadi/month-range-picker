# react-month-range-picker

React component that can select an range of months separated by year

# Install in your project

```
yarn add @khan_skadi/react-month-range-picker
or
npm i @khan_skadi/react-month-range-picker
```

# Run

To run that demo on your own computer:

```
Clone this repository
yarn install
yarn storybook
Visit http://localhost:6006/
```

# Props

| Props  | type | defaultValue | Info
| ------------- | ------------- | ------------- | ------------- |
| columns  | 1 or 2  | 1 | Columns to show  |
| initialYear  | number  | 2020 | The first initialYear |
| locale  | string  | `en-US` | ex: `en-US` |
| onRangeSelect  | function  | required | Pass an function to get the RangeParams |
| calendarClassname  | string  | optional | Pass an `className` to style calendar container |
| headerClassname  | string  | optional | Pass an `className` to style calendar header |
| monthClassname  | string  | optional | Pass an `className` to style month item |


```typescript

onRangeSelect: (params: RangeParams) => void

type RangeParams = {
  startMonth: number
  startYear: number
  endMonth: number
  endYear: number
}

```
