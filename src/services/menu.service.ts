/* eslint-disable @typescript-eslint/no-explicit-any */
// function getRandomValidation() {
//   const min = Math.ceil(0)
//   const max = Math.floor(10)

//   if (Math.floor(Math.random() * (max - min)) + min >= 5) {
//     return true
//   } else {
//     return false
//   }
// }

export const findAllItems = (): Promise<any[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line no-constant-condition
      true // getRandomValidation()
        ? resolve([
            {
              image:
                'https://i.pinimg.com/originals/a2/1b/11/a21b11cab463ec8f4190eee20bcb4539.jpg',
            },
            {
              image:
                'https://www.hometeka.com.br/wp-content/uploads/2021/01/render-in.jpg',
            },
            {
              image: 'https://www.hometeka.com.br/wp-content/uploads/2021/01/vray.jpg',
            },
            {
              image:
                'https://static.chaosgroup.com/images/assets/000/000/271/articles_2_columns/javier-weinstein-interior-design-vray-sketchup.jpg?1518068874',
            },
            {
              image:
                'https://static.chaosgroup.com/images/assets/000/009/124/gallery_masonry_horizontal/Vu_Nguyen-interior-vray-sketchup-1.jpg?1573725691',
            },
            {
              image: 'https://i.ytimg.com/vi/2HOnYpouO-M/maxresdefault.jpg',
            },
            {
              image:
                'https://static.chaosgroup.com/gallery_images/images/000/000/058/gallery_image/panoptikon-poliform-interior-vray-3ds-max-01.jpg?1518068594',
            },
            {
              image:
                'https://i.pinimg.com/474x/96/57/78/96577859ae52ba0f5fb403f76dcc0dc4--poliform-jean-marie.jpg',
            },
            {
              image:
                'https://i.pinimg.com/originals/a2/1b/11/a21b11cab463ec8f4190eee20bcb4539.jpg',
            },
            {
              image: 'https://i.ytimg.com/vi/2HOnYpouO-M/maxresdefault.jpg',
            },
            {
              image:
                'https://www.hometeka.com.br/wp-content/uploads/2021/01/render-in.jpg',
            },
            {
              image: 'https://www.hometeka.com.br/wp-content/uploads/2021/01/vray.jpg',
            },
            {
              image:
                'https://static.chaosgroup.com/images/assets/000/000/271/articles_2_columns/javier-weinstein-interior-design-vray-sketchup.jpg?1518068874',
            },
            {
              image:
                'https://static.chaosgroup.com/images/assets/000/009/124/gallery_masonry_horizontal/Vu_Nguyen-interior-vray-sketchup-1.jpg?1573725691',
            },
            {
              image: 'https://i.ytimg.com/vi/2HOnYpouO-M/maxresdefault.jpg',
            },
            {
              image:
                'https://static.chaosgroup.com/gallery_images/images/000/000/058/gallery_image/panoptikon-poliform-interior-vray-3ds-max-01.jpg?1518068594',
            },
            {
              image:
                'https://i.pinimg.com/474x/96/57/78/96577859ae52ba0f5fb403f76dcc0dc4--poliform-jean-marie.jpg',
            },
            {
              image:
                'https://i.pinimg.com/originals/a2/1b/11/a21b11cab463ec8f4190eee20bcb4539.jpg',
            },
          ])
        : reject(new Error('Invalid credentials'))
    }, 2 * 1000)
  })
