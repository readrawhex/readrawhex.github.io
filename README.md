void park soon

### How to use this site

Add media in `static/content/<folder>` and a `data.json` file that looks like:

```json
{
	"title": "hello world",
	"description": "put page description here, it lives at top of page",
	"stuff": [
		{
			"image": "1.png",
			"description": "this is your first photo, optionally add a description here",
			"link": {
				"url": "https://google.com",
				"label": "this is a link to google"
			}
		}
	]
}
```

Then, add a `static/content/index.json` file that looks like:

```json
[
	{
		"title": "hello world",
		"date": "2026-06-08 19:43",
		"folder": "2026-06-08"
	}
]
```
