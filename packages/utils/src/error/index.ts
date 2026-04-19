export default function error() {
  window.addEventListener('error', function (e) {
    const target = e.target;
    if (!target) return
    if (target.src || target.href) {
      const url = target?.src || target?.href 
      const reportData = {
        type: 'error',
        url: url,
        subType: 'resource'
        html: target?.outerHTML,
        pageUrl: this.window?.location.href,
        path: e?.path
      }
    }
  })
  
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    const reportData = {
        type: 'error',
      url: url,
      msg,
      lineNo,
      columnNo,
        stack: error?.stack,
        subType: 'js',
        pageUrl: this.window?.location.href,
      }
  }


  window.addEventListener('unhandledrejection', function (e) {
    const reportData = {
        type: 'error',
        stack: e?.reason?.stack,
        subType: 'promise',
      pageUrl: this.window?.location.href,
        startTime: performance.now()
      }
  })
 }