import { getRecords, getCompaniesForRecord, getCategories } from '@/app/actions/records'
import { RecordsClient } from './records-client'

export default async function RecordsPage() {
  const [records, companies, categories] = await Promise.all([
    getRecords(),
    getCompaniesForRecord(),
    getCategories(),
  ])
  return <RecordsClient records={records} companies={companies} categories={categories} />
}
