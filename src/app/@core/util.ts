/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export function isLiveSite(url?: string): boolean {
  let urlObject: any;
  if (url) {
    urlObject = new URL(url);
  } else {
    urlObject = location;
  }
  const hostName = urlObject.hostname;
  const port = urlObject.port;
  if (port && hostName !== 'localhost') {
    return false;
  }
  return true;
}

export function isURL(url: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(url);
}

export function customResize(): void {
  let event: Event;
  if (typeof Event === 'function') {
    event = new Event('resize');
  } else {
    event = document.createEvent('Event');
    event.initEvent('resize', true, true);
  }
  window.dispatchEvent(event);
}

export function getUpdatedURL(uri: string, key: string, value: string): string {
  const regx = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');
  if (uri.match(regx)) {
    if (nullOrUndefinedOrEmpty(value)) {
      return removeParam(key, uri);
    }
    return uri.replace(regx, '$1' + key + '=' + value + '$2');
  } else {
    if (nullOrUndefinedOrEmpty(value)) {
      return uri;
    }
    let hash = '';
    if (uri.indexOf('#') !== -1) {
      hash = uri.replace(/.*#/, '#');
      uri = uri.replace(/#.*/, '');
    }
    return uri + (uri.indexOf('?') !== -1 ? '&' : '?') + key + '=' + value + hash;
  }
}

export function addQueryParam(sourceURL: string, key: string, value: string): string {
  const href = new URL(sourceURL);
  href.searchParams.append(key, decodeURIComponent(value));
  return href.href;
}

export function removeParam(key: string, sourceURL: string): string {
  const href = new URL(sourceURL);
  href.searchParams.delete(key);
  return href.href;
}

export function getParam(key: string, sourceURL: string): number {
  const href = new URL(sourceURL);
  const paramsVal: number = parseInt(href.searchParams.get(key), 10);
  if (isNaN(paramsVal)) {
    return 0;
  }
  return paramsVal;
}

export function hasParam(key: string, sourceURL: string): boolean {
  const href = new URL(sourceURL);
  const hasParameter = href.searchParams.has(key);
  return hasParameter;
}

export function nullOrUndefinedOrEmpty(value: string | any): boolean {
  return value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '');
}

export function isNullOrUndefined(value: Object): boolean {
  return value === undefined || value === null;
}

export function handleLocationHash(hash: string): void {
  const hashValue = decodeURIComponent(hash);
  const target = document.getElementById(hashValue);
  if (target && target.scrollIntoView) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('hash-focus');
    setTimeout(() => {
      target.classList.remove('hash-focus');
    }, 12000);
  }
}

export function isUndefined(value: Object): boolean {
  return 'undefined' === typeof value;
}

export function isObject(obj: any): boolean {
  const objCon: {} = {};
  return !isNullOrUndefined(obj) && obj.constructor === objCon.constructor;
}

export function deleteObject(obj: any, key: string): void {
  delete obj[key];
}

export function getEnumValue(enumObject: any, enumValue: string | number): any {
  return <any>enumObject[enumValue];
}

export function detach(element: Element | Node | HTMLElement): Element {
  const parentNode: Node = element.parentNode;
  return <Element>parentNode.removeChild(element);
}

export function clipBoardCopy(value: string): void {
  const textArea: HTMLTextAreaElement = document.createElement('textArea') as HTMLTextAreaElement;
  textArea.textContent = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  detach(textArea);
}

export function isVisible(element: Element | Node): boolean {
  const ele: HTMLElement = <HTMLElement>element;
  return ele.style.visibility === '' && ele.offsetWidth > 0;
}

export function fileDownload(url: string, name?: string): void {
  let element: HTMLAnchorElement = document.createElement('a');
  element.href = url;
  element.setAttribute('download', name ? name : '');
  element.click();
  element = null;
}

export function convertExactDateTimeToUTC(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toISOString();
}

export function TimeConversion(time: number): string {
  let hours = 0;
  let minutes = 0;
  if (time > 60 || time === 60) {
    hours = Math.floor(time / 60);
  }
  minutes = Math.floor(time % 60);

  if (hours !== 0 && minutes !== 0) {
    return hours + 'h' + ' ' + minutes + 'm' + ' ';
  } else if (hours === 0 && minutes !== 0) {
    return minutes + 'm' + ' ';
  } else if (hours !== 0 && minutes === 0) {
    return hours + 'h' + ' ';
  }
}

export function print(element: Element, printWindow?: Window): Window {
  const div: Element = document.createElement('div');
  const links: HTMLElement[] = [].slice.call(
    document.getElementsByTagName('head')[0].querySelectorAll('base, link, style')
  );
  let reference = '';
  if (isNullOrUndefined(printWindow)) {
    printWindow = window.open('', 'print', 'height=452,width=1024, tabbar=no');
  }
  div.appendChild(element.cloneNode(true) as Element);
  for (let i = 0, len: number = links.length; i < len; i++) {
    reference += links[i].outerHTML;
  }
  printWindow.document.write(
    '<!DOCTYPE html> <html><head>' +
      reference +
      '</head><body>' +
      div.innerHTML +
      '<script> (function() { window.ready = true; })(); </script>' +
      '</body></html>'
  );
  printWindow.document.close();
  printWindow.focus();
  const interval: any = setInterval(() => {
    if ((<{ ready: Function } & Window>printWindow).ready) {
      printWindow.print();
      printWindow.close();
      clearInterval(interval);
    }
  }, 500);
  return printWindow;
}

function matches(element: Element, selector: string): boolean {
  const matches: Function = element.matches || (element as any).msMatchesSelector || element.webkitMatchesSelector;
  if (matches) {
    return matches.call(element, selector);
  } else {
    return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
  }
}

export function closest(element: Element | Node, selector: string): Element {
  let el: Element = <Element>element;
  if (typeof el.closest === 'function') {
    return el.closest(selector);
  }
  while (el && el.nodeType === 1) {
    if (matches(el, selector)) {
      return el;
    }
    el = <Element>el.parentNode;
  }
  return null;
}

export function siblings(element: Element | Node): Element[] {
  const siblings: Element[] = [];
  const childNodes: Node[] = Array.prototype.slice.call(element.parentNode.childNodes);
  for (const curNode of childNodes) {
    if (curNode.nodeType === Node.ELEMENT_NODE && element !== curNode) {
      siblings.push(<Element>curNode);
    }
  }
  return <Element[]>siblings;
}
