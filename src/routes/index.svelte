<script>
	import Stats from '$lib/stats.svelte';
	import Footer from '$lib/footer.svelte';
	import { getAmountOfAttacksByDay, getBiggestAttackByDay, fetchData } from '$lib/getStats.svelte';
	import Chart from 'svelte-frappe-charts';
	const amountByDate = getAmountOfAttacksByDay();
	const biggestByDate = getBiggestAttackByDay();
	const getData = fetchData();
	const NA = "N/A";
	const inProgress = "Ongoing";
</script>
<div class='min-h-screen'>
	<div>
		<Stats />
		<div class='hero p-6 mt-24'>
			<div class='text-center hero-content'>
				<div class='max-w flex flexbox flex-col gap-40'>
					<div>
						<p class='mb-3 text-8xl font-bold'>
							100up Attack Status
						</p>
						<p class='text-2xl mb-4'>
							Real-time status of DDoS attack trends
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class='lg:columns-2 p-8 opacity-90'>
		<div class='bg-gray-900 rounded-lg'>
			<p class='text-center text-2xl text-bold p-4'>
				Amount of attacks per day
			</p>
			{#await amountByDate}
				<p class='text-center text-2xl'>
					Loading...
				</p>
			{:then amountByDate}
				<Chart data={{
		labels: ["6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "yesterday", "today"],
		datasets: [
			{
				values: amountByDate,
			}
		]
	}} type="line"/>
			{/await}
		</div>
		<div class='bg-gray-900 rounded-lg'>
			<p class='text-center text-2xl text-bold p-4'>
				Largest attack by day (Gbit/s)
			</p>
			{#await biggestByDate}
				<p class='text-center text-2xl'>
					Loading...
				</p>
			{:then biggestByDate}
				<Chart data={{
		labels: ["6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "yesterday", "today"],
		datasets: [
			{
				values: biggestByDate,
			}
		]
	}} type="line"/>
			{/await}
		</div>
	</div>
	<div class="overflow-x-auto p-6">
		<table class="table w-full hover">
			<thead>
			<tr>
				<th>ID</th>
				<th>IP</th>
				<th>Start</th>
				<th>Finish</th>
				<th>Gbit/s</th>
				<th>PPS</th>
			</tr>
			</thead>
			<tbody class='opacity-95'>
				{#await getData then attacks}
					{#each attacks as attack}
						<tr>
							<th>{attack[0]}</th>
							<td>{attack[1]}.x</td>
							<td>{new Date().getDay() - new Date(attack[2]*1000).getDay() === 0 ? (new Date(attack[2]*1000).getMinutes() < 10 ? `${(new Date(attack[2]*1000).getHours()+1)}:0${(new Date(attack[2]*1000).getMinutes())}` : `${(new Date(attack[2]*1000).getHours()+1)}:${(new Date(attack[2]*1000).getMinutes())}`) : (new Date(attack[2]*1000).getMinutes() < 10 ? `${(new Date(attack[2] * 1000).getMonth() + 1)}/${(new Date(attack[2] * 1000).getDate())} at ${(new Date(attack[2]*1000).getHours()+1)}:0${(new Date(attack[2]*1000).getMinutes())}` : `${(new Date(attack[2] * 1000).getMonth() + 1)}/${(new Date(attack[2] * 1000).getDate())} at ${(new Date(attack[2]*1000).getHours()+1)}:${(new Date(attack[2]*1000).getMinutes())}`)}</td>
							<td>{attack[3] === 0 ? inProgress : (new Date().getDay() - new Date(attack[3]*1000).getDay() === 0 ? (new Date(attack[3]*1000).getMinutes() < 10 ? `${(new Date(attack[3]*1000).getHours()+1)}:0${(new Date(attack[3]*1000).getMinutes())}` : `${(new Date(attack[3]*1000).getHours()+1)}:${(new Date(attack[3]*1000).getMinutes())}`) : (new Date(attack[3]*1000).getMinutes() < 10 ? `${(new Date(attack[3] * 1000).getMonth() + 1)}/${(new Date(attack[3] * 1000).getDate())} at ${(new Date(attack[3]*1000).getHours()+1)}:0${(new Date(attack[3]*1000).getMinutes())}` : `${(new Date(attack[3] * 1000).getMonth() + 1)}/${(new Date(attack[3] * 1000).getDate())} at ${(new Date(attack[3]*1000).getHours()+1)}:${(new Date(attack[3]*1000).getMinutes())}`))}</td>
							<td>{attack[4] === 0 ? NA : Math.round((attack[4]*0.00001)*100)/100}</td>
							<td>{attack[5] === 0 ? NA : attack[5]}</td>
						</tr>
					{/each}
				{/await}
			</tbody>
		</table>
	</div>
	<Footer />
</div>
