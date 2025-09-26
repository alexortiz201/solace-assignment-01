import React from 'react'
import { Table as RTable } from '@radix-ui/themes'

type TBodyProps<T> = {
  rows: T[]
  renderRow: (row: T, index: number) => React.ReactNode
}
type TableProps<T> = {
  headers: React.ReactNode[]
  noneFoundText?: string
} & TBodyProps<T>

const TBody = <T,>({ rows, renderRow } : TBodyProps<T>) =>
  <RTable.Body>
    {rows.map((r, i) => renderRow(r, i))}
  </RTable.Body>

export const Table = <T,>({ headers, rows, renderRow, noneFoundText = "None found" }: TableProps<T>) => {
  return (
    <RTable.Root className='border-collapse border border-slate-500'>
      {
        (rows.length > 0) &&
        <RTable.Header>
          <RTable.Row>
            {headers.map((h, i) => <RTable.ColumnHeaderCell className='border border-slate-600' key={i}>{h}</RTable.ColumnHeaderCell>)}
          </RTable.Row>
        </RTable.Header>
      }
      {(rows.length > 0) && <TBody<T> rows={rows} renderRow={renderRow} />}
      {(rows.length === 0) && <RTable.Body><RTable.Row><RTable.Cell>{noneFoundText}</RTable.Cell></RTable.Row></RTable.Body>}
    </RTable.Root>
  )
}