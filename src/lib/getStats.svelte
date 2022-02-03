<script context="module">
	import { formatRelative, subDays } from 'date-fns';
	export const fetchData = async () => {
		const res = await fetch("https://attacks.100up.org/data.json")
		const formatted = await res.json();
		return formatted;
	}
	export async function getBiggestAttackByDay() {
		const data = await fetchData();
		const largest = new Array(6);
		for (let h = 0; h < 7; h++) {
			largest[h] = 0;
		}
		for (let h = 0; h < data.length; h++) {
			if (data[h][3]*1000 > Date.now()-86400000) { // today
				if (data[h][4] > largest[0]) {
					largest[0] = data[h][4];
				}
			} else if (data[h][3]*1000 > Date.now()-172800000) { // yesterday
				if (data[h][4] > largest[1]) {
					largest[1] = data[h][4];
				}
			} else if (data[h][3]*1000 > Date.now()-259200000) { // two days ago
				if (data[h][4] > largest[2]) {
					largest[2] = data[h][4];
				}
			} else if (data[h][3]*1000 > Date.now()-345600000) { // three days ago
				if (data[h][4] > largest[3]) {
					largest[3] = data[h][4];
				}
			} else if (data[h][3]*1000 > Date.now()-432000000) { // four days ago
				if (data[h][4] > largest[4]) {
					largest[4] = data[h][4];
				}
			} else if (data[h][3]*1000 > Date.now()-518400000) { // five days ago
				if (data[h][4] > largest[5]) {
					largest[5] = data[h][4];
				}
			} else {
				if (data[h][4] > largest[6]) {
					largest[6] = data[h][4];
				}
			}
		}
		for (let h = 0; h < 7; h++) {
			largest[h] = Math.round(largest[h]*0.00001);
		}
		return largest;
	}
	export async function getAmountOfAttacksByDay() {
		const data = await fetchData();
		const byDate = new Array(6);
		for (let h = 0; h < 7; h++) {
			byDate[h] = 0;
		}
		for (let h = 0; h < data.length; h++) {
			if (data[h][3]*1000 > Date.now()-86400000) { // today
				byDate[6] += 1;
			} else if (data[h][3]*1000 > Date.now()-172800000) { // yesterday
				byDate[5] += 1;
			} else if (data[h][3]*1000 > Date.now()-259200000) { // two days ago
				byDate[4] += 1;
			} else if (data[h][3]*1000 > Date.now()-345600000) { // three days ago
				byDate[3] += 1;
			} else if (data[h][3]*1000 > Date.now()-432000000) { // four days ago
				byDate[2] += 1;
			} else if (data[h][3]*1000 > Date.now()-518400000) { // five days ago
				byDate[1] += 1;
			} else {
				byDate[0] += 1;
			}
		}
		return byDate;
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