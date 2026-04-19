const originalFetch = window.fetch
function overwriteFetch() {
  window.fetch = function newFetch(url, config) {
    const startTime = Date.now()
    const reportData = {
      type: 'performance',
      subType: 'fetch',
      url,
      startTime,
      method: config?.method
    }
    return originalFetch(url, config).then(response => {
      const endTime = Date.now()
      reportData.endTime = endTime
      reportData.duration = endTime - startTime
      const data = response.clone()
      reportData.status = response?.status
      reportData.success = response?.ok
      return response
    }).catch((err) => {
      const endTime = Date.now()
      reportData.endTime = endTime
      reportData.duration = endTime - startTime
      reportData.status = 0
      reportData.success = false
    })
  }
}

export default function fetch() {
  overwriteFetch()
}