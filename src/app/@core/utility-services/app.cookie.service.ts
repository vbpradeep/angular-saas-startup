import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  private cookieStore = {};

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie): void {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0]] = cookieArr[1];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: string): any {
    this.parseCookies();
    return this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  remove(key: string): void {
    document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string): void {
    document.cookie = key + '=' + (value || '');
  }
}
