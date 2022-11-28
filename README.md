# Flexibilní testování webových aplikací

Tyto materiály vznikly pro Tech MeetUp pořádaný Czechitas a Ciscem 18. 10. 2022.

- https://www.czechitas.cz/kurzy/tech-meetup-moderni-cloudove-technologie-a-best-practices-modern-cloud-technologies-and-best-practices
- https://cognitive.cisco.com/

## [Záznam](https://youtu.be/bPiTuTfYM_w?t=2978)

## [Slajdy](slides.pdf)

## Kde najdete

- ukázku jednotkových testů v [`src/unit`](src/unit)
- ukázku specifikace API v souboru [`api-spec/swagger.json`](api-spec/swagger.json)/[`api-spec/swagger.yaml`](api-spec/swagger.yaml)
  nebo na adrese https://petstore.swagger.io/
- ukázku end-to-end testů v [`src/playwright/tests`](src/playwright/tests)

## Jak spustíte

Pro spuštení testů je potřeba mít [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

...vše v adresáři [`src`](src)

- příprava `npm ci`
- jednotkové testy `npm run unit`
- end-to-end testy `npm run playwright`/`npm run playwright:demo`

## Návody a tipy

### Playwright

- [dokumentace frameworku Playwright](https://playwright.dev/docs/intro)
- vygenerování Playwright projektu v jazyce TypeScript/JavaScript: `npm init playwright@latest`

### Instalace WordPressu na vlastní počítač

Ukázkové testy jsou napsané s WordPressem 6.0. Pokud tuto verzi nemáte, nebo
proti ní nemůžete testy pouštět, rychlá instalace WordPressu je popsaná níže
pomocí nástroje Lando. **Testy v žádném případě nepouštějte proti ostrým veřejně
dostupným webovým stránkám!**

Pro instalaci potřebujete Docker a [Lando](https://docs.lando.dev/getting-started/installation.html).
S nimi WordPress naistalujete postupným spuštěním následujících příkazů
v adresáři `wordpress-webroot`:

```bash
cd wordpress-webroot
lando init --src 'cwd' --name 'wordpress' --recipe 'wordpress' --webroot .
lando start
lando wp core download --version='6.0.2' --force
lando wp config create --dbhost='database' --dbname='wordpress' --dbuser='wordpress' --dbpass='wordpress' --force
lando wp core install --url='http://wordpress.lndo.site' --title='WordPress' --admin_user='admin' --admin_email='admin@example.com' --prompt=admin_password
lando wp user create 'author' 'author@example.com' --role='author' --prompt=user_pass
lando wp plugin uninstall --all
```

Během příkazů očekávejte dotaz na hesla administrátora a poté autora, která
budou sloužit k jejich přihlášení. Přihlašovací jména jsou `admin` a `author`.
Hesla poté vložte do souboru [`src/playwright/configuration.ts`](src/playwright/configuration.ts).

Pro vypnutí/zapnutí WordPressu můžete v adresáři `wordpress-webroot` používat
příkazy `lando start`/`lando stop`.

## Dotazy

Našli jste chybu nebo se chcete na něco zeptat? Napište e-mailem na [mistanke@cisco.com](mailto:mistanke@cisco.com) (pracovní) nebo
[michal@stanke.cz](mailto:michal@stanke.cz) (osobní).
