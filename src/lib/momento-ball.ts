/** Keep campaign behaviour restricted to this existing rental service. */
export function isMomentoBallPage(category: string, service: string) {
  return category === 'photobooth-ve-fotograf-aktivasyonlari' && service === 'momento-ball';
}
