export async function load({ fetch }) {
	const data = await fetch('/content/index.json').then(r => r.json());	
	return {pages: data};
}
