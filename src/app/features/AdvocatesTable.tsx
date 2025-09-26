import { Table } from '../components/Table'
import { Table as RTable } from '@radix-ui/themes'

export type Advocate = {
  firstName: string
  lastName: string
  city: string
  degree: string
  specialties: string[]
  yearsOfExperience: string
  phoneNumber: string // we can use something better need to look typescript string interop
}

export const AdvocatesTable = ({ advocates }: { advocates: Advocate[]}) =>
  <Table<Advocate>
    headers={[
      'First Name',
      'Last Name',
      'City',
      'Degree',
      'Specialties',
      'Years of Experience',
      'Phone Number'
    ]}
    rows={advocates}
    renderRow={(a, i) => (
      <RTable.Row key={a.city + i}>
        <RTable.Cell className='border border-slate-700'>{a.firstName}</RTable.Cell>
        <RTable.Cell className='border border-slate-700'>{a.lastName}</RTable.Cell>
        <RTable.Cell className='border border-slate-700'>{a.city}</RTable.Cell>
        <RTable.Cell className='border border-slate-700'>{a.degree}</RTable.Cell>
        <RTable.Cell className='border border-slate-700'>
          {a.specialties.map((s, i) => (
            <RTable.Row key={s + i}><RTable.Cell>{s}</RTable.Cell></RTable.Row>
          ))}
        </RTable.Cell>
        <RTable.Cell className='border border-slate-700'>{a.yearsOfExperience}</RTable.Cell>
        <RTable.Cell className='border border-slate-700'>{a.phoneNumber}</RTable.Cell>
      </RTable.Row>
    )}
    noneFoundText='No Advocates Found'
  />