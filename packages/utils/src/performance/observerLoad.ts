export default function observerLoad() {
  window.addEventListener('pageShow', () => {
    requestAnimationFrame(() => {
      ['load'].forEach((type) => {
        const reportData = {
          type: 'performance',
          subType: type,
          pageUrl: window.location.href,
          startTime: performance.now()- event?.timeStamp
        }
      })
    })
  })

}

function observerEvent() {
  const entryHandle = (list: any) => {
    const entrys = list.getEntries()
    for (const entry of entrys) {
      if (observer) {
        observer.disconnect()
      }
      const reportData = {
        name: entry.name,
        type: 'performance',
        subtype: entry.name,
        resourceType: entry.initiatorType,
        duration: entry.duration,
        dns: entry.domainlookupEnd - entry.domainlookupStart,
        tcp: entry.connectEnd - entry.connectStart, // tcp连接时间
        redirect: entry.redirectEnd - entry.redirectStart, // 重定向时间
        ttfb: entry.responseStart, // 首字节时间
        protocol: entry.nextHopProtocol, // 协议
        resourceSize: entry.resourceSize, // 资源解压后的大小
        transferSize: entry.transferSize, // 请求内容大小
        startTime: performance.now()
      }
      // 发送数据
    }
  }
  const observer = new PerformanceObserver(entryHandle)
  observer.observe({ type: 'resource', buffered: true })
}
