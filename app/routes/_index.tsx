import App from './app.client';

export default function () {
  if (App) return <App />

  return null;
}
