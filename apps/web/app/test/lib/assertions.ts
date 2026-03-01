export type AssertionOperator = 'equals' | 'contains' | 'exists' | 'not_exists' | 'gt' | 'lt'

export interface Assertion {
  id: string
  path: string
  operator: AssertionOperator
  expected: string
}

export interface AssertionResult extends Assertion {
  actual: unknown
  passed: boolean
  message: string
}

function getPath(obj: unknown, path: string): unknown {
  if (!path) return obj
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== 'object') return undefined
    return (acc as Record<string, unknown>)[key]
  }, obj)
}

export function evaluateAssertion(responseBody: string, assertion: Assertion): AssertionResult {
  let parsed: unknown
  try { parsed = JSON.parse(responseBody) } catch { parsed = responseBody }

  const actual = getPath(parsed, assertion.path)
  const { operator, expected } = assertion

  let passed = false
  let message = ''

  switch (operator) {
    case 'exists':
      passed = actual !== undefined && actual !== null
      message = passed ? `"${assertion.path}" existe` : `"${assertion.path}" não encontrado`
      break
    case 'not_exists':
      passed = actual === undefined || actual === null
      message = passed ? `"${assertion.path}" não existe` : `"${assertion.path}" existe com valor ${JSON.stringify(actual)}`
      break
    case 'equals':
      passed = String(actual) === expected
      message = passed ? `"${assertion.path}" = "${expected}"` : `esperado "${expected}", recebido "${actual}"`
      break
    case 'contains':
      passed = String(actual ?? '').includes(expected)
      message = passed ? `"${assertion.path}" contém "${expected}"` : `"${assertion.path}" não contém "${expected}"`
      break
    case 'gt':
      passed = Number(actual) > Number(expected)
      message = passed ? `${actual} > ${expected}` : `${actual} não é maior que ${expected}`
      break
    case 'lt':
      passed = Number(actual) < Number(expected)
      message = passed ? `${actual} < ${expected}` : `${actual} não é menor que ${expected}`
      break
  }

  return { ...assertion, actual, passed, message }
}

export function runAssertions(responseBody: string, assertions: Assertion[]): AssertionResult[] {
  return assertions.map(a => evaluateAssertion(responseBody, a))
}
