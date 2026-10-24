/* Native intent links (call, SMS, WhatsApp, maps). These open the device's own
   apps; users always review the message before it is sent in the UI. */

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function smsHref(phone: string, body: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `sms:${digits}?body=${encodeURIComponent(body)}`;
}

export function whatsappHref(phone: string, body: string): string {
  // WhatsApp needs full international format without +/spaces. Demo numbers are
  // invalid; the UI still lets the user review before opening wa.me.
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(body)}`;
}

export function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function facilityShareText(f: {
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
}): string {
  return [
    `${f.name} (${f.type})`,
    f.address,
    `Phone: ${f.phone}`,
    `Hours: ${f.hours}`,
    "",
    "Shared from HerCare+",
  ].join("\n");
}
