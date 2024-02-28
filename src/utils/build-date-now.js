export default function dateNow() {
  const dateNow = new Date();

  const dateFormatted = dateNow.toLocaleDateString('pt-BR');

  const timeFormatted = dateNow.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const timeFormattedHourhMinuteh = timeFormatted.replace(':', 'h')

  return `${dateFormatted} ${timeFormattedHourhMinuteh}`
}