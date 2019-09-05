# Kramerius 6 - klient pre uživatelské rozhranie

## instalacia modulu:
```
npm install
```

## spustenie modulu (dev):
```
npm start
```

## produkcny build modulu
```
ng build --prod
```

## lokalne testovanie produkcneho build-u
```
lite-server --baseDir="dist" --config=bs-config.js
```

## info
- subor `proxy.conf.json` obsahuje proxy pre BE API volania
- subor `bs-config.js` obsahuje proxy pre BE API volania (pre `lite-server`)

