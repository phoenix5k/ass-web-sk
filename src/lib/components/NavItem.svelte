<script lang="ts">
	export let item: string;
	export let route: string;
	export let title: string;
</script>

<li>
	<a href={item} class={route === item ? 'active' : ''}>{title}</a>
</li>
