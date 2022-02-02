<script context="module">
	import { formatRelative, subDays } from 'date-fns';
	const fetchData = async () => {
		const res = await fetch("https://attacks.100up.org/data.json")
		const formatted = await res.json();
		return formatted;
	}
	export async function amountOfAttacksByDate() {
		let dates = new Array(7);
		let counter = 7;
		for (let h = 0; h < 7; h++) {
			dates[h] = `${formatRelative(subDays(new Date(), counter), new Date())}`;
			counter--;
		}
		for (let i = 0; i < 7; i++) {
			console.log(dates[i]);
		}
		return dates;

	}
	export async function getNumOfCurrentAttacks() {
		const parsed = await fetchData();
		let counter = 0;
		for (let h = 0; h < parsed.length; h++) {
			if (parsed[h][3] == 0) {
				counter++
			}
		}
		return counter;
	}
	export async function getBiggestAttack() {
		const parsed = await fetchData();
		let largest = [0,0];
		for (let h = 0; h < parsed.length; h++) {
			if (parsed[h][4] > largest[0]) {
				largest[0] = parsed[h][4];
				largest[1] = parsed[h][2];
			}
		}; // find gbps
		largest[0] = Math.round(largest[0]*0.00001);
		const date = new Date(largest[1]*1000);
		largest[1] = `${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}`
		return largest;
	}
	export async function getAllAttacks() {
		const parsed = await fetchData();
		return parsed.length;
	}
</script>