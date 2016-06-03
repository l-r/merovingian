# The merovingian

![merovingian](https://i.ytimg.com/vi/3td5UpAXeJ4/maxresdefault.jpg)

```
The Merovingian (sometimes called The Frenchman) is an old, 
powerful program that resides within the Matrix. Self-described
as a "trafficker of information," the Merovingian behaves much
as a leader of a powerful organized crime syndicate.
```

## Public Mapbox repositories

[by name](md/name.md)

[by language](md/language.md)

[by updated](md/updated_at.md)

[by description](md/description.md)


## Scripts

```bash
node lib/download.js  # get all public repo information. Creates data/rawRepoData.json
```

```bash
node lib/clean.js  # keep only the fields we need to write md files. Creates data/cleanRepoData.json
```

```bash
node lib/generate.js  # generate markdown files. Creates description.md, language.md, name.md, updated_at.md
```

## Warnings & gotchas

- This code uses ES6!
- the `download` script uses the public github api, which is very tightly rate-limited for unauthenticated requests (which it does). You can only run it a few times before hitting a 403.