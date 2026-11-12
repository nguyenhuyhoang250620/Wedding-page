/**
 * Per-guest link preview.
 *
 * Zalo / Facebook crawlers do not run JavaScript, so ?name=<code> cannot be
 * resolved in the browser for previews. This function runs on "/" and, when a
 * known guest code is present, rewrites the <title> and Open Graph tags on the
 * fly. Requests without a code (or with an unknown code) get the static page.
 */
export async function onRequestGet({ request, env, next }) {
  const response = await next();

  const url = new URL(request.url);
  const rawCode = (url.searchParams.get('name') || '').trim().slice(0, 40);
  const contentType = response.headers.get('content-type') || '';
  if (!rawCode || !contentType.includes('text/html')) return response;

  const guestName = await lookupGuest(env, url, rawCode.toLowerCase());
  if (!guestName) return response;

  const shareUrl = `${url.origin}/?name=${encodeURIComponent(rawCode)}`;

  const rewritten = new HTMLRewriter()
    .on('meta[property="og:title"]', {
      element(el) {
        const base = el.getAttribute('content') || '';
        el.setAttribute('content', `Thiệp mời ${guestName} · ${base}`);
      },
    })
    .on('meta[property="og:description"]', {
      element(el) {
        const base = el.getAttribute('content') || '';
        el.setAttribute(
          'content',
          base.replace(/^Trân trọng kính mời bạn/, `Trân trọng kính mời ${guestName}`)
        );
      },
    })
    // Facebook treats og:url as the canonical page, so it must keep the code.
    .on('meta[property="og:url"]', {
      element(el) {
        el.setAttribute('content', shareUrl);
      },
    })
    .transform(response);

  const headers = new Headers(rewritten.headers);
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return new Response(rewritten.body, {
    status: rewritten.status,
    statusText: rewritten.statusText,
    headers,
  });
}

async function lookupGuest(env, url, code) {
  try {
    const res = await env.ASSETS.fetch(new URL('/guests.json', url.origin));
    if (!res.ok) return null;
    const data = await res.json();
    const list = data?.guests || {};
    const key = Object.keys(list).find(k => k.toLowerCase() === code);
    return key ? String(list[key]).slice(0, 80) : null;
  } catch (error) {
    console.error('Unable to read guests.json for link preview.', error);
    return null;
  }
}
