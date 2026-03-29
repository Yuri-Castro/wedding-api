export function getCurrentDate(timezone: string = 'America/Sao_Paulo') {
  return new Date(Date.now()).toLocaleString('en-US', { timeZone: timezone })
}
