<script>
	import { fade } from 'svelte/transition';
	let { data } = $props();

	let currentPage = $state(null);
	let pages = $state({});

	async function setPage(page) {
		let newData;
		if (page.folder in pages) {
			newData = pages[page.folder];
		} else {
			newData = await fetch(`/content/${page.folder}/data.json`).then(r => r.json());
			pages[page.folder] = newData;
		}
		currentPage = {...page, ...newData};
		console.log(currentPage);
	}
</script>

<div class="fixed flex justify-between p-4">
	<div class="flex gap-1 items-end">
		<h1 class="text-lg">void park</h1>
		<p class="text-sm">- miles. github is <a target="_blank" href="https://github.com/readrawhex" class="cursor-pointer underline hover:font-bold">@readrawhex</a></p>
	</div>
</div>

<div class="flex w-full">
	<div class="flex-1 overflow-y-scroll pt-12 p-4">
		{#each data.pages as data}
			<div class="cursor-pointer transition-all { currentPage?.folder === data.folder ? 'bg-gray-100 font-semibold' : ''} hover:font-bold hover:bg-gray-200 border-b pt-1 pb-1 flex items-center"
				onclick={async () => {await setPage(data);}}>
				<div class="flex items-center gap-2">
					<p>{data.title}</p>
					<p class="text-xs opacity-75">{data.date}</p>
				</div>
			</div>
		{:else}
		<p>nothing to show yet</p>
		{/each}
	</div>
	{#if currentPage}
	<div class="flex-2 overflow-y-scroll p-4" transition:fade={{ duration: 100 }}>
		{#if currentPage.description}
		<p>{currentPage.description}</p>
		{/if}
		{#each currentPage.stuff as s}
		<div class="w-fit">
			{#if s.image}
			<img class="w-full max-h-192 object-contain" src={`/content/${currentPage.folder}/${s.image}`}/>
			{/if}
			{#if s.description}
			<p>{s.description}</p>
			{/if}
			{#if s.link}
			<a href="{s.link.url}" class="cursor-pointer underline hover:font-bold" title="{s.link.url}">{s.link.label}</a>
			{/if}
		</div>
		{/each}
	</div>
	{/if}
</div>
