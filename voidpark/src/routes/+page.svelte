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

<div class="fixed flex justify-between p-4 z-100">
	<div class="flex gap-1 items-end">
		<p class="text-sm italic">- miles. github: <a target="_blank" href="https://github.com/readrawhex" class="cursor-pointer underline hover:font-bold">readrawhex</a></p>
	</div>
</div>

<div class="flex w-full">
	<div class="flex-1 overflow-y-scroll pt-12 p-4 fixed min-w-sm">
		{#each data.pages as data}
			<div class="cursor-pointer transition-all { currentPage?.folder === data.folder ? 'bg-gray-100 font-semibold' : ''} hover:bg-gray-200 border-b pt-1 pb-1 flex items-center"
				onclick={async () => {await setPage(data);}}>
				<div class="flex items-center gap-2 pl-2 pr-2">
					<p>{data.title}</p>
					<p class="text-xs opacity-75">{data.date}</p>
				</div>
			</div>
		{:else}
		<p>nothing to show yet</p>
		{/each}
	</div>
	{#if currentPage}
	{#key currentPage.folder}
	<div class="flex-2 p-4 ml-auto flex flex-col items-end" in:fade={{ duration: 100 }}>
		<div class="lg:w-fit mr-4 flex flex-col xl:flex-row gap-4">
			{#if currentPage.description}
			<p class="text-lg text-right xl:text-left italic font-stretch-ultra-expanded max-w-md ml-auto">{currentPage.description}</p>
			{/if}
			<div>
				{#each currentPage.stuff as s}
				<div class="pb-4 flex flex-col items-end xl:items-start">
					{#if s.image}
					<div class="w-fit">
						<img class="w-full max-h-192 object-contain" src={`/content/${currentPage.folder}/${s.image}`}/>
					</div>
					{/if}
					<div class="w-fit opacity-75">
						{#if s.description}
						<p class="text-sm italic">{s.description}</p>
						{/if}
						{#if s.link}
						<a href="{s.link.url}" class="cursor-pointer italic underline hover:font-bold text-sm" title="{s.link.url}">{s.link.label}</a>
						{/if}
					</div>
				</div>
				{/each}
			</div>
		</div>
	</div>
	{/key}
	{/if}
</div>
