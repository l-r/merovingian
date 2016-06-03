# The Merovingian

![The Merovingian](https://i.ytimg.com/vi/3td5UpAXeJ4/maxresdefault.jpg)

```
The Merovingian (sometimes called The Frenchman) is an old, powerful program that
resides within the Matrix. Self-described as a "trafficker of information," the 
Merovingian behaves much as a leader of a powerful organized crime syndicate.
```

## Public Mapbox repositories

- [By name](md/name.md)
- [By language](md/language.md)
- [By updated](md/updated_at.md)
- [By description](md/description.md)


## Scripts

#### Download raw public repo data

```bash
node lib/download.js
```

- Creates `data/rawRepoData.json`
- Should output similar to:

```bash
Found  100  items
Total items: 100
Found  100  items
Total items: 200
Found  100  items
Total items: 300
Found  100  items
Total items: 400
Found  100  items
Total items: 500
Found  100  items
Total items: 600
Found  66  items
Total items: 666
Empty response, stop here.
```

#### Clean data

```bash
node lib/clean.js
```

- Keep only the fields we need to write md files. 
- Creates `data/cleanRepoData.json`


#### Generate markdown files

```bash
node lib/generate.js
```

- Creates 
  - `md/description.md`
  - `md/language.md`
  - `md/name.md`
  - `md/updated_at.md`

## Warnings & gotchas

- This code uses ES6!
- the `download` script uses the public github api, which is very tightly rate-limited for unauthenticated requests (which it does). You can only run it a few times before hitting a 403.