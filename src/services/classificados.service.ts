// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findAllClassificados = (): Promise<any[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line no-constant-condition
      true // getRandomValidation()
        ? resolve([
            {
              description: 'Preciso de alguem que faça render',
              date: '22/10/2021',
            },
            {
              description: 'BONUS',
              date: 'Melhores imagens',
            },
            {
              description: 'TESTE',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
            {
              description: 'TOTAL3D',
              date: 'Melhores imagens',
            },
          ])
        : reject(new Error('Invalid credentials'))
    }, 2 * 1000)
  })
