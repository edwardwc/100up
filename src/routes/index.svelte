<script>
	import Stats from '$lib/stats.svelte';
	import { amountOfAttacksByDate } from '$lib/getStats.svelte';
	import Chart from 'svelte-frappe-charts';

	let amountByDate = amountOfAttacksByDate();
	let data = {
		labels: amountByDate,
		datasets: [
			{
				values: [10, 12, 3, 9, 8, 15, 9]
			}
		]
	};
</script>
<div>
	<div class='min-h-screen'>
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
	<div class='artboard phone-4 bg-gray-800'>
		<Chart data={data} type="line"/>
	</div>
</div>
