<script>
	import { formatRelative, subDays } from 'date-fns';
	import { getNumOfCurrentAttacks, getAllAttacks, getBiggestAttack } from './getStats.svelte';

	const convertToDate = async () => {
		return formatRelative(subDays(new Date(), 7), new Date());
	}
	const numOfCurrentAttacks = getNumOfCurrentAttacks();
	const AllAttacks = getAllAttacks();
	const LargestAttack = getBiggestAttack();
	const datePromise = convertToDate();

</script>
<div class="w-full shadow stats px-4 p-6 opacity-95">
	<div class="stat place-items-center place-content-center">
		{#await LargestAttack}
			<div class="stat-title">Largest attack</div>
			<div class="stat-value text-success">Loading...</div>
			<div class="stat-desc">Loading...</div>
		{:then LargestAttack}
			<div class="stat-title">Largest attack</div>
			<div class="stat-value text-success">{LargestAttack[0]} Gbit/s</div>
			<div class="stat-desc">On {LargestAttack[1]}</div>
		{/await}
	</div>
	<div class="stat place-items-center place-content-center">
		<div class="stat-title">Ongoing attacks</div>
		<div class="stat-value">
			{#await numOfCurrentAttacks}
			Loading...
			{:then num}
				{num}
			{:catch error}
			Failed to fetch, error {error}
			{/await}
		</div>
	</div>
	<div class="stat place-items-center place-content-center">
		<div class="stat-title">Total attacks</div>
		<div class="stat-value text-error">
			{#await AllAttacks}
				Loading...
			{:then data}
				{data}
			{:catch error}
				Failed to fetch, error {error}
			{/await}
		</div>
		<div class="stat-desc">
			{#await datePromise}
				Loading...
			{:then date}
				Since {date}
			{:catch error}
				Failed to fetch, error {error}
			{/await}
		</div>
	</div>
</div>