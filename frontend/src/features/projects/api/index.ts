
export async function getListOfProjects() {
  return [
    {
      value: 'ProjetoUm',
      label: 'idzeroum'
    },
    {
      value: 'ProjetoDois',
      label: 'idzerodois'
    },
    {
      value: 'ProjetoTres',
      label: 'idzerotres'
    },
    {
      value: 'ProjetoQuatro',
      label: 'idzeroquatro'
    },
    {
      value: 'Projeto1Dois',
      label: 'idzero1doisasdasdasdasdasdasdasd'
    },
    {
      value: 'Projeto2Tres',
      label: 'idzero2tres'
    },
    {
      value: 'Projeto3Quatro',
      label: 'idzero4quatro'
    },
    {
      value: 'Projeto5Dois',
      label: 'idzero5dois'
    },
    {
      value: 'Projeto6Tres',
      label: 'idzero6tres'
    },
    {
      value: 'Projeto7Quatro',
      label: 'idzero7quatro'
    }
  ]
}



export async function getFocusedProjects() {
  return [
    {
      _id: 'project_id-tananan',
      name: 'Projeto tal',
      description: 'Tey'
    }
  ]
}

export async function focusProject(args: { project_id: string }) {
}

