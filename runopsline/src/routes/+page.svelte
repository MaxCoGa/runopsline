<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script lang="ts">
	import * as MyFn from "$lib/githubauth"
	const reloadDomData = MyFn.reloadData;
	const reloadDomWorkflows = MyFn.reloadWorkflows;
	const runPipelineDom = MyFn.runPipeline;
	const showWord = MyFn.showWord;
	const executePipeline = MyFn.executePipeline;
</script>

<svelte:head>
	<title>RunOpsLine</title>
</svelte:head>

<header>
	<h1>RunOpsLine</h1>
	<img src="ROL.png" alt="https://maxks.org/RunOpsLine" width="360" height="142">
</header>

<p>using github</p>

<input type="text" id="TokenInput">
<button on:click={() => MyFn.setGithubPAT('test')}>
	<!-- Clicked  {count} {count === 1 ? 'time': 'times'} -->
	 pat
</button>

<button on:click={() => showWord('test')}>
	<!-- Clicked  {count} {count === 1 ? 'time': 'times'} -->
	 test me
</button>

<button on:click={reloadDomData}>
	reload repos
</button>

<button on:click={reloadDomWorkflows}>
	reaload workflows
</button>



<h2 id="rolSelector">runs</h2>
<div id="rolView">
	<p id="rolItems"></p>
</div>
