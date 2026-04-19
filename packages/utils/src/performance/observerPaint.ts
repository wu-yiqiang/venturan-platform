export default function observerPaint() {
  const entryHandle = (list: any) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-paint') {
        observer.disconnect()
        const json = entry.toJSON()
        const reportData = {
          ...json,
          type: 'performance',
          subtype: entry.name,
          pageUrl: window.location.href
        }
        // 发送数据
      }
    }
  }
  const observer = new PerformanceObserver(entryHandle)
  observer.observe({ type: 'paint', buffered: true })
}
