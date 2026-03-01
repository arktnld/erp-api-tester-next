'use client'

import { HelpCircle } from 'lucide-react'
import { Button } from './button'

export function TourButton() {
  async function startTour() {
    // Dynamic import to avoid SSR issues (driver.js accesses DOM)
    const [{ driver }, { default: DriverCSS }] = await Promise.all([
      import('driver.js'),
      import('driver.js/dist/driver.css'),
    ])
    void DriverCSS

    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '[data-tour="nav"]',
          popover: {
            title: 'Navegação',
            description: 'Use a barra lateral para navegar entre ERPs, empresas, endpoints e playbooks.',
          },
        },
        {
          element: '[data-tour="erps"]',
          popover: {
            title: 'ERPs',
            description: 'Configure seus sistemas ERP aqui. Cada ERP tem suas empresas e endpoints.',
          },
        },
        {
          element: '[data-tour="playbooks"]',
          popover: {
            title: 'Playbooks',
            description: 'Crie sequências automatizadas de requisições para testar fluxos completos.',
          },
        },
        {
          element: '[data-tour="history"]',
          popover: {
            title: 'Histórico',
            description: 'Veja todas as requisições executadas com detalhes de resposta.',
          },
        },
        {
          element: '[data-tour="theme-toggle"]',
          popover: {
            title: 'Tema',
            description: 'Alterne entre tema escuro e claro.',
          },
        },
      ],
    })

    driverObj.drive()
  }

  return (
    <Button variant="ghost" size="icon" onClick={startTour} title="Tour da interface">
      <HelpCircle size={16} />
    </Button>
  )
}
