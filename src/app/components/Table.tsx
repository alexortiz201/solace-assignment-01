import React from 'react'
import { Table as RTable } from '@radix-ui/themes'

type TBodyProps<T> = {
  rows: T[]
  renderRow: (row: T, index: number) => React.ReactNode
  noneFoundText?: string
}
type TableProps<T> = {
  headers: React.ReactNode[]
} & TBodyProps<T>

const TBody = <T,>({ rows, renderRow, noneFoundText = "None found" } : TBodyProps<T>) =>
  <RTable.Body>
    {rows.map((r, i) => renderRow(r, i))}
  </RTable.Body>

export const Table = <T,>({ headers, rows, renderRow, noneFoundText }: TableProps<T>) =>
  <RTable.Root className='border-collapse border border-slate-500'>
    <RTable.Header>
      {
        (rows.length > 0) &&
        <RTable.Row>
          {headers.map((h, i) => <RTable.ColumnHeaderCell className='border border-slate-600' key={i}>{h}</RTable.ColumnHeaderCell>)}
        </RTable.Row>
      }
    </RTable.Header>

    {(rows.length > 0) && <TBody<T> rows={rows} renderRow={renderRow} noneFoundText={noneFoundText}/>}
    {(rows.length === 0) && <RTable.Row><RTable.Cell>{noneFoundText}</RTable.Cell></RTable.Row>}
  </RTable.Root>