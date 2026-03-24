# Roadmap

Jövőbeni fejlesztési ötletek és tervek gyűjtőhelye.

---

## Biztonság

### Strapi API hozzáférés korlátozása

**Probléma:** A Strapi admin és API nyilvánosan elérhető, így kitett a brute-force és botforgalom általi terhelésnek. A Cloudflare Access nem opció, mivel a DNS-ben ki van kapcsolva a CF proxy (narancssárga felhő).

**Lehetséges megoldások:**

1. **Koyeb hálózati szintű korlátozás** — Ha a Koyeb platform támogat IP allowlistet vagy egyéb hozzáférés-vezérlést, érdemes megnézni.

2. **Strapi beépített API token** — A frontend kérések `Authorization: Bearer <token>` fejléccel menjenek, a publikus endpoint-ok (pl. `/api/events`) pedig csak érvényes token esetén válaszoljanak. A Strapi API Tokens funkciója ezt natívan támogatja.

3. **Middleware-alapú titkos fejléc** — Egyszerű custom Strapi middleware, ami egy előre osztott titkot (`X-Api-Key` fejléc) vár minden kérésnél; az érték Bitwarden SM-ben tárolható és a deploy pipeline injektálja be a frontendbe.

4. **Basic Auth a Koyeb ingress előtt** — Ha a Koyeb egyáltalán támogat ilyet (vizsgálandó).

**Ajánlott irány:** Strapi API Token (megoldás 2) — kevés kóddal jár, natív támogatás, és a `@strapi/client`-ben is könnyen konfigurálható. A Next.js statikus export build-időben fut, tehát a token csak CI/CD szinten kell (Bitwarden SM-ből injektálva), nem kerül kliensre.

---
