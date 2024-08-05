export default defineEventHandler(async (_event) => {
  try {
    systemInit()
    return {
      code: 0,
      data: true,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      data: error.message,
    }
  }
})
