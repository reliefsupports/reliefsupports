export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
  }
}
