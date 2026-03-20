import { getRecords, getCompaniesForRecord } from '@/app/actions/records'
import { RecordsClient } from './records-client'

export default async function RecordsPage() {
  const [records, companies] = await Promise.all([getRecords(), getCompaniesForRecord()])
  return <RecordsClient records={records} companies={companies} />
}
