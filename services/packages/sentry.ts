export default async (error: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
    return
  }
}
